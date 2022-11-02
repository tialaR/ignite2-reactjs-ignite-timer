/* 
ARQUIVO DE DEFINIÇÃO DE TIPOS 

-> Arquivo que só tem tipagem

A extensão d.ts define que dentro desse arquivo eu vou ter códigos
de definição de tipos do TypeScript e nunca códigos de JavaScript
ou qualquer coisa do tipo, ou seja, é um arquivo para definição de tipos 

-> Nesse arquivo só poderei ter códigos específicos do TypeScript, como
por exemplo a interface de um determinado componente.

typeof -> É uma função específica do TS para atribuir a determinado tipo uma tipagem
*/

// import 'styled-components'
// import { defaultTheme } from '../styles/theme/default'

/* Definindo quais serão as variáveis do tema do ThemeType através da utilização
da função typeof */
// type ThemeType = typeof defaultTheme;

/* 
=> Declare module -> Diz para a aplicação que está criando uma tipagem 
para lib do styled-components 
=> Essa implementação faz com que toda vez que eu importar a lib do styled-components
em algum arquivo da aplicação a definição de tipos que ele vai puxar é o que está dentro 
dessa definição
-> Quando o objetivo é sobrescrever algumas definições da lib do styled-components
e não mudar por completo eu preciso importar o styled-components no inicio do arquivo
como está sendo feito aqui, caso contrario eu estaria criando do zero a definição de tipos
do styled-components.
-> Utilizando o import 'styled-components' e o declare module 'styled-componets' eu pego o 
que já tem da lib e adiciono alguma coisa nova

DefaultTheme -> É oferecido pelo styledcomponents justamente para isso (incorporação de temas personalizados pelo dev)
*/

// declare module 'styled-componets' {
//     export interface DefaultTheme extends ThemeType {};
// }

import 'styled-components'
import { defaultTheme } from '../styles/theme/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
