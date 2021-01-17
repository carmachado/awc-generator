import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  max-width: 500px;
  line-height: 56px;

  margin-top: 0;
  text-align: center;
  color: var(--color-primary);
`;

export const Container = styled.div`
  max-width: 95%;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    * {
      margin-top: 8px;
    }
  }
`;
