import ReactSelect from "react-select";
import styled from "styled-components";

export const MultiSelect = styled(ReactSelect)`
  width: 364px;
  max-width: 90%;
  height: 32px;

  .react-select__control {
    height: 32px;
    min-height: 32px;
    border: 0;
    border-radius: 6px;
    border: solid 1px var(--color-input-border);
    background-color: var(--color-input-background);
    .react-select__value-container {
      padding-left: 12px;
      position: initial;
      .react-select__single-value {
        color: var(--color-input-text);
        justify-self: center;
      }
    }

    .react-select__indicators {
      height: 32px;
    }

    &:hover {
      box-shadow: none;
      border: solid 1px var(--color-input-border);
    }
  }

  .react-select__control--is-focused {
    box-shadow: none;
    border: solid 1px var(--color-primary);

    &:hover {
      box-shadow: none;
      border: solid 1px var(--color-primary);
    }
  }

  .react-select__menu {
    background-color: var(--color-white);
    color: var(--color-input-border);
    border: solid 1px var(--color-input-border);

    .react-select__option {
      color: var(--color-input-border);
    }

    .react-select__option--is-selected {
      color: var(--color-select-selected-option);
      background-color: var(--color-white);
    }
    .react-select__option--is-focused {
      background-color: var(--color-select-focused-option);
    }
  }

  * {
    margin-top: 0;
  }
`;

export const DivSelect = styled.div`
  max-width: 100%;
`;
