/*export function memoize(func: Function): Function {
    const cache: Map<string, any> = new Map();
    return function (...args:any[]): any {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    };
}**/

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

/*
function memoize<T = any>(fn: (val: T) => T): (val: T) => T {
    const cache = new Map<T, T>();
    return function (val: T) {
        return cache.has(val)
            ? cache.get(val)!
            : cache.set(val, fn(val)) && cache.get(val)!;
    };
}*/

/**export const memoize = <T = any>(fn:any) => {
    const cache = new Map();
    const cached = function (this: any, val: T) {
      return cache.has(val)
        ? cache.get(val)
        : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
  };**/