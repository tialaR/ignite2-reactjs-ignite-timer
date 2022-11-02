import { produce } from 'immer'
import { ActionTypes } from "./actions"

export interface Cycle {
    id: string // Toda vez q/ eu tenha uma lista de itens eu devo ter um id que represente cada iten de forma única
    task: string
    minutesAmount: number
    startDate: Date /* Data que o timer ficou ativo (com base nessa data 
      vamos conseguir saber quuando tempo passou em nosso timer) */
    interrupedDate?: Date /* Prop que serve para mostrar quando (em qual data) um ciclo foi
    interrompido caso ele tenha sido interrompido pela metade (o ciclo pode ser
      interrompido ou não por isso ela é opcional) */
    finishedDate?: Date /* Prop que serve para mostrar quando (em qual data) um ciclo foi
    encerrado (essa variável é opcional pois o ciclo ela só será preenchida se o ciclo for 
      realmente encerrado, ou seja, se não for interrompido durante suia duração) */
  }

//Estado dos Ciclos (tipo da informação que vou salvar dentro dos ciclos)
interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
      case ActionTypes.ADD_NEW_CYCLE: {
        /*
        CÓDIGO APLICANDO A IMUTABILIDADE

        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }*/

        //CÓDIGO APLICANDO A IMUTABILIDADE POR DEBAIXO DOS PANOS
        return produce(state, (draft) => {
          draft.cycles.push(action.payload.newCycle)
          draft.activeCycleId = action.payload.newCycle.id
        })
      }
      case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
        /*
        CÓDIGO APLICANDO A IMUTABILIDADE

        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }*/

        //CÓDIGO APLICANDO A IMUTABILIDADE POR DEBAIXO DOS PANOS
        const currentCycleIndex = state.cycles.findIndex(cycle => {
          return cycle.id === state.activeCycleId
        })

        /* Nenhum ciclo ativo foi encontrado então eu não faço nada 
           retorno meu estado sem realizar nenhuma alteração */
        if (currentCycleIndex < 0) {
          return state
        }        

        /* Nesse caso algum ciclo ativo foi encontrado então eu 
           retorno meu estado realizando as devidas alterações */
        return produce(state, (draft) => {
          draft.activeCycleId = null
          draft.cycles[currentCycleIndex].interrupedDate = new Date()
        })
      }
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
        /*
        CÓDIGO APLICANDO A IMUTABILIDADE

        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }*/

         //CÓDIGO APLICANDO A IMUTABILIDADE POR DEBAIXO DOS PANOS
         const currentCycleIndex = state.cycles.findIndex(cycle => {
          return cycle.id === state.activeCycleId
        })

        /* Nenhum ciclo ativo foi encontrado então eu não faço nada 
           retorno meu estado sem realizar nenhuma alteração */
        if (currentCycleIndex < 0) {
          return state
        }        

        /* Nesse caso algum ciclo ativo foi encontrado então eu 
           retorno meu estado realizando as devidas alterações */
        return produce(state, (draft) => {
          draft.activeCycleId = null
          draft.cycles[currentCycleIndex].finishedDate = new Date()
        })
      }
      default:
        return state
    }
}