import { createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
    font-family: 'Segoe UI', Tahona, Geneva, Verdana, sans-serif;
}
`;

export default GlobalStyles;