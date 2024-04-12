import { format } from 'date-fns';

export const formatDate = (date: string, formatType: string) => {
  return format(new Date(date), formatType);
};
