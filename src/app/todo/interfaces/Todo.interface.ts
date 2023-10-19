import { PriorityValues } from "./Priority.interface";


export interface Todo { 
  id: number ;
  task: string;
  details?: string;
  start_date: Date;
  task_end_date?: Date;
  end_date?: Date;
  taskDone?: boolean;
  priority?: PriorityValues;
}