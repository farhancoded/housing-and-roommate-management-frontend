import React, { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../Service/AuthService";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        role: "user",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await registerUser(formData);


            toast.success("Account created successfully!");

            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);

            toast.error(
                err.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 px-4 py-8">
            <form
                onSubmit={handleRegister}
                className="card bg-base-100 shadow-xl w-full max-w-md p-6 sm:p-8"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="input input-bordered w-full mb-4"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="input input-bordered w-full mb-4"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered w-full mb-4"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-4"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-6"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;