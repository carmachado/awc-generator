import styled from "styled-components";

export const StyledInput = styled.input`
  height: 32px;
  padding: 12px 15px;
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
    border: solid 1px var(--color-primary);
  }
`;
