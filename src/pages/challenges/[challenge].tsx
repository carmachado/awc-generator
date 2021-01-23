import React, { useCallback, useRef, useState, useEffect } from "react";

import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

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
import getAnimeInformation from "../../libs/anime/getAnimeInformation";

interface Props {
  challenge: Challenge;
  navigation: string[];
}

const ChallengeComponent: React.FC<Props> = ({
  challenge,
  navigation,
}: Props) => {
  const router = useRouter();
  const [animeData, setAnimeData] = useState("");
  const formRef = useRef(null);
  const [initialData, setInitialData] = useState(null);

  const handleSubmit = useCallback(
    async (formData: ChallengeInformation) => {
      const { user } = formData;

      setItemLocalStorage(
        `@awc-generator:${challenge.name}`,
        JSON.stringify(formData)
      );
      setItemLocalStorage("@awc-generator:username", user);

      const promises = formData.animes.map(({ URL, fields }, requerementId) => {
        return getAnimeInformation({
          anime: URL,
          user,
          challenge,
          requerementId,
          fields,
        });
      });

      const result = await Promise.all(promises);

      setAnimeData(`<hr>\n\n${result.join("\n\n").trim()}\n\n<hr>`);
    },
    [challenge]
  );

  useEffect(() => {
    const user = getItemLocalStorage("@awc-generator:username");

    const challengels = getItemLocalStorage(`@awc-generator:${challenge.name}`);

    const data = challengels && JSON.parse(challengels);

    setInitialData({ ...data, user });
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
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Input
            name="user"
            type="text"
            placeholder="Profile Name"
            title="Profile Name"
            required
          />
          {challenge.requirements?.map((req) => (
            <Scope key={req.id} path={`animes[${req.id}]`}>
              <Input
                name="URL"
                label={`${req.id}) ${req.question}`}
                placeholder="Anime URL"
                required={challenge.defaultRequired || req.required}
              />
              {req.additionalInformation?.map((inf, idx) => {
                if (["Link", "Label"].includes(inf.type))
                  return (
                    <Input
                      key={`${req.id}.${inf.field}`}
                      name={`fields[${idx}]`}
                      placeholder={
                        inf.field + (inf.type === "Link" ? " URL" : "")
                      }
                    />
                  );
                return null;
              })}
            </Scope>
          ))}
          <Button type="submit">Generate information</Button>
          <TextArea
            name="area"
            id="result"
            rows={40}
            value={animeData}
            readOnly
            title="return of serach at anilist"
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
  const promiseChallenge = getChallengeInformation(params.challenge as string);

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
