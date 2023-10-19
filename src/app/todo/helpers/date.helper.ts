
import { add, format, isAfter, isBefore } from 'date-fns';

import { TodoGroup } from '../interfaces';


export const getCurrentDateToString = (): string => {
  return format(new Date(), 'dd/MM/yyyy');
}

export const getCurrentDate = (): Date => {
  return new Date( Date.parse( getCurrentDateToString() ) );
}

export const isDateBefore = ( 
  initialDate: string = '', 
  finalDate: string = '' 
): boolean => {
  const currentInitialDate = new Date(Date.parse( initialDate ));
  const currentFinalDate = new Date(Date.parse( finalDate ));
  return isBefore(currentInitialDate, currentFinalDate);
}

export const isDateAfter = ( 
  initialDate: string = '', 
  finalDate: string = '' 
): boolean => {
  const currentInitialDate = new Date(Date.parse( initialDate ));
  const currentFinalDate = new Date(Date.parse( finalDate ));
  return isAfter(currentInitialDate, currentFinalDate);
}

export const getDateFormatted = ( date: string = '' ): Date => {
  if ( !date ) return new Date();
 
  return new Date( Date.parse( date ));
}

export const getDateFormattedToString = ( date: string ): string => {
  if ( !date ) return getCurrentDateToString();
  
  const currentDate = new Date(Date.parse( date ));
  return format(currentDate, 'dd/MM/yyyy');
}

export const getTomorrow = (): string => {
  const nextDate = add(new Date(), { days: 1 })
  return nextDate.toDateString();
}

export const setDateFormatToStaticData = ( todoGroup: any ) : TodoGroup[] => {
  return todoGroup.map( ( group: any ) => {
    const newStartDate: Date = getDateFormatted( group.start_date! );
    if ( group.end_date ) {
      group.end_date = getDateFormatted( group.end_date );
    }
    
    group.todos.map( ( todo: any ) => {
      const newTodoStartDate: Date = getDateFormatted( todo.start_date! );
      if ( todo.end_date ) {
        todo.end_date = getDateFormatted( todo.end_date );
      }
      if ( todo.task_end_date ) {
        todo.task_end_date = getDateFormatted( todo.task_end_date );
      }

      todo.start_date = newTodoStartDate;
    });

    group.start_date = newStartDate;
    return group;
  });
}
