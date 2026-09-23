
import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import Register from "../Pages/Register";
import Houses from "../Pages/Houses";
import HouseDetails from "../Pages/HouseDetails";
import Profile from "../Pages/Profile";
import MyApplications from "../Pages/MyApplications";
import MyRoommateRequests from "../Pages/MyRoommateRequests";

import ProtectedRoute from "../Pages/ProtectedRoute";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateListing from "../Pages/Admin/CreateListing";
import ManageListings from "../Pages/Admin/ManageListings";
import AdminApplications from "../Pages/Admin/AdminApplications";
import AdminRoommateRequests from "../Pages/Admin/AdminRoommateRequests";
import EditListing from "../Pages/Admin/EditListing";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,

        children: [


            {
                index: true,
                element: <Home />,
            },

            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },


            {
                path: "register",
                element: <Register />,
            },

            {
                path: "houses",
                element: <Houses />,
            },

            {
                path: "houses/:id",
                element: <HouseDetails />,
            },

            {
                path: "profile",
                element: <Profile />,
            },

            {
                path: "applications",
                element: <MyApplications />,
            },

            {
                path: "roommates",
                element: <MyRoommateRequests />,
            },
            {
                element: (
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    />
                ),

                children: [


                    {
                        path: "admin",
                        element: <AdminDashboard />,
                    },



                    {
                        path: "admin/applications",
                        element: <AdminApplications />,
                    },


            

                    {
                        path: "admin/roommate-requests",
                        element: <AdminRoommateRequests />,
                    },


                    {
                        path: "admin/listings",
                        element: <ManageListings />,
                    },

                    {
                        path: "admin/manage-listings",
                        element: <ManageListings />,
                    },

                    {
                        path: "admin/manage-houses",
                        element: <ManageListings />,
                    },


                    {
                        path: "admin/create-listing",
                        element: <CreateListing />,
                    },

                    {
                        path: "admin/create",
                        element: <CreateListing />,
                    },

                    {
                        path: "admin/create_listing",
                        element: <CreateListing />,
                    },


                    {
                        path: "admin/edit-listing/:id",
                        element: <EditListing />,
                    },

                ],
            },

        ],
    },
]);


export default router;