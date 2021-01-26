import React, { HTMLAttributes, useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscThreeBars } from "react-icons/vsc";
import {
  MdSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import ThemeSlider from "../ThemeSlider";
import {
  Childrens,
  Container,
  Footer,
  Navigation,
  Outer,
  NavRight,
} from "./styles";
import { NavigationResponse } from "../../libs/utils/getStaticInformation";
import NavLink from "../NavLink";

interface Props extends HTMLAttributes<HTMLDocument> {
  navigation: NavigationResponse[];
}

const Page: React.FC<Props> = ({ children, navigation }: Props) => {
  const [responsive, setResponsive] = useState(false);
  const [open, setOpen] = useState("");

  const router = useRouter();

  useEffect(() => {
    setResponsive(false);
    setOpen("");
  }, [router]);

  return (
    <Outer onClick={() => setOpen("")}>
      <Navigation>
        <div className={`div-nav${responsive ? " responsive" : ""}`}>
          <button
            type="button"
            className="icon"
            onClick={() => setResponsive(!responsive)}
          >
            <VscThreeBars />
          </button>

          <NavLink navigation={{ name: "Home", path: "" }} />

          {navigation.map((nav) => {
            if (nav.childrens) {
              return (
                <div key={nav.name} className="parent">
                  <button
                    type="button"
                    onClick={(e) => {
                      setOpen(nav.name === open ? "" : nav.name);
                      e.stopPropagation();
                    }}
                  >
                    {nav.name}
                    {open === nav.name ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </button>
                  <div
                    className={`childs${responsive ? " responsive" : ""}${
                      open === nav.name ? " open" : ""
                    }`}
                  >
                    {nav.childrens.map((child) => (
                      <NavLink key={child.name} navigation={child} />
                    ))}
                  </div>
                </div>
              );
            }

            return <NavLink key={nav.name} navigation={nav} />;
          })}
        </div>
        <NavRight>
          <ThemeSlider />
          <Link href="/settings" prefetch={false}>
            <a href="/settings">
              <MdSettings size={25} />
            </a>
          </Link>
        </NavRight>
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
