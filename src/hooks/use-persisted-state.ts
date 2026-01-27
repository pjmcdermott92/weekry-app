import { useEffect, useState } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
    const [state, setState] = useState<T>(() => {
        if (typeof window === 'undefined') return defaultValue;

        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {}
    }, [key, state]);

    return [state, setState] as const;
}
