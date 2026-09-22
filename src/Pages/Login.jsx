import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../Service/AuthService";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const sessionExpired =
            sessionStorage.getItem("session_expired");

        if (sessionExpired === "true") {
            toast.error(
                "Session expired. Please login again."
            );

            sessionStorage.removeItem(
                "session_expired"
            );
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await loginUser({
                username,
                password,
            });

            console.log(
                "Login response:",
                data
            );

            const token =
                data?.access_token ||
                data?.token;

            if (!token) {
                throw new Error(
                    "Login successful but no access token received."
                );
            }

            localStorage.setItem(
                "token",
                token
            );

            if (data?.refresh_token) {
                localStorage.setItem(
                    "refresh_token",
                    data.refresh_token
                );
            }

            if (data?.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                if (data.user.role) {
                    localStorage.setItem(
                        "role",
                        data.user.role
                    );
                }
            }

            toast.success(
                "Login successful!"
            );

            navigate("/");
        } catch (err) {
            console.error(
                "Login error:",
                err
            );

            toast.error(
                err.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 px-4 py-8">
            <form
                onSubmit={handleLogin}
                className="card bg-base-100 shadow-xl w-full max-w-md p-6 sm:p-8"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full mb-4"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <div className="text-right mt-2 mb-5">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary font-semibold hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

                <p className="text-center mt-5 text-sm text-gray-600">
                    Aren't you registered?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                        className="text-primary font-semibold hover:underline"
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;