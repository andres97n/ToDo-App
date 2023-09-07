
export enum MenuValues {
  todo = 'todo',
  done = 'done'
} 

export interface MenuToggle {
  label: string;
  value: MenuValues;
}