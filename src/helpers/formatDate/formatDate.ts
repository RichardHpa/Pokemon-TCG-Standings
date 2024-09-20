import { format, isValid } from 'date-fns';

export const formatDate = (date: string, formatType: string) => {
    if (!isValid(new Date(date))) return null;
    return format(new Date(date), formatType);
};
