import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import toast, { Toaster } from "react-hot-toast";

import router from "./routes/Routes";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <RouterProvider router={router} />

        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
            }}
        />

    </React.StrictMode>
);