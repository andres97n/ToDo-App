
import * as dayjs from 'dayjs';


export const getCurrentDate = (): string => {
  return dayjs().format('DD/MM/YYYY');
}