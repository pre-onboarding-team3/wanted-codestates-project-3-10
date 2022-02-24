import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    //style reset
    ${reset}

    :root {
    }
`;

export default GlobalStyles;
