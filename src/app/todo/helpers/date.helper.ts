
import * as dayjs from 'dayjs';


export const getCurrentDate = (): string => {
  return dayjs().format('DD/MM/YYYY');
}

export const isDateBefore = ( 
  initialDate: string = '', 
  finalDate: string = '' 
): boolean => {
  return dayjs(initialDate).isBefore(finalDate);
}

export const isDateAfter = ( 
  initialDate: string = '', 
  finalDate: string = '' 
): boolean => {
  return dayjs(initialDate).isAfter(finalDate);
}

export const getDateFormatted = ( date: string = '' ): string => {
  return dayjs(date).format('DD/MM/YYYY');
}

export const getTomorrow = (): string => {
  return dayjs().add(1, 'day').format('DD/MM/YYYY');
}
