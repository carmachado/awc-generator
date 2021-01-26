import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { NavigationResponse } from "../../libs/utils/getStaticInformation";
import { capitalizeFirstLetter } from "../../libs/utils/capitalizeFirstLetter";
import { StyledNavLink } from "./styles";

interface Props {
  navigation: NavigationResponse;
}

const NavLink: React.FC<Props> = ({ navigation }: Props) => {
  const router = useRouter();

  const path = navigation.file
    ? `/challenges/${navigation.file.trim()}`
    : `/${navigation.path}`;
  return (
    <Link href={path} key={path} prefetch={false}>
      <StyledNavLink
        href={path}
        className={router.asPath.trim() === path ? "active" : ""}
      >
        {capitalizeFirstLetter(navigation.name)}
      </StyledNavLink>
    </Link>
  );
};

export default NavLink;
