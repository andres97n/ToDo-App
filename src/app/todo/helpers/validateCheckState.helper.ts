import { TodoGroup, Todo } from "../interfaces";



export const isTodoGroupComplete = ( todos: boolean[] ): boolean => {
  return todos.every( todo => todo === true );
}

export const getTodoGroupCompleted = ( todoGroup: TodoGroup ): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( todo => ({ ...todo, taskDone: true }));

  return todoGroup;
}