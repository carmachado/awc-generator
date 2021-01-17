import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  max-width: 500px;
  line-height: 56px;

  margin-top: 0;
  text-align: center;
  color: var(--color-primary);
`;

export const Footer = styled.footer`
  margin: 0 auto;
  padding-top: 8px;

  a {
    color: var(--color-primary);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
`;

export const Childrens = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  * {
    margin-top: 8px;
  }
`;
