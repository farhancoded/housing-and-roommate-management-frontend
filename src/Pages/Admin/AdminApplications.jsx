import React, { useEffect, useState } from "react";
import {
    getAllApplications,
    approveApplication,
} from "../../Service/AdminService";
import toast from "react-hot-toast";

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {
        try {
            setLoading(true);

            const data = await getAllApplications();

            console.log("Applications:", data);

            setApplications(
                data?.data || data || []
            );
        } catch (err) {
            console.error(
                "Failed to load applications:",
                err
            );

            toast.error(
                err.message ||
                "Failed to load applications"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleAction = async (
        application,
        action
    ) => {
        const applicationId =
            application.id ||
            application.application_id;

        try {
            await approveApplication(
                applicationId,
                action
            );

            toast.success(
                action === "approve"
                    ? "Application accepted successfully!"
                    : "Application rejected successfully!"
            );

            await loadApplications();
        } catch (err) {
            console.error(
                "Application action error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to update application"
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
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                    Applications
                </h1>

                <div className="bg-base-100 rounded-xl shadow-lg overflow-x-auto">
                    <table className="table w-full min-w-[900px]">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Listing</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-10"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                applications.map(
                                    (application) => {
                                        const id =
                                            application.id ||
                                            application.application_id;

                                        const status =
                                            application.status;

                                        return (
                                            <tr key={id}>
                                                <td>
                                                    {id}
                                                </td>

                                                <td>
                                                    {application.user_id}
                                                </td>

                                                <td>
                                                    {application.listing_id}
                                                </td>

                                                <td className="max-w-xs whitespace-normal break-words">
                                                    {application.message ||
                                                        "I am interested in this room."}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            status === "accepted"
                                                                ? "badge-success"
                                                                : status === "rejected" ||
                                                                  status === "declined"
                                                                ? "badge-error"
                                                                : "badge-warning"
                                                        }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>

                                                <td>
                                                    {status === "pending" ? (
                                                        <div className="flex flex-col sm:flex-row gap-2">
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    handleAction(
                                                                        application,
                                                                        "approve"
                                                                    )
                                                                }
                                                            >
                                                                Accept
                                                            </button>

                                                            <button
                                                                className="btn btn-error btn-sm"
                                                                onClick={() =>
                                                                    handleAction(
                                                                        application,
                                                                        "reject"
                                                                    )
                                                                }
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">
                                                            {status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;