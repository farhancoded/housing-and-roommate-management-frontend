import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createListing } from "../../Service/AdminService";
import toast from "react-hot-toast";

const CreateListing = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        category: "",
        image_url: "",
        status: "available",
    });


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createListing({
                ...form,
                price: Number(form.price),
            });

            toast.success(
                "Listing created successfully!"
            );

            navigate("/admin/listings");

        } catch (err) {

            console.error(
                "Create listing error:",
                err
            );

            toast.error(
                err.message ||
                "Failed to create listing"
            );

        }

    };


    return (

        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-8">
                Create House Listing
            </h1>


            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="title"
                    placeholder="House Title"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    onChange={handleChange}
                    required
                />


                <input
                    name="location"
                    placeholder="Location"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />


                <input
                    name="price"
                    type="number"
                    placeholder="Monthly Rent"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />


                <select
                    name="category"
                    className="select select-bordered w-full"
                    onChange={handleChange}
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


                <input
                    name="image_url"
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Create Listing
                </button>

            </form>

        </div>

    );

};

export default CreateListing;