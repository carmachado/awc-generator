import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, body {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --color-green: #238636;
    --color-red: #E85D75;
    --color-blue: #3db4f2;
    --color-white: #FFF;
    --color-background: #0d1117;
    --color-background-nav: #161b22;
    --color-input-background: #090d13;
    --color-input-text: #c9d1d9;
    --color-input-border: #21262d;
    --color-input-placeholder: #8b949e;
    --color-primary: #FFF;

    --color-background-nav-hover: #21262d;

    --color-select-selected-option: #409eff;
    --color-select-hover-option: #1c283b;
    --color-select-focused-option: #f5f7fa;
  }

  .light-mode {
    --color-white: #FFF;
    --color-background: #FFF;
    --color-background-nav: #24292e;
    --color-input-background: #f2f5f7;
    --color-input-text: #24292e;
    --color-input-border: trasparent;
    --color-input-placeholder: #8b949e;
    --color-select-hover-option: #ced9e1;
    --color-primary: #24292e;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-primary);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font: 16px "Nunito", sans-serif;
  }

  h1, h2, h3, h4 {
    font-family: "Nunito", sans-serif;
    font-style: normal;
  }

  h1 {
    font-weight: 800;
  }

  h2 {
    font-weight: 700;
  }

  h3 {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  .fallbackLoading {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
  }

  .full_loading {
    align-items: center;
    justify-content: center;
    display: flex;
    position:fixed;
    top:0;
    width:100%;
    height:100%;
    background:#000;
    opacity: 0.7;
    filter: alpha(opacity=70); /* For IE8 and earlier */
    z-index:10000;

  }

  body::-webkit-scrollbar {
  width: 1em;
}

  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  body::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  *:focus-visible  {
    border: solid 1px var(--color-primary);
  }

  button:focus-visible  {
    border: solid 1px var(--color-primary) !important;
  }

  .react-datepicker, .react-datepicker__header, .react-datepicker__current-month ,
  .react-datepicker__day, .react-datepicker__day-name,
  .react-datepicker__today-button, .react-datepicker__year-dropdown, .react-datepicker__month-dropdown {
    background-color: var(--color-input-background);
    color: var(--color-input-text);
  }

  .react-datepicker__month-read-view, .react-datepicker__year-read-view {
    font-weight: bold;
  }

  .react-datepicker__navigation--next {
    border-left-color: var(--color-input-text);
  }

  .react-datepicker__navigation--previous {
    border-right-color: var(--color-input-text);
  }

  .react-datepicker__month-read-view:hover, .react-datepicker__year-read-view:hover, .react-datepicker__navigation:hover {
    color: var(--color-select-selected-option);
  }

  .react-datepicker__day:hover, .react-datepicker__year-option:hover, .react-datepicker__month-option:hover {
    background-color: var(--color-select-hover-option);
  }

  .react-datepicker__day--selected {
    background-color: var(--color-select-selected-option);
    color: var(--color-white);
  }

  .react-datepicker__year-dropdown-container {
    align-items: center;
  }

  .react-datepicker__current-month, .react-datepicker__month-read-view--down-arrow, .react-datepicker__year-read-view--down-arrow {
    display: none;
  }

  .react-datepicker__close-icon::after {
    background-color: var(--color-red);
    color: var(--color-white);
  }
`;

export const Alert = styled.div`
  text-transform: none;
`;
