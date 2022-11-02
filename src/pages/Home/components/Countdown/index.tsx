import { differenceInSeconds } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'

import { CountDownContainer, Separator } from './styles'

const Countdown: React.FC = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  /* 
    Convertendo o número de minutos que eu tenho em meu ciclo 
    (que é inserido pelo usuárioo) em segundos (isso porque é mais fácil trabalhar em segundos
    do que em minutos, porque o timer vai reduzir de segundo em segundo): 
    -> Preciso lembrar que o ciclo pode estar ativo ou não (quando a pessoa da um F5 na 
      tela não fica com nenhum ciclo ativo) 
    -> totalSeconds === Se eu tiver um ciclo ativo totalSeconds recebe o valor do ciclo em 
    segundos, caso contrario totalSeconds recebe o
  */
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // Criando intervalo de redução de segundos do countdown
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate), // se o startDate for uma string isso será convertido em uma data e se já for uma data nada será feito
        )

        /* 
          Essa lógica define que eu só vou atualizar a quantidade de segundos 
          que passou se eu ainda não completei o total de segundos inserido no countdown
          ou seja, se o total de segundos que eu percorri já foi === ou > que o número
          de tempo que o meu ciclo tem eu marco o ciclo como completo, caso contrário (se
          eu não completei ainda, ou seja, se eu não cheguei a zero) eu continuo 
          abaixando o meu countdown 
        */
        if (secondsDifference >= totalSeconds) {
          // Definindo que o ciclo foi encerrado
          markCurrentCycleAsFinished()

          // Zerando o conuntdown por completo
          setSecondsPassed(totalSeconds)

          // Parar de executar o ciclo
          clearInterval(interval)
        } else {
          /* Eu só vou atualizar o a quantidade de segundos do ciclo que está passando 
          se eu ainda não completei o total de segundos */
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
      /* Como esses 1000 segundos do não são precisos eu posso comparar 
      a data atual com a data que eu salvei no estado e ver quantos segundos 
      já se passaram utilizando uma função do date-fns chamada differenceInSeconds
      que calcula a diferença de duas datas em segundos */
    }

    /* 
       ->Essa função de retorno do useEffec serve para limpar/resetar o que
        eu estava fazendo no useEffect anteriormente para que não aconteça mais.
        ex: Tomando como base o exemplo do setInterval criado dentro do useEffect acima
        cada vez que ele executa eu crio um novo, ou seja, eu nunca deleto o intervalo, 
        eles estão sempre sendo recriados quando acontece alguma mudança na variável 'activeCycle'
       -> Essa função é ótima para deletar os intervalos que eu não preciso mais. Então como
        eu criei um novo ciclo e isso gerou um novo setInterval o que eu tinha anteriormente eu 
        preciso remover.
     */
    return () => {
       // Parar de executar o ciclo
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ])

  /* 
    Essa variável vai ilustrar o tanto de tempo que já passou 
    -> Se eu tiver um ciclo ativo vai ser o total de segundos menos quantos segundos 
    já se passaram senão vai ser 0
  */
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  /* Calculando o total de minutos que eu tenho dentro do currentSeconds */
  const minutesAmount = Math.floor(currentSeconds / 60)
    /* Calculando o total de segundos que eu tenho do resto da divisão de minutesAmount */
  const secondsAmount = currentSeconds % 60

  /* padStart -> É um método que preenche uma string ,no começo da string, até um tamanho específico
        caso ela não tenha aquele tamanho ainda com algum caractere
    */
        const minutes = String(minutesAmount).padStart(2, '0')
        const seconds = String(secondsAmount).padStart(2, '0')

  /*
      MOSTRAR COUNTDOWN NA ABA DO NAVEGADOR
      =>Atualizando o título da aba (janela) toda vez que os meus minutos e segundos
        mudarem (isso caso eu tenha um ciclo ativo)
        obs: Quando você nãon está na mesma aba o intervalo não roda de 1 em um segundo
    */
        useEffect(() => {
          if (activeCycle) {
            document.title = `${minutes}:${seconds}`
          }
        }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountDownContainer>
  )
}

export { Countdown }
