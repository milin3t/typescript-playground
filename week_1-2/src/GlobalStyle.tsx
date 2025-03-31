import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'GowunDodum-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'GowunDodum-Regular';
  }
  
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #6a6c51;
    font-family: 'GowunDodum-Regular';
  }
`;

export default GlobalStyle;
