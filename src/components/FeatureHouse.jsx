import React, { useEffect, useState } from "react";
import { getAllListings } from "../Service/ListingService";
import HouseCard from "./HouseCard";
import toast from "react-hot-toast";

const FeatureHouse = () => {

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadHouses = async () => {

            try {

                setLoading(true);
                setError("");

                const result = await getAllListings();

                console.log("Received data:", result);


                setHouses(result?.data || []);

            } catch (err) {

                console.error(
                    "Get All Listings Error:",
                    err
                );

                const errorMessage =
                    err.message ||
                    "Failed to load houses";

                setError(errorMessage);

                // Toast notification
                toast.error(errorMessage);

            } finally {

                setLoading(false);

            }
        };

        loadHouses();

    }, []);



    if (loading) {

        return (

            <div className="text-center py-16">

                <span className="loading loading-spinner loading-lg"></span>

                <p className="mt-3">
                    Loading houses...
                </p>

            </div>

        );

    }



    if (error) {

        return (

            <div className="text-center py-16">

                <p className="text-xl font-semibold text-red-500">
                    Failed to load houses
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Please try again later.
                </p>

            </div>

        );

    }



    if (houses.length === 0) {

        return (

            <div className="text-center py-16">

                <p className="text-xl font-semibold">
                    No houses available
                </p>

            </div>

        );

    }



    return (

        <section className="py-16 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-10">

                    <h2 className="text-3xl font-bold">
                        Featured Houses
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Find your perfect place to stay
                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {houses.map((house) => (

                        <HouseCard
                            key={house.id}
                            house={house}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

};

export default FeatureHouse;