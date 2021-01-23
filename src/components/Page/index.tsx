import React, { HTMLAttributes, useState } from "react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscThreeBars } from "react-icons/vsc";

import ThemeSlider from "../ThemeSlider";
import { Childrens, Container, Footer, Navigation, Outer } from "./styles";
import { capitalizeFirstLetter } from "../../libs/utils/capitalizeFirstLetter";

interface Props extends HTMLAttributes<HTMLDocument> {
  navigation: string[];
}

const Page: React.FC<Props> = ({ children, navigation }: Props) => {
  const router = useRouter();
  const [responsive, setResponsive] = useState(false);
  return (
    <Outer>
      <Navigation>
        <div className={`div-nav${responsive ? " responsive" : ""}`}>
          <button
            type="button"
            className="icon"
            onClick={() => setResponsive(!responsive)}
          >
            <VscThreeBars />
          </button>
          <Link href="/">
            <a
              href="/"
              className={router.asPath.trim() === "/" ? "active" : ""}
            >
              Home
            </a>
          </Link>
          {navigation.map((nav) => {
            return (
              <Link href={`/challenges/${nav}`} key={nav}>
                <a
                  href={nav}
                  className={
                    router.asPath.trim() === `/${nav.trim()}` ? "active" : ""
                  }
                >
                  {capitalizeFirstLetter(nav.replace("-", " "))}
                </a>
              </Link>
            );
          })}
        </div>
        <div>
          <ThemeSlider />
        </div>
      </Navigation>
      <Container>
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
    </Outer>
  );
};

export default Page;
