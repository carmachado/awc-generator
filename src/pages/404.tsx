import React from "react";
import { NextPage } from "next";
import Page from "../components/Page";

const Error404: NextPage = () => {
  return (
    <Page navigation={[]}>
      <div>
        <h1>Error 404: Page not found</h1>
      </div>
    </Page>
  );
};

export default Error404;
