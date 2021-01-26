import styled from "styled-components";

export const StyledNavLink = styled.a`
  float: left;
  color: var(--color-white);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 16px;

  &.active {
    border-bottom: solid 2px var(--color-select-selected-option);
  }

  &:hover {
    background-color: var(--color-background-nav-hover);
  }
`;
