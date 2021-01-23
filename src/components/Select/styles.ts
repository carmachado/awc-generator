import ReactSelect from "react-select";
import styled from "styled-components";

export const MultiSelect = styled(ReactSelect)`
  width: 364px;
  max-width: 90%;

  .react-select__control {
    height: 32px;
    border: 0;
    border-radius: 6px;
    border: solid 1px var(--color-input-border);
    background-color: var(--color-input-background);
    .react-select__value-container {
      height: 32px;
      padding-left: 12px;
      .react-select__single-value {
        color: var(--color-input-text);
        justify-self: center;
      }
    }

    &:hover {
      box-shadow: 0 0 0 1px var(--color-primary);
      border: solid 1px var(--color-primary);
    }
  }

  .react-select__control--is-focused {
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  .react-select__menu {
    background-color: var(--color-white);
    color: var(--color-input-border);
    border: solid 1px var(--color-input-border);

    .react-select__option {
      color: var(--color-input-border);
    }

    .react-select__option--is-selected {
      color: #409eff;
      background-color: var(--color-white);
    }
    .react-select__option--is-focused {
      background-color: #f5f7fa;
    }
  }

  * {
    margin-top: 0;
  }
`;

export const DivSelect = styled.div`
  max-width: 100%;
`;
