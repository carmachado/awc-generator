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
    width: 30px;
    height: 7px;
    margin: 5px;
    position: relative;

    input {
      display: none;
    }

    div {
      background-color: var(--color-white);
      border: solid 1px var(--color-white);

      cursor: pointer;

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;

      border-radius: 4px;

      display: flex;
      align-items: center;

      &::selection {
      }

      &:before {
        background-color: var(--color-white);
        content: "";
        position: absolute;

        height: 15px;
        width: 15px;
        transform: translateX(-3px);

        border-radius: 50%;
        ${({ clicked }) =>
          clicked &&
          css`
            transition: 0.4s;
          `}
      }
    }

    input:checked + div:before {
      transform: translateX(17px);
    }
  }

  svg {
    margin: 0 4px;
    color: var(--color-white);
  }
`;
