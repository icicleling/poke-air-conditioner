import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   :root{
       --color-blue: #87d7f6;
   }

   @font-face {
       font-family: 'DigitalDisplay';
       src: url('/assets/Digital_Display.woff2') format('woff2');
   }
`;

export default GlobalStyle;
