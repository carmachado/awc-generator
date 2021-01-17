import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  max-width: 90%;
  max-height: 90vh;
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

  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  &::-webkit-resizer {
    background-color: var(--color-green);
  }
`;
