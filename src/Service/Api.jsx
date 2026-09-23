import { baseUrl } from "./BaseUrl";

const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        ...(options.body
            ? { "Content-Type": "application/json" }
            : {}),
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${baseUrl}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        sessionStorage.setItem(
            "session_expired",
            "true"
        );

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        const message =
            data?.detail ||
            data?.message ||
            `Request failed: ${response.status}`;

        throw new Error(message);
    }

    return data;
};

export default request;