import React, { useEffect, useState } from "react";
import {
    requestRoommate,
    getMyRoommateRequests,
} from "../Service/UserService";
import toast from "react-hot-toast";

const MyRoommateRequests = () => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
    });

    const loadRequests = async () => {
        try {
            setLoading(true);

            const data = await getMyRoommateRequests();

            console.log(
                "Roommate requests:",
                data
            );

            setRequests(
                data?.data ||
                data ||
                []
            );
        } catch (err) {
            console.error(
                "Failed to load roommate requests:",
                err
            );

            toast.error(
                err.message ||
                "Failed to load roommate requests"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            await requestRoommate({
                title: form.title,
                description: form.description,
                location: form.location,
                price: Number(form.price),
            });

            toast.success(
                "Roommate request submitted successfully!"
            );

            setForm({
                title: "",
                description: "",
                location: "",
                price: "",
            });

            await loadRequests();
        } catch (err) {
            console.error(
                "Roommate request error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to submit roommate request"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleRequestRoommate = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 sm:px-6 py-8 sm:py-10">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-end mb-6">
                    <button
                        type="button"
                        onClick={handleRequestRoommate}
                        className="btn btn-primary w-full sm:w-auto px-6 shadow-lg"
                    >
                        👥{" "}
                        {showForm
                            ? "Hide Request Form"
                            : "Request Roommate"}
                    </button>
                </div>

                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Roommate Requests
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Find a place and request a roommate
                    </p>
                </div>

                {showForm && (
                    <div
                        id="roommate-request-form"
                        className="card bg-base-100 shadow-xl mb-8 sm:mb-10"
                    >
                        <div className="card-body p-5 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                Request for Roommate
                            </h2>

                            <p className="text-gray-500 mb-5">
                                Submit your requirements and
                                find a suitable roommate.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Request Title
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Example: Looking for a roommate"
                                        className="input input-bordered w-full"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Preferred Location
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Example: Dhanmondi"
                                        className="input input-bordered w-full"
                                        value={form.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Maximum Monthly Rent
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Example: 10000"
                                        className="input input-bordered w-full"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Description
                                        </span>
                                    </label>

                                    <textarea
                                        name="description"
                                        placeholder="Tell us about your roommate requirements..."
                                        className="textarea textarea-bordered w-full min-h-28 sm:min-h-32"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={submitting}
                                    >
                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Roommate Request"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-5">
                        My Previous Requests
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body text-center py-12 sm:py-16">
                                <div className="text-5xl mb-4">
                                    👥
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold">
                                    No Roommate Requests Yet
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    You haven't submitted any
                                    roommate requests yet.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {requests.map((request) => {
                                const requestId =
                                    request.id ||
                                    request.request_id;

                                return (
                                    <div
                                        key={requestId}
                                        className="card bg-base-100 shadow-lg"
                                    >
                                        <div className="card-body p-5 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                <h3 className="card-title break-words">
                                                    {request.title}
                                                </h3>

                                                <span
                                                    className={`badge self-start ${
                                                        request.status === "approved"
                                                            ? "badge-success"
                                                            : request.status === "declined" ||
                                                              request.status === "rejected"
                                                            ? "badge-error"
                                                            : "badge-warning"
                                                    }`}
                                                >
                                                    {request.status}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mt-3 break-words">
                                                {request.description}
                                            </p>

                                            <div className="mt-4 space-y-2">
                                                <p className="break-words">
                                                    📍{" "}
                                                    <strong>
                                                        Location:
                                                    </strong>{" "}
                                                    {request.location}
                                                </p>

                                                <p>
                                                    💰{" "}
                                                    <strong>
                                                        Budget:
                                                    </strong>{" "}
                                                    ৳{request.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRoommateRequests;