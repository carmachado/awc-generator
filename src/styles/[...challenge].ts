import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  max-width: 500px;
  line-height: 56px;

  margin-top: 0;
  text-align: center;
  color: var(--color-primary);

  a {
    text-decoration: none;
    color: var(--color-primary);
  }
`;

export const Container = styled.div`
  max-width: 95%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;

    * {
      margin-top: 8px;
    }

    .react-datepicker__tab-loop,
    .react-datepicker__tab-loop *,
    .react-datepicker__input-container *,
    .react-datepicker-popper * {
      margin-top: 0;
    }

    label {
      max-width: 100%;
      white-space: pre-wrap;
      margin-top: 24px;
    }

    input {
      max-width: 100%;
      width: 100%;
    }

    textarea,
    button {
      align-self: center;
      resize: none;
    }
  }

  .flex-line {
    display: inline-flex;
    input + input {
      margin-left: 8px;
    }
  }
`;

export const AnimeDiv = styled.div`
  div {
    margin-top: 0;
    flex-grow: 100;
    display: flex;
    button {
      align-self: flex-end !important;
      width: 40px;
      height: 32px;
      background-color: transparent;
      border: 0;

      svg {
        height: 32px;
        width: 32px;
        margin-top: 0;
        color: var(--color-primary);

        &:hover {
          filter: brightness(80%);
        }
      }
    }
  }
`;
