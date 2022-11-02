import styled from 'styled-components'

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; //Vai gerar uma barra de rolagem caso o tamanho da tabela não caiba na tela
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; //Força um scroll quando a tabela estiver em um tamanho menor
  }

  th {
    background-color: ${(props) => props.theme['gray-600']};
    padding: 1rem;
    text-align: left;
    color: ${(props) => props.theme['gray-100']};
    font-size: 0.875rem;
    line-height: 1.6;

    //Arredondando a borda do topo na esquerda
    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    //Arredondando a borda do topo na direita
    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: ${(props) => props.theme['gray-700']};
    border-top: 4px solid ${(props) => props.theme['gray-800']};
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      width: 50%; //Fazendo o 1.o td ocupar a maioria do espaço da tabela
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`
/* Mapeando as cores para as strings do tema do projeto */
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

// Definindo que as cores que eu tenho são as 'keys' do objeto 'STATUS_COLORS'
type StatusProps = {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`

/* 
Tabela no mobile
-> Porque colocar a tabela em volta de uma div?
-> Isso porque não existe uma forma de mostrarmos uma tabela <table>
no mobile de uma forma satisfatória, então a div por volta da tabela\]
quando estivermos no mobile em uma tela menor eu posso fazer com que o usuário
consiga dar scroll na tabela, ou seja, vou fazer com que ele consiga arrastar 
a tabela de um lado para o outro.
-> A unica forma de fazermos a implementação acima é colocando a tabela dentro de 
uma div. Nào da pra fazer scroll em table.

border-collapse: collapse; -> Funciona como se só existisse uma única borda 
entre os td's (isso porque cada td tem sua propria borda)

&::before -> É um elemento que a gente coloca que fica dentro da tag html (no começo)
&::after -> É um elemento que a gente coloca que fica dentro da tag html (no final)

as const -> O typescript quando lê um objeto ele entende que o valor das propriedades
nesse caso pode ser um texto (pode ser qualquer string) -> Entende que pode ser qualquer texto,
ou seja, que pode ser um texto variável. Então para eu dizer para o typescript que 
o texto vai sempre ser um desses 3 e ele não pode mudar eu passo o 'as const' 

keyof typeof STATUS_COLORS -> O typescript não consegue ler o objeto typescript mas sim
a tipagem desse objeto, por isso uso o seletor typeof  
*/
