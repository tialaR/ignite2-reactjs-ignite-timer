import { Cycle } from "./reducer";

/* 
   --- ACTIONS TYPES ---
   Definindo todas as ACTIONS que eu tenho em meu reducer em um enum  onde
   podemos definir todas as ações que nós temos 
*/
export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

/* Nesse arquivo eu vou criar uma função para cada Action */

//ADICIONAR NOVO CICLO 
export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        }
    }
}

 // MARCAR O CICLO ATUAL COMO FINALIZADO
 /* Nesse caso o activeCycleId há está sendo pego no reducer, então, eu 
 não preciso enviar como parâmetro */
export function markCurrentCycleAsFinishedAction() {
    return { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
}

// CICLO ATIVO INTERROMPIDO 
 /* Nesse caso o activeCycleId há está sendo pego no reducer, então, eu 
 não preciso enviar como parâmetro */
export function interruptCurrentCycleAction() {
    return { type: ActionTypes.INTERRUPT_CURRENT_CYCLE }
}