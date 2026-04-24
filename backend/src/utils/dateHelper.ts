import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date: Date | string, pattern = 'yyyy-MM-dd') => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isValid(d) ? format(d, pattern) : '';
};