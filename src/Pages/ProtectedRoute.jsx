import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {

    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    let user = null;

    try {
        user = storedUser
            ? JSON.parse(storedUser)
            : null;
    } catch (error) {
        console.error("User JSON error:", error);
    }

    let role = user?.role || storedRole;

    
    if (!role && token) {

        try {

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            console.log("JWT payload:", payload);

            role =
                payload.role ||
                payload.user_role ||
                payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        } catch (error) {

            console.error(
                "Could not decode token:",
                error
            );

        }
    }

    role = role?.toLowerCase();

    console.log("========== PROTECTED ROUTE ==========");
    console.log("Token:", !!token);
    console.log("User:", user);
    console.log("Role:", role);
    console.log("Allowed roles:", allowedRoles);
    console.log("====================================");


    if (!token) {
        return <Navigate to="/login" replace />;
    }

 
    if (!allowedRoles.includes(role)) {

        console.log(
            "❌ ACCESS DENIED - redirecting to home"
        );

        return <Navigate to="/" replace />;
    }

    console.log("✅ ACCESS GRANTED");

    return <Outlet />;
};

export default ProtectedRoute;