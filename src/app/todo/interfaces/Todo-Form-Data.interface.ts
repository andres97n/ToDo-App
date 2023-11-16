import { PriorityValues } from "./Priority.interface";


export interface TodoFormData {
  task: string; 
  task_end_date?: Date; 
  priority?: PriorityValues;
  details?: string;
}