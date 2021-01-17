import styled from "styled-components";

export const StyledButton = styled.button`
  width: 250px;
  height: 32px;
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
`;
