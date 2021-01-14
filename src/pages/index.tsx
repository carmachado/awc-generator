import React, { useState, useCallback } from "react";
import { Input, Form } from "@rocketseat/unform";
import { SiGithub } from "react-icons/si";

import ThemeSlider from "../components/ThemeSlider";

import { Container, Title, Footer } from "../styles/index";

import lsnext from "../utils/lsnext";
import getAnimeInformation, {
  AnimeInformation,
} from "../utils/getAnimeInformation";

const HomePage: React.FC = () => {
  const [animeData, setAnimeData] = useState("");

  const handleSubmit = useCallback(async (formData: AnimeInformation) => {
    const animeInformation = await getAnimeInformation(formData);
    setAnimeData(animeInformation);
  }, []);

  const user = lsnext?.getItem("@awc-generator:username");

  return (
    <Container>
      <ThemeSlider />
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
        />
        <Input
          name="anime"
          type="numeric"
          placeholder="Anime URL"
          title="Anime URL"
        />
        <button type="submit">Generate information</button>
        <textarea
          name="area"
          id="result"
          rows={5}
          value={animeData}
          readOnly
          title="return of serach at anilist"
        />
      </Form>
      <Footer>
        <a
          href="https://github.com/carmachado/awc-generator"
          title="See Github Project"
        >
          <SiGithub />
        </a>
      </Footer>
    </Container>
  );
};

export default HomePage;
