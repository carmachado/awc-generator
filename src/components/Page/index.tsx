import React, { HTMLAttributes } from "react";
import { SiGithub } from "react-icons/si";
import ThemeSlider from "../ThemeSlider";
import { Childrens, Container, Footer } from "./styles";

const Page: React.FC<HTMLAttributes<HTMLLIElement>> = ({
  children,
}: HTMLAttributes<HTMLLIElement>) => {
  return (
    <Container>
      <ThemeSlider />
      <Childrens>{children}</Childrens>
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

export default Page;
