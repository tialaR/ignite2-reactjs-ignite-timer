import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.25rem;
  font-weight: bold;
  flex-wrap: wrap; /* Quero que o conte�do da div quebre quando a tela diminuuir */
`

/* 
    COMPONENTE ESTILIZADO BASE
    -> Componente estilizado que serve de estiliza��o base para criar outros 
    componentes estilizados (os componentes herdam a estiliza��o do componente base)

    obs: o input n�o herda o font-size e o font-weight do container (a n�o ser que a 
        prop inherit seja usada)
*/
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  color: ${(props) => props.theme['gray-100']};

  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  /* Flex: 1
        -> � um atalho p/ setar 3 propriedades. 
        -> flexGrow - quando dou flexibilidade p/ meu componente crescer al�m do 
        tamanho original dele quando o valor � 1
        -> flexShrink - quando eu dou habilidade p/ meu componente diminuir o tamanho
        dele para o menor tamanho caso seja necess�rio eu seto o valor 1
        -> flexBasis - Define qual o tamanho ideal do elemento se ele n�o estiver
        nem maior e nem menor por causa do Grow e do Shrink
        Concluindo o flex 1 define que o elemento vai caber no espa�o que estiver ali
        para ele caber. Mas se tiver mais espa�o ele vai aumentar at� caber.
    */
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
