import * as dayjs from 'dayjs';

import { TodoGroup, Todo } from "../interfaces";



export const isTodoGroupComplete = ( todos: boolean[] ): boolean => {
  return todos.every( todo => todo === true );
}

export const getTodoGroupCompleted = ( todoGroup: TodoGroup ): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( todo => ({ ...todo, taskDone: true }));
  todoGroup.completed = true;
  todoGroup.end_date = dayjs().format('DD/MM/YYYY');

  return todoGroup;
}

export const getTodoGroupToDone = ( todoGroup: TodoGroup, todos: boolean[] ): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( (todo, i) => ({ ...todo, taskDone: todos[i] }));
  todoGroup.completed = false;
  todoGroup.end_date = null

  return todoGroup;
}