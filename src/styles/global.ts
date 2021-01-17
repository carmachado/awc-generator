import { cssVar, shade } from "polished";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, body {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --color-green: #238636;
    --color-green-dark: ${shade(
      0.2,
      cssVar("--color-green", "#238636").toString()
    )};
    --color-white: #FFF;
    --color-background: #0d1117;
    --color-background-nav: #161b22;
    --color-input-background: #090d13;
    --color-input-text: #c9d1d9;
    --color-input-border: #21262d;
    --color-input-placeholder: #8b949e;
    --color-primary: #FFF;

    --color-background-nav-hover: #21262d;
  }

  .light-mode {
    --color-white: #FFF;
    --color-background: #FFF;
    --color-background-nav: #24292e;
    --color-input-background: #f2f5f7;
    --color-input-text: #24292e;
    --color-input-border: trasparent;
    --color-input-placeholder: #8b949e;
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
`;
