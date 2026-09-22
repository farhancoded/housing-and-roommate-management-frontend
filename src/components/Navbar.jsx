import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../Service/AuthService";

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const token = localStorage.getItem("token");

    let role = null;

    if (token) {
        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            role = payload?.role;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    const handleLogout = () => {
        logoutUser();
        setOpen(false);
        navigate("/login");
    };

    return (
        <nav className="navbar bg-base-100 shadow-md px-3 sm:px-4 md:px-8">
            <div className="flex-1">
                <Link
                    to="/"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-primary"
                >
                    HouseManager
                </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
                <Link
                    to="/"
                    className="btn btn-ghost font-normal hidden sm:flex"
                >
                    Home
                </Link>

                <Link
                    to="/houses"
                    className="btn btn-ghost font-normal hidden sm:flex"
                >
                    Houses
                </Link>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="btn btn-ghost btn-circle text-2xl"
                        aria-label="More options"
                    >
                        ⋮
                    </button>

                    {open && (
                        <div className="absolute right-0 top-14 z-50 w-56 max-w-[calc(100vw-1.5rem)] rounded-xl bg-base-100 shadow-2xl border border-base-200 p-2">
                            {token ? (
                                <>
                                    {role === "admin" && (
                                        <>
                                            <Link
                                                to="/admin"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                            >
                                                <span>🛠️</span>
                                                <span>Admin Dashboard</span>
                                            </Link>

                                            <div className="divider my-1"></div>
                                        </>
                                    )}

                                    <Link
                                        to="/profile"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                    >
                                        <span>👤</span>
                                        <span>Profile</span>
                                    </Link>

                                    {role !== "admin" && (
                                        <>
                                            <Link
                                                to="/applications"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                            >
                                                <span>📋</span>
                                                <span>Applications</span>
                                            </Link>

                                            <Link
                                                to="/roommates"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                            >
                                                <span>👥</span>
                                                <span>Roommates</span>
                                            </Link>
                                        </>
                                    )}

                                    <div className="divider my-1"></div>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error hover:text-error-content w-full text-left transition"
                                    >
                                        <span>🚪</span>
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                    >
                                        <span>🔑</span>
                                        <span>Login</span>
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition"
                                    >
                                        <span>📝</span>
                                        <span>Register</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;