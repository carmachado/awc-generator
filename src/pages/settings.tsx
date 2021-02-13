import React, { useCallback, useRef, useState } from "react";
import { Form } from "@unform/web";
import { GetStaticProps } from "next";
import { useAlert } from "react-alert";

import { Container, Title } from "../styles/settings";

import { setItemLocalStorage } from "../libs/utils/lsnext";

import Page from "../components/Page";
import { getNavigationInformation } from "../libs/utils/getStaticInformation";
import { getSettings } from "../libs/utils/getLocalInformation";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import CheckboxInput from "../components/CheckboxInput";
import { capitalizeFirstLetter } from "../libs/utils/capitalizeFirstLetter";
import { Alert } from "../styles/global";
import { DefaultPageProps } from "../libs/utils/pageTypes";
import {
  clearStorage,
  downloadStorage,
  importStorage,
} from "../libs/settings/dataHandler";

const HomePage: React.FC<DefaultPageProps> = ({
  navigation,
}: DefaultPageProps) => {
  const alert = useAlert();
  const inputFile = useRef(null);
  const formRef = useRef(null);

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

      alert.show(<Alert>Settings updated</Alert>, { type: "success" });
    },
    [alert]
  );

  const clearData = useCallback(() => {
    clearStorage();
    formRef.current.setData(getSettings());

    alert.show(<Alert>Data cleared</Alert>, { type: "success" });
  }, [alert, formRef]);

  const importData = useCallback(async () => {
    if (inputFile.current.files && inputFile.current.files[0]) {
      try {
        await importStorage(inputFile.current.files[0]);

        formRef.current.setData(getSettings());

        alert.show(<Alert>Data imported</Alert>, { type: "success" });
      } catch (error) {
        alert.show(<Alert>File is not a JSON</Alert>, { type: "error" });
      }
    }
    inputFile.current.value = "";
  }, [inputFile, alert, formRef]);

  const openFile = useCallback(() => inputFile.current.click(), []);

  const settings = getSettings();
  return (
    <Page navigation={navigation}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={settings}>
          <Title>Settings</Title>

          <h2>Emojis</h2>
          <section className="emojis">
            <Input name="notCompleted" label="Not completed" />
            <Input name="watching" label="Watching" />
            <Input name="completed" label="Completed" />
          </section>
          <h2>Layout</h2>
          <section className="layout">
            <CheckboxInput
              name="previewCards"
              label="Use preview cards"
              underDiv
            />
            <Select
              name="language"
              label="Title Language"
              underDiv
              options={[
                { value: "romaji", label: "Romaji" },
                { value: "english", label: "English" },
              ]}
            />
          </section>
          <Button type="submit">Save</Button>

          <h2>Challenges</h2>
          <section>
            <Button type="button" color="blue" onClick={downloadStorage}>
              Export data
            </Button>
            <Button type="button" color="blue" onClick={openFile}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={importData}
                accept=".json"
              />
              Import data
            </Button>
            <Button type="button" color="red" onClick={clearData}>
              Clear data
            </Button>
          </section>
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
