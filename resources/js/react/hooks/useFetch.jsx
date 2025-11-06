import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

/**
 * Custom hook for handling GET API requests (supports conditional auto-refetch)
 *
 * @param {string} url - API endpoint (e.g., '/api/people-count')
 * @param {object} options - optional axios config (params, headers, etc.)
 * @param {number} intervalTime - refetch interval in seconds (0 = fetch only once)
 * @param {boolean} isActive - if false, pauses all fetching
 * @param {boolean} shouldFetchOnce - if true, fetch once on mount
 */
export const useFetch = (
    url,
    options = {},
    intervalTime = 0,
    isActive = true,
    shouldFetchOnce = true
) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const fetchData = useCallback(
        async (overrideOptions = {}) => {
            console.log("yayyyyyyyyyyy");
            
            if (!isActive) return; // skip fetching when inactive

            setIsLoading(true);
            setHasError(null);

            try {
                const response = await api.get(url, overrideOptions || options);
                setData(response.data);
                return response.data;
            } catch (err) {
                console.error("API Error:", err);
                setHasError(err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [url, JSON.stringify(options), isActive]
    );

    // Fetch once on mount (only if interval not set)
    useEffect(() => {
        if (isActive && shouldFetchOnce && intervalTime <= 0) {
            fetchData();
        }
    }, [fetchData, isActive, shouldFetchOnce, intervalTime]);

    // Auto-refetch at interval
    useEffect(() => {
        if (!isActive || intervalTime <= 0) return;

        // Fetch immediately once
        fetchData();

        let intervalId;
        // Delay next intervals slightly to prevent overlap
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                fetchData();
            }, intervalTime * 1000);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [isActive, intervalTime]); // intentionally exclude fetchData to prevent interval resets

    return { data, isLoading, hasError, fetchData };
};
