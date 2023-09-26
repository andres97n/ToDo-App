
import { TodoGroup, Todo } from "../interfaces";

import { getCurrentDate } from './date.helper';



export const isTodoGroupComplete = ( todos: boolean[] ): boolean => {
  return todos.every( todo => todo === true );
}

export const getTodoGroupCompleted = ( todoGroup: TodoGroup ): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( todo => ({ 
    ...todo, 
    taskDone: true, 
    task_end_date: getCurrentDate() 
  }));
  todoGroup.completed = true;
  todoGroup.end_date = getCurrentDate();

  return todoGroup;
}

export const getTodoGroupToDone = ( 
  todoGroup: TodoGroup, 
  index: number, 
  todoValue: boolean 
): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( (todo, i) => ({ 
    ...todo, 
    taskDone: (i === index) ? todoValue : todo.taskDone,
    task_end_date: (todoValue && i === index) 
                    ? getCurrentDate() 
                    : todo.task_end_date
  }));
  todoGroup.completed = false;
  todoGroup.end_date = ''

  return todoGroup;
}