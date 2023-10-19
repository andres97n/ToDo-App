import { Todo } from "./Todo.interface";


export interface TodoGroup {
  id: number;
  title: string;
  start_date: Date;
  end_date?: Date;
  completed: boolean;
  todos: Todo[];
}