
import { add, format, isAfter, isBefore } from 'date-fns';


export const getCurrentDate = (): string => {
  return format(new Date(), 'dd/MM/yyyy');
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

export const getDateFormatted = ( date: string = '' ): string => {
  const currentDate = new Date(Date.parse( date ));
  return format(currentDate, 'dd/MM/yyyy');
  // return dayjs(date).format('DD/MM/YYYY');
}

export const getTomorrow = (): string => {
  const nextDate = add(new Date(), { days: 1 })
  return nextDate.toDateString();
}
