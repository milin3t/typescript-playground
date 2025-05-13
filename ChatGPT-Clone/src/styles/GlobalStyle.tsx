// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    background-color: #383838;
    font-family: sans-serif;
  }

  button, input {
    font-family: inherit;
  }
`;

export default GlobalStyle;
