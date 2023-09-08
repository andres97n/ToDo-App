import { Priority, Todo } from "../interfaces";


export const getResetForm = ( todo: Todo ) => ({
  task: todo.task,
  detail: todo.details,
  date: new Date(),
  priority: getPriorityName(todo.priority!),
})


const getPriorityName = ( priority: number ): Priority => {
  switch (priority) {
    case 0: return { name: 'Ninguna', code: 0 }

    case 1: return { name: 'Baja', code: 1 }

    case 2: return { name: 'Media', code: 2 }

    case 3: return { name: 'Alta', code: 3 }

    default: return { name: 'Ninguna', code: 0 }
  }
}