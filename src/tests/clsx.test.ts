// Even though we 'trust' the clsx package, we still want to test it to make sure it behaves as expected in our environment.
import clsx from 'clsx';

describe('tests/clsx', () => {
    it('should return the same string if no classes are passed', () => {
        const result = clsx();
        expect(result).toBe('');
    });

    it('should return the same string if only one class is passed', () => {
        const result = clsx('class1');
        expect(result).toBe('class1');
    });

    it('should return the same string if multiple classes are passed', () => {
        const result = clsx('class1', 'class2', 'class3');
        expect(result).toBe('class1 class2 class3');
    });

    it('should return the same string if multiple classes are passed with some falsy values', () => {
        const result = clsx(
            'class1',
            false,
            'class2',
            null,
            'class3',
            undefined
        );
        expect(result).toBe('class1 class2 class3');
    });

    it('should return the same string if multiple classes are passed with some objects', () => {
        const result = clsx(
            'class1',
            { class2: true, class3: false },
            'class4'
        );
        expect(result).toBe('class1 class2 class4');
    });
});
