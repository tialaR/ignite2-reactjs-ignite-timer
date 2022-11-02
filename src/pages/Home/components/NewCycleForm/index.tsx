import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../context/CyclesContext'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

const NewCycleForm: React.FC = () => {
  const { activeCycle } = useContext(CyclesContext)

  // Utilizando o contexto fornecido pelo react hook form
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      {/* 
        datalist -> É uma lista de sugestões para um input' 
        option -> posso passar cada sugestão dessa lista como uma option que precisa
        ter um valor
      */}
      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 4"></option>
        <option value="Projeto 5"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

export { NewCycleForm }
