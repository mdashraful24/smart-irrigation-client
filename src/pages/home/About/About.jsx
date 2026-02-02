import { Link } from "react-router";
import img from "../../../assets/img/fresh-orange-fruit.jpg";
import { ChevronRight } from "lucide-react";

const About = () => {
    return (
        <div className="container mx-auto px-4 lg:px-0 py-20 lg:py-30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

                {/* Image Side */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6">
                    <img
                        src={img}
                        alt={img}
                        className="w-full h-64 sm:h-72 md:h-110 object-cover transform group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Side */}
                <div>
                    <h2 className="text-5xl lg:text-6xl font-light mb-8 leading-tight">
                        <span className="font-bold text-gray-900">About Us</span>
                    </h2>

                    <div className="space-y-6 mb-10">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We blend creativity with technology to build solutions that drive results.
                            Our approach combines strategic thinking with exceptional craftsmanship.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every project is an opportunity to create something meaningful—clean,
                            modern, and purpose-driven solutions that make a real impact.
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link
                            to="/about"
                            className="group inline-flex items-center space-x-3 text-primary font-semibold text-lg hover:space-x-4 transition-all duration-300"
                        >
                            <span>Explore Our Journey</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
