import styled from "styled-components";

export const Title = styled.h1`
  font-size: 36px;
  max-width: 500px;
  line-height: 56px;
  width: 100%;
  align-self: center;

  margin-top: 0;
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 16px;
`;

export const Container = styled.div`
  max-width: 95%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  h2 {
    align-self: left;
  }

  section {
    border-top: solid 1px var(--color-primary);
    width: 100%;
    margin-bottom: 16px;
    max-width: 100%;

    button {
      margin-bottom: 0;
      margin-right: 8px;
    }
  }

  .emojis {
    display: grid;
    grid-template-columns: 33% 34% 33%;
    grid-template-rows: 50% 50%;
    align-items: center;
    grid-auto-flow: column;
  }

  .layout {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    input {
      width: 16px;
      margin-right: 8px;
      &:focus {
        box-shadow: none;
      }
    }

    input:checked + label {
      color: var(--color-primay);
    }
  }
  button {
    width: 160px;
    margin-bottom: 32px;
  }
`;
