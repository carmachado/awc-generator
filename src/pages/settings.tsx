import React, { useState, useCallback } from "react";
import { Form } from "@unform/web";
import { GetStaticProps } from "next";

import { Container, Title } from "../styles/settings";

import { setItemLocalStorage, getItemLocalStorage } from "../libs/utils/lsnext";

import Page from "../components/Page";
import { getNavigationInformation } from "../libs/utils/getStaticInformation";

interface Props {
  navigation: string[];
}

const HomePage: React.FC<Props> = ({ navigation }: Props) => {
  const handleSubmit = useCallback(async () => {}, []);

  const user = getItemLocalStorage("@awc-generator:username");

  return (
    <Page navigation={navigation}>
      <Container>
        <Form onSubmit={handleSubmit} initialData={{ user }}>
          <Title>Settings</Title>
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
