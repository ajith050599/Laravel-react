import { useState, useEffect, useCallback } from "react";
import api from "../api/axios"; 
/**
 * Custom hook for handling GET + POST API requests (with optional caching)
 * 
 * @param {string} url - API endpoint (e.g., '/api/user-widgets')
 * @param {object} options - optional axios config (params, data, method)
 * @param {number} cacheTime - optional cache time (in seconds, only for GET)
 */
export const useFetch = (url, options = {}, cacheTime = 0) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const fetchData = useCallback(
        async (overrideOptions = {}) => {
            setIsLoading(true);
            setHasError(null);

            const method = (overrideOptions.method || options.method || "GET").toUpperCase();
            const cacheKey = `cache_${method}_${url}_${JSON.stringify(
                overrideOptions.params || options.params || {}
            )}`;

            try {
                if (method === "GET" && cacheTime > 0) {
                    const cached = sessionStorage.getItem(cacheKey);
                    if (cached) {
                        const { data: cachedData, expiry } = JSON.parse(cached);
                        if (!expiry || expiry > Date.now()) {
                            setData(cachedData);
                            setIsLoading(false);
                            return cachedData;
                        } else {
                            sessionStorage.removeItem(cacheKey);
                        }
                    }
                }

                const response =
                    method === "POST"
                        ? await api.post(url, overrideOptions.data || options.data || {}, options)
                        : await api.get(url, overrideOptions || options);

                setData(response.data);

                if (method === "GET" && cacheTime > 0) {
                    sessionStorage.setItem(
                        cacheKey,
                        JSON.stringify({
                            data: response.data,
                            expiry: Date.now() + cacheTime * 1000,
                        })
                    );
                }

                return response.data;
            } catch (err) {
                console.error(" API Error:", err);
                setHasError(err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [url, JSON.stringify(options), cacheTime]
    );

    // Auto-fetch on mount for GET requests
    useEffect(() => {
        if (!options.method || options.method.toUpperCase() === "GET") {
            fetchData();
        }
    }, [fetchData]);

    return { data, isLoading, hasError, fetchData };
};
