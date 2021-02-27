import React, { useCallback, useRef, useState, useEffect } from "react";

import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { useAlert } from "react-alert";

import { Container, Title } from "../../styles/[challenge]";

import {
  setItemLocalStorage,
  getItemLocalStorage,
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
  const [initialData, setInitialData] = useState(null);
  const alert = useAlert();

  const handleSubmit = useCallback(
    async (formData: ChallengeInformation) => {
      const { user } = formData;

      setItemLocalStorage(
        `@awc-generator:${challenge.name}`,
        JSON.stringify(formData)
      );
      setItemLocalStorage("@awc-generator:username", user);

      try {
        setLoading(true);

        const result = await runChallenge(challenge, formData);

        setAnimeData(result);

        navigator.clipboard.writeText(result);

        alert.show(<Alert>Challenge copied to clipboard</Alert>, {
          type: "info",
        });
      } catch (error) {
        alert.show(<Alert>{error.message}</Alert>, {
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [challenge, alert]
  );

  useEffect(() => {
    const user = getItemLocalStorage("@awc-generator:username");

    const challengels = getItemLocalStorage(`@awc-generator:${challenge.name}`);

    const data = challengels && JSON.parse(challengels);

    setInitialData({ startDate: null, ...data, user });
    setLoading(false);
  }, [challenge]);

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
            <a href={challenge.link}>{challenge.name}</a>
          ) : (
            challenge.name
          )}
        </Title>
        {loading && (
          <div className="full_loading">
            <ReactLoading type="spin" height="10%" width="10%" />
          </div>
        )}
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
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
            .map((req) => (
              <Scope key={req.id} path={`animes[${req.id}]`}>
                <Input
                  name="URL"
                  label={`${req.id}) ${req.question}`}
                  placeholder="Anime URL"
                  required={challenge.defaultRequired || req.required}
                />
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
              </Scope>
            ))}
          <Button type="submit">Generate information</Button>
          <TextArea
            name="area"
            id="result"
            rows={10}
            value={animeData}
            readOnly
            title="search return on anilist"
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