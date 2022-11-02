import { createGlobalStyle } from 'styled-components'

/* Estilos globais da aplicação */
export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0; /*No navegador por padrão o foco sempre é definido 
        com o outline (estou tirando isso do evento de foco e colocando 
        esse evento no box-shadow para essa funcionalidade)*/
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
        /* 0 no eixo x, 0 no eixo y, 0 de blur e com a cor green-500 */
    }

    body {
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
