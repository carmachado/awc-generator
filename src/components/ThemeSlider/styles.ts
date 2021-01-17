import styled, { css } from "styled-components";

export const Slider = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  justify-items: center;
  align-self: flex-end;
  user-select: none;
  height: 100%;

  label {
    display: inline-block;
    width: 60px;
    height: 34px;
    position: relative;

    input {
      display: none;
    }

    div {
      background-color: var(--color-input-background);
      border: solid 1px var(--color-primary);

      cursor: pointer;

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;

      border-radius: 34px;

      display: flex;
      align-items: center;
      justify-content: space-evenly;

      svg {
        color: var(--color-primary);
      }

      &::selection {
      }

      &:before {
        background-color: var(--color-primary);
        content: "";
        position: absolute;

        height: 26px;
        width: 26px;
        bottom: 3px;
        left: 3px;

        border-radius: 50%;
        ${({ clicked }) =>
          clicked &&
          css`
            transition: 0.4s;
          `}
      }
    }

    input:checked + div:before {
      transform: translateX(26px);
    }
  }
`;
