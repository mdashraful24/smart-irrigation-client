import { useEffect } from "react";
import img from "../../assets/img/fresh-orange-fruit.jpg";
import team1 from "../../assets/img/fresh-orange-fruit.jpg";
import team2 from "../../assets/img/fresh-orange-fruit.jpg";
import team3 from "../../assets/img/fresh-orange-fruit.jpg";

const AboutDetails = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="container mx-auto px-4 py-16 mt-10">
            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 lg:mb-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 md:mb-5 tracking-tight leading-tight">
                    About Us
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                    Where passion meets precision, creating meaningful impact through
                    innovative solutions and unwavering dedication to quality.
                </p>
            </div>

            {/* Story Section with Elegant Design */}
            <div className="relative mb-24 lg:mb-36">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 pt-14 lg:pt-0 order-2 lg:order-1">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-3xl sm:text-4xl font-light mb-4 md:mb-6">
                                Our <span className="font-bold">Journey</span> of Innovation
                            </h2>
                            <div className="w-16 h-0.5 bg-primary mb-6 md:mb-8"></div>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                Founded on principles of excellence and integrity, we have
                                evolved into a beacon of innovation, serving discerning
                                clients who value both quality and purpose.
                            </p>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                Our commitment to sustainable practices and transparent
                                operations sets new industry standards, while our focus
                                on continuous improvement ensures we remain at the
                                forefront of our field.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 md:pt-8 border-t border-gray-100">
                            <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 justify-center lg:justify-start">
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-primary">10+</p>
                                    <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-1">Years Experience</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-primary">500+</p>
                                    <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-1">Global Clients</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-primary">99%</p>
                                    <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-1">Satisfaction Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative order-1 lg:order-2">
                        <div className="overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-none lg:transform lg:-translate-y-4">
                            <img
                                src={img}
                                alt="Our story"
                                className="w-full h-64 sm:h-80 md:h-96 lg:h-125 object-cover transform transition-transform duration-700"
                            />
                            <div className="block lg:hidden absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="text-center mb-12 lg:mb-20 px-4 lg:px-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6">
                    Meet Our <span className="font-bold">Members</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg px-4">
                    A dedicated team of visionaries committed to excellence and innovation.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 lg:mb-32 px-4 lg:px-0">
                {[
                    {
                        name: "Johnathan Doe",
                        role: "Founder & CEO",
                        description: "Visionary leader with 15+ years pioneering industry transformation through strategic innovation.",
                        img: team1
                    },
                    {
                        name: "Jane Smith",
                        role: "Chief Operations Officer",
                        description: "Ensuring operational excellence and seamless delivery across all business verticals.",
                        img: team2
                    },
                    {
                        name: "Michael Lee",
                        role: "Director of Product",
                        description: "Driving product innovation and maintaining uncompromising quality standards.",
                        img: team3
                    }
                ].map((member, index) => (
                    <div key={index} className="group relative">
                        <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-110 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="text-center px-2 sm:px-0">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.name}</h3>
                            <p className="text-primary font-medium mb-3 md:mb-4 text-sm md:text-base">{member.role}</p>
                            <p className="text-gray-600 text-sm md:text-base">{member.description}</p>
                            <div className="mt-4 md:mt-6">
                                <div className="hidden lg:block w-12 h-0.5 mx-auto group-hover:w-24 group-hover:bg-primary transition-all duration-300"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mission & Values */}
            <div className="relative py-16 lg:py-20 overflow-hidden px-4 lg:px-0">
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black rounded-3xl"></div>
                <div className="relative px-4">
                    <div className="text-center text-white mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 md:mb-8 leading-tight">
                            Our Core <span className="font-bold">Mission</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                            To redefine industry standards through exceptional craftsmanship,
                            innovative thinking, and unwavering commitment to building lasting
                            relationships based on trust and mutual success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 lg:mt-16">
                        {[
                            { title: "Innovation", desc: "Pushing boundaries through continuous research and development." },
                            { title: "Integrity", desc: "Building trust through transparency and ethical practices." },
                            { title: "Excellence", desc: "Delivering superior quality in every aspect of our work." }
                        ].map((value, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-6 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">0{index + 1}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{value.title}</h3>
                                <p className="text-gray-300 text-sm md:text-base">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutDetails;
