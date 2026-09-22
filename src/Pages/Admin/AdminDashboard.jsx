import React from "react";
import { Link } from "react-router";

const AdminDashboard = () => {

    return (
        <div className="p-8">

            <h1 className="text-4xl font-bold mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <Link
                    to="/admin/create-listing"
                    className="card bg-primary text-primary-content shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Create Listing
                        </h2>
                        <p>Add a new house.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/listings"
                    className="card bg-secondary text-secondary-content shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Manage Houses
                        </h2>
                        <p>Update or delete listings.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/applications"
                    className="card bg-accent text-accent-content shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Applications
                        </h2>
                        <p>Review room applications.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/roommate-requests"
                    className="card bg-info text-info-content shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Roommate Requests
                        </h2>
                        <p>Review roommate requests.</p>
                    </div>
                </Link>

            </div>

        </div>
    );
};

export default AdminDashboard;