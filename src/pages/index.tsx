import React, { useState, useCallback } from "react";
import { Form } from "@unform/web";

import { Container, Title } from "../styles/index";

import lsnext from "../utils/lsnext";
import getAnimeInformation from "../utils/getAnimeInformation";

import Input from "../components/Input";
import Page from "../components/Page";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import { AnimeInformation } from "../utils/animeDefinitions";

const HomePage: React.FC = () => {
  const [animeData, setAnimeData] = useState("");

  const handleSubmit = useCallback(async (formData: AnimeInformation) => {
    const animeInformation = await getAnimeInformation(formData);
    setAnimeData(animeInformation);
  }, []);

  const user = lsnext?.getItem("@awc-generator:username");

  return (
    <Page>
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

export default HomePage;
