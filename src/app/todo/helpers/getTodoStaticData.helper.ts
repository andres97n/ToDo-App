import { Message } from "primeng/api";

import { Priority, DateSelection, MenuToggle, MenuValues, Todo } from "../interfaces";
import { getCurrentDate } from "./date.helper";


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

export const errorMessageCard = ( summary: string, detail: string ): Message[] => ([
  {
    severity: 'error',
    summary,
    detail
  }
]);

export const getNewTodo = ( task: string ): Todo => ({
  id: Number(Math.floor(Math.random() * 100000).toString()),
  start_date: getCurrentDate(),
  task, 
  taskDone: false,
  end_date: '',
  task_end_date: '', 
  priority: 0,
  details: ''
});