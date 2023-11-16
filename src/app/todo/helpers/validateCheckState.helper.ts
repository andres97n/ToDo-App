
import { TodoGroup, Todo, TodoFormData } from "../interfaces";

import { isDateAfter, isDateBefore } from './date.helper';



export const isTodoGroupComplete = ( todos: boolean[] ): boolean => {
  return todos.every( todo => todo === true );
}

export const getTodoGroupCompleted = ( todoGroup: TodoGroup ): TodoGroup => {
  const currentTodos: Todo[] = todoGroup.todos;

  todoGroup.todos = currentTodos.map( todo => ({ 
    ...todo, 
    taskDone: true, 
    task_end_date: new Date()
  }));
  todoGroup.completed = true;
  todoGroup.end_date = new Date();

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
    end_date: (todoValue && i === index) 
                    ? new Date()
                    : todo.end_date
  }));
  todoGroup.completed = false;

  return todoGroup;
}

export const getTodoGroupsSorted = ( todoGroup: TodoGroup[] ): TodoGroup[] => {
  return todoGroup.sort( (a, b) => {
    if (a.end_date && b.end_date) {
      if ( isDateBefore( a.end_date!.toString(), b.end_date!.toString() )) return -1;
      if ( isDateAfter( a.end_date!.toString(), b.end_date!.toString() ) ) return 1;
    }
    return 0;
  });
}

export const getTodosSorted = ( todos: Todo[] ): Todo[] => {
  return todos.sort( (a, b) => {
    if ( Number(a.priority) > Number(b.priority) ) return -1;
    if ( Number(a.priority) < Number(b.priority) ) return 1;
    return 0;
  });
}

export const getNewTodo = ( todo: TodoFormData ): Todo => {
  const { task, task_end_date, priority, details } = todo;

  const newTodo: Todo = {
    id: Number(Math.floor(Math.random() * 100000).toString()),
    start_date: new Date(),
    task, 
    taskDone: false,
    task_end_date,
    priority,
    details
  } 

  return newTodo;
};