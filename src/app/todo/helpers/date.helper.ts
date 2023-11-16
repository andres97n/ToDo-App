
import { add, formatISO, isAfter, isBefore } from 'date-fns';

import { TodoGroup } from '../interfaces';


export const getCurrentDateToString = (): string => {
  return formatISO(new Date(), { representation: 'date' });
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

export const getDateByString = ( date: string ): Date | null => {
  if ( !date ) return null;
  
  return new Date( Date.parse( date ));
}

export const getDateFormattedToString = ( date: string ): string => {  
  if ( !date ) return getCurrentDateToString();
  
  const currentDate = new Date(Date.parse( date ));
  return formatISO(currentDate, { representation: 'date' });
}

export const getTomorrow = (): string => {
  const nextDate = add(new Date(), { days: 1 });
  
  return formatISO(nextDate, { representation: 'date' });
}

export const setDateFormatToStaticData = ( todoGroup: any ) : TodoGroup[] => {
  return todoGroup.map( ( group: any ) => {
    const newStartDate: Date = getDateByString( group.start_date! )!;
    if ( group.end_date ) {
      group.end_date = getDateByString( group.end_date );
    }
    
    group.todos.map( ( todo: any ) => {
      const newTodoStartDate: Date = getDateByString( todo.start_date! )!;
      if ( todo.end_date ) {
        todo.end_date = getDateByString( todo.end_date );
      }
      if ( todo.task_end_date ) {
        todo.task_end_date = getDateByString( todo.task_end_date );
      }

      todo.start_date = newTodoStartDate;
    });

    group.start_date = newStartDate;
    return group;
  });
}
