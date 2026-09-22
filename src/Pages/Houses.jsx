import React, { useEffect, useState } from "react";
import { getAllListings } from "../Service/ListingService";
import HouseCard from "../components/HouseCard";
import toast from "react-hot-toast";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState({
        search: "",
        category: "",
        location: "",
        min_price: "",
        max_price: "",
        sort_by: "newest",
        page: 1,
        limit: 10,
    });

    const [totalItems, setTotalItems] = useState(0);

    const loadHouses = async (currentFilters = filters) => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllListings(currentFilters);

            setHouses(response?.data || []);
            setTotalItems(response?.total_items || 0);
        } catch (err) {
            console.error("Failed to load houses:", err);

            const errorMessage =
                err.message || "Failed to load houses";

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHouses();
    }, [filters.page, filters.limit]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters({
            ...filters,
            [name]: value,
            page: 1,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (
            filters.min_price &&
            filters.max_price &&
            Number(filters.min_price) > Number(filters.max_price)
        ) {
            toast.error(
                "Minimum price cannot be greater than maximum price."
            );
            return;
        }

        const newFilters = {
            ...filters,
            page: 1,
        };

        setFilters(newFilters);

        await loadHouses(newFilters);
    };

    const handleReset = async () => {
        const resetFilters = {
            search: "",
            category: "",
            location: "",
            min_price: "",
            max_price: "",
            sort_by: "newest",
            page: 1,
            limit: 10,
        };

        setFilters(resetFilters);

        await loadHouses(resetFilters);
    };

    const totalPages = Math.ceil(
        totalItems / filters.limit
    );

    return (
        <div className="min-h-screen bg-base-200 px-6 py-10">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Available Houses
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Find your perfect place to stay
                    </p>
                </div>

                <div className="card bg-base-100 shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-5">
                        Search & Filter
                    </h2>

                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Search
                                </span>
                            </label>

                            <input
                                type="text"
                                name="search"
                                placeholder="Search houses..."
                                className="input input-bordered w-full"
                                value={filters.search}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Location
                                </span>
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                className="input input-bordered w-full"
                                value={filters.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Room Type
                                </span>
                            </label>

                            <select
                                name="category"
                                className="select select-bordered w-full"
                                value={filters.category}
                                onChange={handleChange}
                            >
                                <option value="">
                                    All Room Types
                                </option>

                                <option value="Apartment">
                                    Apartment
                                </option>

                                <option value="Studio">
                                    Studio
                                </option>

                                <option value="Room">
                                    Room
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Minimum Price
                                </span>
                            </label>

                            <input
                                type="number"
                                name="min_price"
                                placeholder="Minimum price"
                                min="0"
                                className="input input-bordered w-full"
                                value={filters.min_price}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Maximum Price
                                </span>
                            </label>

                            <input
                                type="number"
                                name="max_price"
                                placeholder="Maximum price"
                                min="0"
                                className="input input-bordered w-full"
                                value={filters.max_price}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Sort By
                                </span>
                            </label>

                            <select
                                name="sort_by"
                                className="select select-bordered w-full"
                                value={filters.sort_by}
                                onChange={handleChange}
                            >
                                <option value="newest">
                                    Newest
                                </option>

                                <option value="price_asc">
                                    Price: Low to High
                                </option>

                                <option value="price_desc">
                                    Price: High to Low
                                </option>
                            </select>
                        </div>

                        <div className="flex gap-3 lg:col-span-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {houses.length === 0 ? (
                            <div className="card bg-base-100 shadow-lg p-10 text-center">
                                <h2 className="text-2xl font-bold">
                                    No Houses Available
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Try changing your search or filters.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-5 text-gray-600">
                                    Showing{" "}
                                    <strong>
                                        {houses.length}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {totalItems}
                                    </strong>{" "}
                                    listings
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {houses.map((house) => (
                                        <HouseCard
                                            key={house.id}
                                            house={house}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {!loading &&
                    !error &&
                    totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-10">
                            <button
                                className="btn"
                                disabled={filters.page === 1}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        page: filters.page - 1,
                                    })
                                }
                            >
                                Previous
                            </button>

                            <span className="font-semibold">
                                Page {filters.page} of {totalPages}
                            </span>

                            <button
                                className="btn"
                                disabled={
                                    filters.page >= totalPages
                                }
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        page: filters.page + 1,
                                    })
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Houses;