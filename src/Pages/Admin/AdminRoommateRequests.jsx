import React, { useEffect, useState } from "react";
import {
    getRoommateRequests,
    reviewRoommateRequest,
} from "../../Service/AdminService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AdminRoommateRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRequests = async () => {
        try {
            setLoading(true);

            const response = await getRoommateRequests();

            console.log(
                "Admin roommate requests:",
                response
            );

            const data =
                response?.data ||
                response ||
                [];

            setRequests(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (err) {
            console.error(err);

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

    const handleReview = async (
        request,
        action
    ) => {
        const requestId =
            request.id ||
            request.request_id;

        if (!requestId) {
            toast.error("Request ID not found.");
            return;
        }

        const result = await Swal.fire({
            title:
                action === "approve"
                    ? "Approve roommate request?"
                    : "Reject roommate request?",
            text:
                action === "approve"
                    ? "This roommate request will be accepted."
                    : "This roommate request will be rejected.",
            icon:
                action === "approve"
                    ? "question"
                    : "warning",
            showCancelButton: true,
            confirmButtonText:
                action === "approve"
                    ? "Yes, Accept"
                    : "Yes, Reject",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await reviewRoommateRequest(
                requestId,
                action
            );

            setRequests(
                (previousRequests) =>
                    previousRequests.map((item) => {
                        const itemId =
                            item.id ||
                            item.request_id;

                        if (itemId !== requestId) {
                            return item;
                        }

                        return {
                            ...item,
                            status:
                                action === "approve"
                                    ? "accepted"
                                    : "rejected",
                        };
                    })
            );

            toast.success(
                action === "approve"
                    ? "Roommate request accepted!"
                    : "Roommate request rejected!"
            );
        } catch (err) {
            console.error(err);

            toast.error(
                err.message ||
                "Failed to review roommate request"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Roommate Requests
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all roommate requests
                        </p>
                    </div>

                    <button
                        className="btn btn-primary w-full sm:w-auto"
                        onClick={loadRequests}
                    >
                        Refresh
                    </button>
                </div>

                {requests.length === 0 ? (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center py-12 sm:py-16">
                            <div className="text-5xl mb-4">
                                👥
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold">
                                No Roommate Requests
                            </h2>

                            <p className="text-gray-500">
                                There are currently no roommate requests.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-3 sm:p-6">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra min-w-[950px]">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Title</th>
                                            <th>Location</th>
                                            <th>Budget</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requests.map((request) => {
                                            const id =
                                                request.id ||
                                                request.request_id;

                                            const status =
                                                request.status ||
                                                "pending";

                                            return (
                                                <tr key={id}>
                                                    <td>
                                                        {id}
                                                    </td>

                                                    <td>
                                                        {request.user_id}
                                                    </td>

                                                    <td className="font-semibold">
                                                        {request.title ||
                                                            "Roommate Request"}
                                                    </td>

                                                    <td>
                                                        {request.location ||
                                                            "N/A"}
                                                    </td>

                                                    <td>
                                                        ৳
                                                        {request.price ||
                                                            request.budget ||
                                                            "N/A"}
                                                    </td>

                                                    <td className="max-w-xs whitespace-normal break-words">
                                                        {request.description ||
                                                            "No description"}
                                                    </td>

                                                    <td>
                                                        {status === "pending" ||
                                                        status === "pending_approval" ? (
                                                            <span className="badge badge-warning">
                                                                Pending
                                                            </span>
                                                        ) : status === "accepted" ||
                                                          status === "approved" ? (
                                                            <span className="badge badge-success">
                                                                Accepted
                                                            </span>
                                                        ) : status === "rejected" ||
                                                          status === "declined" ? (
                                                            <span className="badge badge-error">
                                                                Rejected
                                                            </span>
                                                        ) : (
                                                            <span className="badge">
                                                                {status}
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        {status === "pending" ||
                                                        status === "pending_approval" ? (
                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                <button
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() =>
                                                                        handleReview(
                                                                            request,
                                                                            "approve"
                                                                        )
                                                                    }
                                                                >
                                                                    ✓ Accept
                                                                </button>

                                                                <button
                                                                    className="btn btn-error btn-sm"
                                                                    onClick={() =>
                                                                        handleReview(
                                                                            request,
                                                                            "decline"
                                                                        )
                                                                    }
                                                                >
                                                                    ✕ Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-500">
                                                                {status === "accepted" ||
                                                                status === "approved"
                                                                    ? "Accepted"
                                                                    : "Rejected"}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default AdminRoommateRequests;