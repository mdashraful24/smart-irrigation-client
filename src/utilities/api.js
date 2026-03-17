const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const getApiUrl = (endpoint) => {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.replace(/^\//, '');

    // In production, use the full API base URL
    if (import.meta.env.MODE === 'production') {
        return `${API_BASE_URL}/${cleanEndpoint}`;
    }

    // In development, use the proxy
    return `/api/${cleanEndpoint}`;
};

export const api = {
    getSensorData: () => fetch(getApiUrl('Webdhshboard/latest_sis_sn_01.php')),
    getThresholdData: () => fetch(getApiUrl('Webdhshboard/latest_threshold.php')),
    getValveData: () => fetch(getApiUrl('Webdhshboard/latest_valve.php')),
    setValveState: (state) => {
        const valveValue = state ? 1 : 0;
        return fetch(getApiUrl(`Webdhshboard/insert_valve.php?valve=${valveValue}`));
    },
    setThreshold: (lower, upper) =>
        fetch(getApiUrl(`Webdhshboard/insert_threshold.php?low=${lower}&up=${upper}`))
};
