import { useCallback, useEffect, useRef } from "react";

interface useTimeoutProps {
    callback: () => void;
    delay: number;
}

export const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear };
};