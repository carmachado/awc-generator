import styled from "styled-components";

interface Props {
  color?: string;
}

export const StyledButton = styled.button<Props>`
  width: 250px;
  height: 32px;
  background: var(${(props) => `--color-${props.color || "green"}`});
  border-radius: 5px;
  border: 0;
  color: var(--color-white);
  font-weight: bold;
  transition: background-color 0.2s;
  max-width: 90%;

  &:hover {
    filter: brightness(90%);
  }
`;
