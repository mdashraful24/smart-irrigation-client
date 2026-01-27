import { Link } from "react-router";
import img from "../../../assets/img/fresh-orange-fruit.jpg";

const About = () => {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left: Image */}
                <div className="flex justify-center">
                    <img
                        src={img}
                        alt="About us"
                        className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                    />
                </div>

                {/* Right: Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        About Us
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed">
                        We are passionate about creating meaningful digital experiences.
                        Our goal is to build clean, modern, and user-friendly solutions
                        that make a real impact. <br /><br />
                        We are passionate about creating meaningful digital experiences.
                        Our goal is to build clean, modern, and user-friendly solutions
                        that make a real impact{" "}
                        <Link
                            to="/about"
                            className="text-primary font-semibold hover:underline"
                        >
                            See more
                        </Link>
                        .
                    </p>
                </div>

            </div>
        </section>
    );
};

export default About;
