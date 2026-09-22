import React from "react";
import { useNavigate } from "react-router";

const HouseCard = ({ house }) => {
    const navigate = useNavigate();

    const image =
        house.image_url &&
        house.image_url.startsWith("http")
            ? house.image_url
            : "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800";

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">

            <figure className="h-60">
                <img
                    src={image}
                    alt={house.title || "House"}
                    className="w-full h-full object-cover"
                />
            </figure>

            <div className="card-body">

                <div className="flex justify-between items-center">

                    <span className="badge badge-secondary">
                        {house.category || "House"}
                    </span>

                    <span
                        className={`badge ${
                            house.status === "available"
                                ? "badge-success"
                                : "badge-error"
                        }`}
                    >
                        {house.status || "Unknown"}
                    </span>

                </div>

                <h2 className="card-title mt-2">
                    {house.title || "House"}
                </h2>

                <p className="text-gray-500">
                    📍 {house.location || "Location unavailable"}
                </p>

                <p className="line-clamp-3 text-sm">
                    {house.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-4">

                    <div>
                        <p className="text-xs text-gray-500">
                            Monthly Rent
                        </p>

                        <p className="text-xl font-bold text-primary">
                            ৳{Number(house.price || 0).toLocaleString()}
                        </p>
                    </div>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                            navigate(`/houses/${house.id || house.listing_id}`)
                        }
                    >
                        View Details
                    </button>

                </div>

            </div>
        </div>
    );
};

export default HouseCard;