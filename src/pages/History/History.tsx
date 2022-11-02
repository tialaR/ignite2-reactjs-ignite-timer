import React, { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { CyclesContext } from '../../context/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

export const History: React.FC = () => {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      {/* <pre>{JSON.stringify(cycles, null, 2)}</pre> */}

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles?.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle?.task}</td>
                <td>{cycle?.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(new Date(cycle?.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle?.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}

                  {cycle?.interrupedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}

                  {!cycle?.finishedDate && !cycle?.interrupedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
