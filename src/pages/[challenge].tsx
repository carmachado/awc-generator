import React, { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

import { Container, Title } from "../styles/[challenge]";

import lsnext from "../utils/lsnext";
import getAnimeInformation from "../utils/getAnimeInformation";

import Page from "../components/Page";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { Challenge } from "../utils/animeDefinitions";
import getNavigationInformation from "../utils/getNavigationInformation";

interface Props {
  challenge: Challenge;
  navigation: string[];
}

interface ChallangeInformation {
  user: string;
  animes: {
    URL: string;
    fields: string[];
  }[];
}

const ChallengeComponent: React.FC<Props> = ({
  challenge,
  navigation,
}: Props) => {
  const router = useRouter();
  const [animeData, setAnimeData] = useState("");
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    async (formData: ChallangeInformation) => {
      const { user } = formData;
      lsnext?.setItem(
        `@awc-generator:${challenge.name}`,
        JSON.stringify(formData)
      );

      const promises = formData.animes.map(
        ({ URL, fields }, requerementsIndex) => {
          return getAnimeInformation({
            anime: URL,
            user,
            challenge,
            requerementsIndex,
            fields,
          });
        }
      );

      const animeInformation = await Promise.all(promises);

      setAnimeData(`<hr>\n\n${animeInformation.join("\n\n").trim()}\n\n<hr>`);
    },
    [challenge]
  );

  if (router.isFallback) {
    return (
      <div className="fallbackLoading">
        <ReactLoading type="spin" height="10%" width="10%" />
      </div>
    );
  }

  const user = lsnext?.getItem("@awc-generator:username");

  const challangels = lsnext?.getItem(`@awc-generator:${challenge.name}`);

  const initialData = challangels && JSON.parse(challangels);

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
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{ ...initialData, user }}
        >
          <Input
            name="user"
            type="text"
            placeholder="Profile Name"
            title="Profile Name"
            required
          />
          {challenge.requirements?.map((req) => (
            <Scope path={`animes[${req.id}]`}>
              <Input
                key={req.id}
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
  const promisePage = getNavigationInformation();

  const promise = fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/master/${params.challenge}.json`
  );

  const [res, dataPage] = await Promise.all([promise, promisePage]);

  if (res.status === 404) return { notFound: true };

  const data = await res.json();

  return {
    props: { challenge: data, navigation: dataPage },
    revalidate: 60,
  };
};

export default ChallengeComponent;
