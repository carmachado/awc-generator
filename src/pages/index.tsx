import React, { useState, useCallback } from "react";
import { Form } from "@unform/web";
import { GetStaticProps } from "next";

import { Container, Title } from "../styles/index";

import { setItemLocalStorage, getItemLocalStorage } from "../utils/lsnext";

import Input from "../components/Input";
import Page from "../components/Page";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import { AnimeInformation } from "../utils/anime/animeDefinitions";
import { getNavigationInformation } from "../utils/getStaticInformation";
import getAnimeInformation from "../utils/anime/getAnimeInformation";

interface Props {
  navigation: string[];
}

const HomePage: React.FC<Props> = ({ navigation }: Props) => {
  const [animeData, setAnimeData] = useState("");

  const handleSubmit = useCallback(async (formData: AnimeInformation) => {
    setItemLocalStorage("@awc-generator:username", formData.user);

    const animeInformation = await getAnimeInformation(formData);
    setAnimeData(animeInformation);
  }, []);

  const user = getItemLocalStorage("@awc-generator:username");

  return (
    <Page navigation={navigation}>
      <Container>
        <Form onSubmit={handleSubmit} initialData={{ user }}>
          <Title>
            AWC
            <br />
            Generator
          </Title>
          <Input
            name="user"
            type="text"
            placeholder="Profile Name"
            title="Profile Name"
            required
          />
          <Input
            name="anime"
            type="numeric"
            placeholder="Anime URL"
            title="Anime URL"
            required
          />
          <Button type="submit">Generate information</Button>
          <TextArea
            name="area"
            id="result"
            rows={5}
            value={animeData}
            readOnly
            title="return of serach at anilist"
          />
        </Form>
      </Container>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const promisePage = getNavigationInformation();

  const dataPage = await promisePage;

  return {
    props: { navigation: dataPage },
    revalidate: 60,
  };
};

export default HomePage;
