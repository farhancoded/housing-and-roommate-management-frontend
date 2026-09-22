import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { forgotPassword } from "../Service/AuthService";
import toast from "react-hot-toast";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await forgotPassword({
                email: email,
            });

            console.log(
                "Forgot password response:",
                data
            );

            toast.success(
                data?.message ||
                "Password reset request sent successfully!"
            );

            setEmail("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            console.error(
                "Forgot password error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to process password reset request"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

            <div className="card bg-base-100 shadow-xl w-full max-w-md">

                <div className="card-body">

                    <h1 className="text-3xl font-bold text-center">
                        Forgot Password?
                    </h1>

                    <p className="text-center text-gray-500 mt-2 mb-6">
                        Enter your email address to reset your password.
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">
                                    Email Address
                                </span>
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Request"}
                        </button>

                    </form>


                    <div className="text-center mt-6">

                        <Link
                            to="/login"
                            className="link link-primary"
                        >
                            ← Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ForgotPassword;