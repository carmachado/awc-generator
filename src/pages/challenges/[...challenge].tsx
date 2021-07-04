import React, { useCallback, useRef, useState, useEffect } from "react";

import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { useAlert } from "react-alert";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

import { Container, Title, AnimeDiv } from "../../styles/[...challenge]";

import {
  setItemLocalStorage,
  getItemLocalStorage,
  getChallengeLocalStorage,
  setChallengeLocalStorage,
} from "../../libs/utils/lsnext";

import Page from "../../components/Page";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { Challenge, ChallengeInformation } from "../../libs/anime/animeTypes";
import {
  getChallengeInformation,
  getNavigationInformation,
} from "../../libs/utils/getStaticInformation";
import { DefaultPageProps } from "../../libs/utils/pageTypes";
import { Alert } from "../../styles/global";
import runChallenge from "../../libs/anime/runChallenge";
import DatePicker from "../../components/DatePicker";
import { getDigits } from "../../libs/utils/formatFuzzyDate";
import Select from "../../components/Select";
import getRequirementDescripton from "../../libs/utils/getRequirementDescripton";

interface Props extends DefaultPageProps {
  challenge: Challenge;
}

const ChallengeComponent: React.FC<Props> = ({
  challenge,
  navigation,
}: Props) => {
  const router = useRouter();
  const [animeData, setAnimeData] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const alert = useAlert();
  const [openedManualField, setOpenedManualField] = useState([]);

  const handleSubmit = useCallback(
    async (formData: ChallengeInformation) => {
      const { user } = formData;

      const data = {
        ...formData,
        animes: formData.animes?.map((anime, i) => ({
          ...anime,
          requirement: challenge.requirements[i],
        })),
      };

      setChallengeLocalStorage(challenge.name, {
        formData: data,
        openedManualField,
      });

      setItemLocalStorage("@awc-generator:username", user);

      try {
        setLoading(true);

        const challengeCode = await runChallenge(challenge, data);

        setAnimeData(challengeCode.code);

        navigator.clipboard.writeText(challengeCode.code);

        challengeCode.alerts.forEach((al) =>
          alert.show(<Alert>{al.message}</Alert>, al.options)
        );

        alert.show(<Alert>Challenge copied to clipboard</Alert>, {
          type: "info",
        });
      } catch (error) {
        alert.show(<Alert>{error.message}</Alert>, {
          type: "error",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [challenge, alert, openedManualField]
  );

  const toggleOpenedManualField = useCallback(
    (id: string): void => {
      if (openedManualField.includes(id))
        setOpenedManualField(openedManualField.filter((item) => item !== id));
      else setOpenedManualField([...openedManualField, id]);
    },
    [openedManualField]
  );

  useEffect(() => {
    const user = getItemLocalStorage("@awc-generator:username");

    const data = getChallengeLocalStorage(challenge.name);

    const { formData, openedManualField } = data;

    if (formData?.animes?.length > challenge.requirements.length) {
      formData.animes.forEach((anime, i) => {
        if (i > 0) formData.animes[i - 1] = formData.animes[i];
      });
    }

    setOpenedManualField(openedManualField || []);

    formRef.current.setData({
      startDate: null,
      ...formData,
      user,
    });

    setLoading(false);
  }, [challenge]);

  useEffect(() => {
    const data = getChallengeLocalStorage(challenge.name);

    setChallengeLocalStorage(challenge.name, { ...data, openedManualField });
  }, [openedManualField, challenge]);

  if (router.isFallback) {
    return (
      <div className="fallbackLoading">
        <ReactLoading type="spin" height="10%" width="10%" />
      </div>
    );
  }

  return (
    <Page navigation={navigation}>
      <Container>
        <Title>
          {challenge.link ? (
            <a target="_blank" rel="noopener noreferrer" href={challenge.link}>
              {challenge.name}
            </a>
          ) : (
            challenge.name
          )}
        </Title>
        {loading && (
          <div className="full_loading">
            <ReactLoading type="spin" height="10%" width="10%" />
          </div>
        )}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="user"
            type="text"
            placeholder="Profile Name"
            title="Profile Name"
            required
          />
          <DatePicker name="startDate" placeholderText="Challenge Start Date" />
          {challenge.requirements
            .filter((req) => !req.preset)
            .map((req, i) => (
              <Scope key={req.id} path={`animes[${i}]`}>
                <AnimeDiv role="toolbar">
                  <Input
                    name="URL"
                    label={`${
                      !req.customFormat || req.customFormat.includes("{id}")
                        ? `${getDigits(req.id, 2)}) `
                        : ""
                    }${getRequirementDescripton(req)}`}
                    placeholder="Anime URL"
                    underDiv="children"
                    required={
                      req.required === undefined
                        ? challenge.defaultRequired
                        : req.required
                    }
                  >
                    <button
                      name="openManualField"
                      type="button"
                      tabIndex={-1}
                      onClick={() => {
                        toggleOpenedManualField(req.id.toString());
                      }}
                    >
                      {openedManualField.includes(req.id.toString()) ? (
                        <IoMdRemoveCircleOutline />
                      ) : (
                        <IoMdAddCircleOutline />
                      )}
                    </button>
                  </Input>
                </AnimeDiv>
                {req.additionalInformation?.map((inf, idx) => {
                  if (["Link", "Label"].includes(inf.type)) {
                    if (inf.fields) {
                      return (
                        <div
                          className="flex-line"
                          key={`${req.id}.${inf.field}`}
                        >
                          {inf.fields.map((field, fieldIdx) => (
                            <Input
                              key={`${req.id}.${inf.field}.${field}`}
                              name={`fields[${idx}][${fieldIdx}]`}
                              placeholder={field}
                            />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <Input
                        key={`${req.id}.${inf.field}`}
                        name={`fields[${idx}]`}
                        placeholder={
                          inf.field + (inf.type === "Link" ? " URL" : "")
                        }
                      />
                    );
                  }
                  return null;
                })}
                {req.type === "bonus" && (
                  <Select
                    className="select"
                    name="replacement"
                    options={challenge.requirements
                      .filter((r) => r.type !== "bonus")
                      .map((r) => ({ value: r.id, label: r.id }))}
                    isClearable
                    placeholder="Requeriment to replace"
                  />
                )}
                {challenge.modes && (
                  <Select
                    className="select"
                    name="mode"
                    options={challenge.modes}
                    isClearable
                    placeholder="Mode"
                  />
                )}
                {openedManualField.includes(req.id.toString()) && (
                  <Input
                    name="manualField"
                    placeholder="Other additional information"
                  />
                )}
              </Scope>
            ))}
          <Button type="submit">Generate information</Button>
          <TextArea
            name="area"
            id="result"
            rows={10}
            value={animeData}
            readOnly
          />
        </Form>
      </Container>
    </Page>
  );
};

// This also gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const promiseNavigation = getNavigationInformation();
  const promiseChallenge = getChallengeInformation(
    (params.challenge as string[]).join("/")
  );

  const [dataChallenge, dataNavigation] = await Promise.all([
    promiseChallenge,
    promiseNavigation,
  ]);

  if (!dataChallenge) return { notFound: true };

  return {
    props: { challenge: dataChallenge, navigation: dataNavigation },
    revalidate: 60,
  };
};

export default ChallengeComponent;
