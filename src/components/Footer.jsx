import React from "react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">
                            HouseManager
                        </h2>

                        <p className="mt-3 text-gray-500 max-w-sm leading-relaxed">
                            Find your perfect stay and ideal roommate
                            with ease, comfort, and confidence.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/"
                                className="link link-hover"
                            >
                                Home
                            </Link>

                            <Link
                                to="/houses"
                                className="link link-hover"
                            >
                                Houses
                            </Link>

                            <Link
                                to="/applications"
                                className="link link-hover"
                            >
                                Applications
                            </Link>

                            <Link
                                to="/roommates"
                                className="link link-hover"
                            >
                                Roommates
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            Contact
                        </h3>

                        <p className="text-gray-500">
                            Dhaka, Bangladesh
                        </p>

                        <p className="text-gray-500 mt-2 break-words">
                            support@housemanager.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-base-content/10 mt-8 sm:mt-10 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 HouseManager. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;