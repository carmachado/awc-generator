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

  form {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    * {
      margin-top: 8px;
    }

    input {
      height: 52px;
      padding: 14px 16px;
      border: 0;
      border-radius: 6px;
      color: var(--color-input-text);
      border: solid 1px var(--color-input-border);
      background-color: var(--color-input-background);
      width: 364px;
      max-width: 90%;

      &::placeholder {
        color: var(--color-input-placeholder);
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--color-primary);
      }
    }

    button {
      width: 364px;
      height: 48px;
      background: var(--color-green);
      border-radius: 5px;
      border: 0;
      color: var(--color-white);
      font-weight: bold;
      transition: background-color 0.2s;
      max-width: 90%;

      &:hover {
        background: var(--color-green-dark);
      }
    }

    textarea {
      max-width: 90%;
      width: 700px;
      background-color: var(--color-input-background);
      color: var(--color-input-text);
      border-radius: 5px;
      border: solid 1px var(--color-input-border);
      overflow-x: none;
      padding: 8px 12px;
      margin: 8px;

      letter-spacing: normal;
      word-spacing: normal;
      text-transform: none;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      appearance: textarea;
    }
  }
`;
