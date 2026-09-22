import request from "./Api";
import { baseUrl } from "./BaseUrl";


export const registerUser = async (userData) => {
    return await request("/auth/createuser", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};


export const loginUser = async (credentials) => {

    const formData = new URLSearchParams();

    formData.append("grant_type", "password");
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },

        body: formData.toString(),
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (!response.ok) {
        if (Array.isArray(data?.detail)) {
            throw new Error(
                data.detail
                    .map((error) => error.msg)
                    .join(", ")
            );
        }

        throw new Error(
            data?.detail ||
            data?.message ||
            "Login failed"
        );
    }

    return data;
};


export const getCurrentUser = async () => {
    return await request("/auth/user");
};


export const updateUser = async (userData) => {
    return await request("/auth/edituser", {
        method: "PUT",
        body: JSON.stringify(userData),
    });
};


export const changePassword = async (passwordData) => {
    return await request("/auth/passwordchange", {
        method: "PUT",
        body: JSON.stringify(passwordData),
    });
};


export const forgotPassword = async (data) => {
    return await request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
};


export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};