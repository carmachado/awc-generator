import React, { useCallback } from "react";
import { Form } from "@unform/web";
import { GetStaticProps } from "next";
import { useAlert } from "react-alert";

import { Container, Title } from "../styles/settings";

import { setItemLocalStorage } from "../libs/utils/lsnext";

import Page from "../components/Page";
import {
  getNavigationInformation,
  getSettings,
} from "../libs/utils/getStaticInformation";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import CheckboxInput from "../components/CheckboxInput";
import { capitalizeFirstLetter } from "../libs/utils/capitalizeFirstLetter";
import { Alert } from "../styles/global";

interface Props {
  navigation: string[];
}

const HomePage: React.FC<Props> = ({ navigation }: Props) => {
  const alert = useAlert();

  const handleSubmit = useCallback(
    async (formData) => {
      const data = {
        ...formData,
        language: {
          value: formData.language,
          label: capitalizeFirstLetter(formData.language),
        },
      };

      setItemLocalStorage("@awc-generator:settings", JSON.stringify(data));

      alert.show(<Alert>Settings updated</Alert>, {
        type: "success",
        timeout: 3000,
      });
    },
    [alert]
  );

  const settings = getSettings();

  return (
    <Page navigation={navigation}>
      <Container>
        <Form onSubmit={handleSubmit} initialData={settings}>
          <Title>Settings</Title>

          <h2>Emojis</h2>
          <div className="emojis">
            <Input name="notCompleted" label="Not completed" />
            <Input name="watching" label="Watching" />
            <Input name="completed" label="Completed" />
          </div>
          <h2>Layout</h2>
          <div className="layout">
            <CheckboxInput
              name="previewCards"
              label="Use preview cards"
              underDiv
            />
            <Select
              name="language"
              label="Language"
              underDiv
              options={[
                { value: "romaji", label: "Romaji" },
                { value: "english", label: "English" },
              ]}
            />
          </div>
          <Button type="submit">Save</Button>
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
