export function memoize<T extends (...args: any[]) => any>(func: T): T {
    const cache: Map<string, ReturnType<T>> = new Map();
    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    } as T;
}