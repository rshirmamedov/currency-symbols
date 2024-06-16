export const sleep = (ms: number, callback?: () => {}) =>
    new Promise(resolve => setTimeout((value) => {
        resolve(value);
        callback?.();
    }, ms));
