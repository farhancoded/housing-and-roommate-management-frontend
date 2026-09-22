import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getListingById } from "../../Service/ListingService";
import { updateListing } from "../../Service/AdminService";
import toast from "react-hot-toast";

const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        category: "",
        image_url: "",
        status: "available",
    });

    useEffect(() => {
        const loadListing = async () => {
            try {
                setLoading(true);

                const response = await getListingById(id);

                console.log("Listing:", response);

                const listing =
                    response?.data ||
                    response;

                setForm({
                    title: listing.title || "",
                    description: listing.description || "",
                    location: listing.location || "",
                    price: listing.price || "",
                    category: listing.category || "",
                    image_url: listing.image_url || "",
                    status: listing.status || "available",
                });
            } catch (err) {
                console.error(err);

                toast.error(
                    err.message ||
                    "Failed to load listing"
                );
            } finally {
                setLoading(false);
            }
        };

        loadListing();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await updateListing(id, {
                ...form,
                price: Number(form.price),
            });

            toast.success(
                "Listing updated successfully!"
            );

            navigate("/admin/listings");
        } catch (err) {
            console.error(err);

            toast.error(
                err.message ||
                "Failed to update listing"
            );
        } finally {
            setSaving(false);
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
            <div className="max-w-3xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Edit Listing
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update house information
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-5 sm:p-6">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        House Title
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Description
                                    </span>
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered w-full min-h-32"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Location
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Monthly Rent
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Category
                                    </span>
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Apartment">
                                        Apartment
                                    </option>

                                    <option value="Studio">
                                        Studio
                                    </option>

                                    <option value="Shared Room">
                                        Shared Room
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Image URL
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="image_url"
                                    value={form.image_url}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Status
                                    </span>
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="occupied">
                                        Occupied
                                    </option>
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-ghost flex-1"
                                    onClick={() =>
                                        navigate(
                                            "/admin/listings"
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditListing;