import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { getAllListings } from "../../Service/ListingService";
import {
    deleteListing,
    releaseListing,
} from "../../Service/AdminService";

const ManageListings = () => {
    const navigate = useNavigate();

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadListings = async () => {
        try {
            setLoading(true);

            const response = await getAllListings();

            console.log(
                "Admin listings:",
                response
            );

            const data =
                response?.data ||
                response ||
                [];

            setListings(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (err) {
            console.error(err);

            toast.error(
                err.message ||
                "Failed to load listings"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadListings();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete this listing?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await deleteListing(id);

            toast.success(
                "Listing deleted successfully!"
            );

            await loadListings();
        } catch (err) {
            console.error(err);

            toast.error(
                err.message ||
                "Failed to delete listing"
            );
        }
    };

    const handleRelease = async (id) => {
        try {
            await releaseListing(id);

            toast.success(
                "Listing released successfully!"
            );

            await loadListings();
        } catch (err) {
            console.error(err);

            toast.error(
                err.message ||
                "Failed to release listing"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center px-4">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Manage Listings
                    </h1>

                    <button
                        className="btn btn-primary w-full sm:w-auto"
                        onClick={() =>
                            navigate(
                                "/admin/create-listing"
                            )
                        }
                    >
                        + Create Listing
                    </button>
                </div>

                {listings.length === 0 ? (
                    <div className="card bg-base-100 shadow-xl p-6 sm:p-10 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            No Listings
                        </h2>

                        <p className="text-gray-500 mt-2">
                            No house listings have been created yet.
                        </p>
                    </div>
                ) : (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-3 sm:p-6">
                            <div className="overflow-x-auto">
                                <table className="table min-w-[900px]">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Location</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {listings.map(
                                            (listing) => {
                                                const id =
                                                    listing.id ||
                                                    listing.listing_id;

                                                return (
                                                    <tr key={id}>
                                                        <td>
                                                            {id}
                                                        </td>

                                                        <td className="font-semibold whitespace-normal break-words max-w-xs">
                                                            {listing.title}
                                                        </td>

                                                        <td>
                                                            {listing.category}
                                                        </td>

                                                        <td className="whitespace-normal break-words max-w-xs">
                                                            {listing.location}
                                                        </td>

                                                        <td>
                                                            ৳{listing.price}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`badge ${
                                                                    listing.status ===
                                                                    "available"
                                                                        ? "badge-success"
                                                                        : "badge-warning"
                                                                }`}
                                                            >
                                                                {listing.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/admin/edit-listing/${id}`
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>

                                                                {listing.status ===
                                                                    "occupied" && (
                                                                    <button
                                                                        className="btn btn-info btn-sm"
                                                                        onClick={() =>
                                                                            handleRelease(
                                                                                id
                                                                            )
                                                                        }
                                                                    >
                                                                        Release
                                                                    </button>
                                                                )}

                                                                <button
                                                                    className="btn btn-error btn-sm"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageListings;