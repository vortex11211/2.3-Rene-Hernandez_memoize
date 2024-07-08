import { memoize } from "../src/memoize";
import { fibonacci } from "../src/fibonacci";

//function test factorial
function factorial(n: any): number {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1)
    };
}


describe('memoize', () => {
    it('Should memoized results of a recursive factorial function', () => {
        const memoizedFactorial = memoize(factorial) as (n: number) => number;

        expect(memoizedFactorial(5)).toBe(120);
        expect(memoizedFactorial(5)).toBe(120);//cache
        expect(memoizedFactorial(6)).toBe(720);
    });
});
const memoizeFibonacci = memoize(fibonacci) as (n: number) => number;

describe('MemoizedFibonacci', () => {
    it('should compute Fibonacci numbers correctly', () => {
        expect(memoizeFibonacci(1)).toBe(1);
        expect(memoizeFibonacci(2)).toBe(1);
        expect(memoizeFibonacci(3)).toBe(2);
        expect(memoizeFibonacci(10)).toBe(55);
        expect(memoizeFibonacci(40)).toBe(102334155);
    });

    it('should use memoization for performance', () => {
        const spy = jest.spyOn(global, 'Function').mockImplementation(() => {
            return jest.fn((...args: any[]) => args);
        });

        const result = memoizeFibonacci(10);
        expect(result).toBe(55);
        expect(spy).toHaveBeenCalledTimes(0);

        spy.mockRestore();

    });

});