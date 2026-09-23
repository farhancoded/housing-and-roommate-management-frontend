import React, { useEffect, useState } from "react";
import { getMyApplications } from "../Service/UserService";
import toast from "react-hot-toast";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);


    const loadApplications = async () => {

        try {

            setLoading(true);

            const data = await getMyApplications();

            console.log(
                "My applications:",
                data
            );


            const applicationData =
                Array.isArray(data)
                    ? data
                    : data?.data || [];


            setApplications(
                applicationData
            );

        } catch (err) {

            console.error(
                "Applications error:",
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


    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center bg-base-200">

                <span className="loading loading-spinner loading-lg text-primary"></span>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-6xl mx-auto">


                <div className="mb-8">

                    <h1 className="text-4xl font-bold">
                        My Applications
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and track your room applications
                    </p>

                </div>


                {applications.length === 0 && (

                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body text-center py-16">

                            <div className="text-5xl mb-4">
                                📄
                            </div>

                            <h2 className="text-2xl font-bold">
                                No Applications Yet
                            </h2>

                            <p className="text-gray-500 mt-2">
                                You haven't applied for any room yet.
                            </p>

                        </div>

                    </div>

                )}



                {applications.length > 0 && (

                    <div className="card bg-base-100 shadow-xl overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="table w-full">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Listing</th>
                                        <th>Message</th>
                                        <th>Status</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {applications.map(
                                        (application) => (

                                            <tr
                                                key={
                                                    application.id
                                                }
                                            >

                                                <td>
                                                    #{application.id}
                                                </td>


                                                <td>

                                                    <div className="font-semibold">

                                                        {application.listing_id
                                                            ? `Listing #${application.listing_id}`
                                                            : "N/A"}

                                                    </div>

                                                </td>


                                                <td>

                                                    {application.message ||
                                                        "No message"}

                                                </td>


                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            application.status ===
                                                            "accepted"
                                                                ? "badge-success"
                                                                : application.status ===
                                                                  "rejected"
                                                                ? "badge-error"
                                                                : "badge-warning"
                                                        }`}
                                                    >

                                                        {application.status ||
                                                            "pending"}

                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

export default MyApplications;