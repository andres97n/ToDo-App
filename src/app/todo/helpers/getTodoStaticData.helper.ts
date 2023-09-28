
import { Priority, 
         DateSelection, 
         MenuToggle, 
         MenuValues, 
         Todo, 
         PriorityValues } from "../interfaces";

import { getCurrentDate } from "./date.helper";


export interface TodoFunction {
  task: string; 
  end_date: Date | string; 
  priority: PriorityValues;
  details: string; 
}

export const priorities: Priority[] = [
  { name: 'Ninguna', code: 0 },
  { name: 'Baja', code: 1 },
  { name: 'Media', code: 2 },
  { name: 'Alta', code: 3 },
];

export const dateStates: DateSelection[] = [
  {label: 'Hoy', value: 'today'}, 
  {label: 'Mañana', value: 'tomorrow'}
];

export const todoStateOptions: MenuToggle[] = [
  { label: 'Por Hacer', value: MenuValues.todo },
  { label: 'Realizadas', value: MenuValues.done }
];

export const emptyTodoGroup = {
  id: 0,
  title: '',
  start_date: new Date(),
  completed: false,
  todos: [],
}

export const emptyTodo: Todo = {
  id: 0,
  task: '',
  start_date: new Date(),
};

export const getNewTodo = ( todo: TodoFunction ): Todo => {

  const { task, end_date, priority, details } = todo;

  const newTodo: Todo = {
    id: Number(Math.floor(Math.random() * 100000).toString()),
    start_date: getCurrentDate(),
    task, 
    taskDone: false,
    end_date: end_date || '',
    task_end_date: '', 
    priority,
    details
  } 

  return newTodo;
};

export const getPriority = ( code: number ): Priority => {
  switch (code) {
    case 0: return { name: 'Ninguna', code: 0 }
    
    case 1: return { name: 'Baja', code: 1 }

    case 2: return { name: 'Media', code: 2 }
  
    case 3: return { name: 'Alta', code: 3 }

    default: return { name: 'Ninguna', code: 0 }
  }
}