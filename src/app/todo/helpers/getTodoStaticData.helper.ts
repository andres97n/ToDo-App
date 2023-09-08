import { Priority, DateSelection, MenuToggle, MenuValues } from "../interfaces";


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