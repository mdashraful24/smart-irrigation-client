import { Link } from "react-router";
import img from "../../../assets/img/fresh-orange-fruit.jpg";
import { ChevronRight } from "lucide-react";

const About = () => {
    return (
        <div className="container mx-auto px-4 py-24 lg:py-30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Image Side - Premium styling */}
                <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl before:absolute before:inset-0 before:bg-linear-to-br before:from-transparent before:via-transparent before:to-black/5 before:z-10">
                        <img
                            src={img}
                            alt="Fresh orange fruit"
                            className="w-full h-100 object-cover object-center transform transition-all duration-700 group-hover:scale-105"
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                    {/* Decorative element */}
                    {/* <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-orange-200/30 rounded-xl -z-10"></div>
                    <div className="absolute -left-4 -bottom-4 w-20 h-20 border border-orange-200/30 rounded-xl -z-10"></div> */}
                </div>

                {/* Content Side - Elegant typography */}
                <div className="lg:pl-8 text-center lg:text-left">
                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">
                        About Us
                    </h2>

                    {/* Content */}
                    <div className="space-y-6 mb-7 lg:mb-12">
                        <p className="text-lg lg:text-xl leading-relaxed">
                            We blend creativity with cutting-edge technology to build solutions
                            that deliver measurable results. Our approach combines strategic
                            thinking with meticulous craftsmanship.
                        </p>
                        <p className="text-lg lg:text-xl leading-relaxed">
                            Each project represents an opportunity to create something meaningful—
                            elegant, modern, and purpose-driven solutions designed to make a
                            lasting impact.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-4 font-medium text-lg hover:text-orange-600 transition-colors duration-300"
                    >
                        <span className="relative">
                            Discover Our Journey
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
