import { useEffect, useState } from "react";

export const useData = <TData = unknown>(url: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<TData | undefined>();
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        let aborted = false;

        const fetchNotFound = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json();

                if (!aborted) {
                    setData(data);
                }
            } catch {
                if (!aborted) {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }

        };

        fetchNotFound();

        return () => {
            controller.abort();
            aborted = true;
        };
    }, [url, setLoading, setData, setError]);

    return { loading, data, error };
};
