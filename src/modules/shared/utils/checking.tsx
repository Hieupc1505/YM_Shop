// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args:
        | Parameters<T["addEventListener"]>
        // eslint-disable-next-line @typescript-eslint/ban-types
        | [string, Function | null, ...any]
): void {
    if (obj && obj.addEventListener) {
        obj.addEventListener(
            ...(args as Parameters<HTMLElement["addEventListener"]>)
        );
    }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args:
        | Parameters<T["removeEventListener"]>
        // eslint-disable-next-line @typescript-eslint/ban-types
        | [string, Function | null, ...any]
): void {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(
            ...(args as Parameters<HTMLElement["removeEventListener"]>)
        );
    }
}

export const isBrowser = typeof window !== "undefined";

export const isNavigator = typeof navigator !== "undefined";