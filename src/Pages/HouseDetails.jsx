import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getListingById } from "../Service/ListingService";
import { applyForRoom } from "../Service/UserService";
import toast from "react-hot-toast";

const HouseDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showApply, setShowApply] = useState(false);
    const [message, setMessage] = useState(
        "I am interested in this room.");

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadHouse = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getListingById(id);

                console.log(
                    "House details:",
                    data
                );

                setHouse(data?.data || data);
            } catch (err) {
                console.error(err);

                const errorMessage =
                    err.message ||
                    "Failed to load house";

                setError(errorMessage);

                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadHouse();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            await applyForRoom(
                id,
                message
            );

            toast.success(
                "Application submitted successfully!"
            );

            setSuccess(
                "Application submitted successfully!"
            );

            setShowApply(false);
        } catch (err) {
            console.error(
                "Application error:",
                err
            );

            const errorMessage =
                err.message ||
                "Failed to apply for this room";

            setError(errorMessage);

            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center px-4">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error && !house) {
        return (
            <div className="min-h-screen flex justify-center items-center px-4">
                <div className="text-lg sm:text-xl font-semibold text-error text-center">
                    Failed to load house.
                </div>
            </div>
        );
    }

    if (!house) {
        return (
            <div className="min-h-screen flex justify-center items-center px-4">
                <div className="text-lg sm:text-xl font-semibold text-center">
                    House not found.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 px-4 sm:px-6 py-8 sm:py-10">
            <div className="max-w-5xl mx-auto">
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <img
                        src={
                            house.image_url ||
                            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={house.title}
                        className="w-full h-56 sm:h-72 md:h-80 object-cover"
                    />

                    <div className="card-body p-5 sm:p-6 md:p-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
                            {house.title}
                        </h1>

                        <p className="text-base sm:text-lg mt-2 break-words">
                            📍 {house.location}
                        </p>

                        <p className="text-gray-600 mt-5 sm:mt-6 leading-relaxed break-words">
                            {house.description}
                        </p>

                        <div className="mt-5 sm:mt-6">
                            <span className="text-gray-500">
                                Monthly Rent
                            </span>

                            <div className="text-2xl sm:text-3xl font-bold text-primary">
                                ৳{house.price}
                            </div>
                        </div>

                        {!showApply && !success && (
                            <button
                                type="button"
                                className="btn btn-primary w-full mt-6"
                                onClick={() => {
                                    setShowApply(true);
                                    setError("");
                                }}
                            >
                                Apply For Room
                            </button>
                        )}

                        {showApply && (
                            <form
                                onSubmit={handleApply}
                                className="mt-6 p-4 sm:p-6 rounded-xl bg-base-200"
                            >
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                                    Apply For This Room
                                </h2>

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Message
                                    </span>
                                </label>

                                <textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    className="textarea textarea-bordered w-full min-h-28 sm:min-h-32"
                                    placeholder="Write a message to the house owner..."
                                    required
                                />

                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-1"
                                        disabled={submitting}
                                    >
                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Application"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-ghost w-full sm:w-auto"
                                        onClick={() => {
                                            setShowApply(false);
                                            setError("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseDetails;