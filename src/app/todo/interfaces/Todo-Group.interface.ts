import { Todo } from "./Todo.interface";


export interface TodoGroup {
  id: number;
  title: string;
  start_date: Date | string;
  end_date?: Date | string;
  completed: boolean;
  todos: Todo[];
}