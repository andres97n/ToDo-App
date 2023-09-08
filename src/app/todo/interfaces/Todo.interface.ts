import { PriorityValues } from "./Priority.interface";


export interface Todo { 
  id: number ;
  task: string;
  details?: string;
  start_date: Date | string;
  task_end_date?: Date | string;
  end_date?: Date | string;
  taskDone?: boolean;
  priority?: PriorityValues;
}