import { format, parseISO } from 'date-fns';

export const formatDate = (date: string, formatType: string) => {
  return format(new Date(date), formatType);
};

export const parseDate = (date: string) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
};
