import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    getCurrentUser,
    updateUser,
    changePassword,
} from "../Service/AuthService";
import toast from "react-hot-toast";

const Profile = () => {
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        firstname: "",
        lastname: "",
    });

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const data = await getCurrentUser();

            console.log("Profile data:", data);

            setUser(data);

            setFormData({
                email: data.email || "",
                username: data.username || "",
                firstname: data.firstname || "",
                lastname: data.lastname || "",
            });
        } catch (err) {
            console.error("Profile error:", err);

            toast.error(
                err.message ||
                "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = await updateUser(formData);

            toast.success(
                data?.message ||
                "Profile updated successfully!"
            );

            await loadProfile();
        } catch (err) {
            console.error(
                "Update profile error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (
            passwordData.new_password !==
            passwordData.confirm_password
        ) {
            toast.error(
                "New password and confirm password do not match."
            );
            return;
        }

        if (passwordData.new_password.length < 6) {
            toast.error(
                "New password must be at least 6 characters."
            );
            return;
        }

        try {
            setChangingPassword(true);

            const data = await changePassword({
                current_password:
                    passwordData.current_password,
                new_password:
                    passwordData.new_password,
            });

            toast.success(
                data?.message ||
                "Password updated successfully!"
            );

            setPasswordData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
        } catch (err) {
            console.error(
                "Change password error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to change password"
            );
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account information
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center justify-start">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl sm:text-4xl font-bold">
                                {formData.firstname
                                    ? formData.firstname
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"}
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold mt-3 break-words">
                                {formData.firstname}{" "}
                                {formData.lastname}
                            </h2>

                            <p className="text-gray-500 break-words">
                                @{formData.username}
                            </p>

                            {user?.role && (
                                <div className="badge badge-primary mt-2">
                                    {user.role}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl md:col-span-2">
                        <div className="card-body p-5 sm:p-6">
                            <h2 className="card-title text-xl sm:text-2xl mb-4">
                                Personal Information
                            </h2>

                            <form onSubmit={handleUpdate}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            First Name
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            Last Name
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            Username
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                                <div className="text-center mt-4">
                                    <Link
                                        to="/forgot-password"
                                        className="text-primary font-semibold hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl md:col-span-3">
                        <div className="card-body p-5 sm:p-6">
                            <h2 className="card-title text-xl sm:text-2xl mb-5">
                                Change Password
                            </h2>

                            <form
                                onSubmit={
                                    handleChangePassword
                                }
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Current Password
                                        </span>
                                    </label>

                                    <input
                                        type="password"
                                        name="current_password"
                                        value={
                                            passwordData.current_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        className="input input-bordered w-full"
                                        placeholder="Enter current password"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            New Password
                                        </span>
                                    </label>

                                    <input
                                        type="password"
                                        name="new_password"
                                        value={
                                            passwordData.new_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        className="input input-bordered w-full"
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Confirm New Password
                                        </span>
                                    </label>

                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={
                                            passwordData.confirm_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        className="input input-bordered w-full"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={
                                            changingPassword
                                        }
                                    >
                                        {changingPassword
                                            ? "Changing Password..."
                                            : "Change Password"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;