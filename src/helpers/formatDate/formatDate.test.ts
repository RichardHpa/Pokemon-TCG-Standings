import { formatDate } from './formatDate';

describe('helpers/formatDate', () => {
    it('should return null if the date is invalid', () => {
        const date = 'invalid date';
        const formatType = 'dd/MM/yyyy';
        const result = formatDate(date, formatType);
        expect(result).toBeNull();
    });

    it('should return the formatted date', () => {
        const date = '2021-01-01T00:00:00.000Z';
        const formatType = 'dd/MM/yyyy';
        const result = formatDate(date, formatType);
        expect(result).toBe('01/01/2021');
    });

    it('should return the formatted date with a different format', () => {
        const date = '2021-01-01T00:00:00.000Z';
        const formatType = 'yyyy-MM-dd';
        const result = formatDate(date, formatType);
        expect(result).toBe('2021-01-01');
    });
});
