import { Link } from "react-router";

const Herobanner = () => {
    return (
        <div
            className="hero min-h-[500px]"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1615404420216-cc423164563f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjByZW50fGVufDB8fDB8fHww",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Find Your Perfect Stay & Ideal Roommate</h1>
                    <p className="mb-5">
                        Discover premium apartments, cozy studio rooms, and verified roommates all
                        in one secure platform. Whether you are looking for an entire flat or
                        just a shared room, your next comfortable living space is only a click away.
                    </p>
                    <Link to="/houses" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Herobanner;