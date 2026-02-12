import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from 'react-i18next';
import CountUp from "react-countup";
import img from "../../assets/about/img3.png";

// Custom hook for checking if element is in viewport
const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return [ref, isInView];
};

const AboutDetails = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ref, isInView] = useInView();

    return (
        <section className="container mx-auto px-4 py-16 mt-10">
            {/* Hero Header */}
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 md:mb-5 tracking-tight leading-tight">
                    {t('aboutDetails.title')}
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-0">
                    {t('aboutDetails.lead')}
                </p>
            </div>

            {/* Story Section with Elegant Design */}
            <div className="relative mb-24 lg:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-3xl md:text-5xl">
                                {t('aboutDetails.journeyTitle')}
                            </h2>
                            {/* <div className="w-16 h-0.5 bg-green-600 mb-6 md:mb-8"></div> */}
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div className="md:text-lg leading-relaxed">
                                <ReactMarkdown>{t('aboutDetails.journeyP1')}</ReactMarkdown>
                            </div>
                            <div className="md:text-lg leading-relaxed">
                                <ReactMarkdown>{t('aboutDetails.journeyP2')}</ReactMarkdown>
                            </div>
                        </div>

                        {/* CountUp Statistics */}
                        {/* <div ref={ref} className="mt-8 pt-6 md:pt-8">
                            <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 justify-center lg:justify-start">
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                        {isInView ? (
                                            <CountUp
                                                start={0}
                                                end={10}
                                                duration={2.5}
                                                suffix="+"
                                            />
                                        ) : "0+"}
                                    </p>
                                    <p className="text-xs sm:text-sm uppercase tracking-widest mt-1">{t('aboutDetails.stats.years')}</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                        {isInView ? (
                                            <CountUp
                                                start={0}
                                                end={500}
                                                duration={2.5}
                                                suffix="+"
                                            />
                                        ) : "0+"}
                                    </p>
                                    <p className="text-xs sm:text-sm uppercase tracking-widest mt-1">{t('aboutDetails.stats.clients')}</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                        {isInView ? (
                                            <CountUp
                                                start={0}
                                                end={99}
                                                duration={2.5}
                                                suffix="%"
                                            />
                                        ) : "0%"}
                                    </p>
                                    <p className="text-xs sm:text-sm uppercase tracking-widest mt-1">{t('aboutDetails.stats.satisfaction')}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="lg:col-span-5 relative order-1 lg:order-2">
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src={img}
                                alt="Our story"
                                className="w-full h-full lg:h-110 object-cover transform transition-transform duration-700 lg:hover:scale-105"
                            />
                            <div className="block lg:hidden absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
                <div className="md:text-lg leading-relaxed pt-4 md:pt-6">
                    <ReactMarkdown>{t('aboutDetails.journeyP3')}</ReactMarkdown>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-24 lg:mb-32">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-5xl mb-4 md:mb-6">
                        {t('aboutDetails.teamTitle')}
                    </h2>
                    <p className="max-w-2xl mx-auto md:text-lg">
                        {t('aboutDetails.teamLead')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Johnathan Doe",
                            role: "Founder & CEO",
                            description: "Visionary leader with 15+ years pioneering industry transformation through strategic innovation.",
                            img: "https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg",
                            social: [
                                { platform: "linkedin", url: "https://linkedin.com/in/johnathan-doe" },
                                { platform: "github", url: "https://twitter.com/johnathan-doe" },
                                { platform: "facebook", url: "https://instagram.com/johnathan-doe" }
                            ]
                        },
                        {
                            name: "Jane Smith",
                            role: "Chief Operations Officer",
                            description: "Ensuring operational excellence and seamless delivery across all business verticals.",
                            img: "https://thumbs.dreamstime.com/b/handsome-black-man-wearing-suit-urban-background-portrait-smiling-49366319.jpg",
                            social: [
                                { platform: "linkedin", url: "https://linkedin.com/in/johnathan-doe" },
                                { platform: "github", url: "https://twitter.com/johnathan-doe" },
                                { platform: "facebook", url: "https://instagram.com/johnathan-doe" }
                            ]
                        },
                        {
                            name: "Michael Lee",
                            role: "Director of Product",
                            description: "Driving product innovation and maintaining uncompromising quality standards.",
                            img: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?semt=ais_user_personalization&w=740&q=80",
                            social: [
                                { platform: "linkedin", url: "https://linkedin.com/in/michael-lee" },
                                { platform: "github", url: "https://github.com/michael-lee" },
                                { platform: "twitter", url: "https://twitter.com/michael-lee" }
                            ]
                        },
                        {
                            name: "Michael Lee",
                            role: "Director of Product",
                            description: "Driving product innovation and maintaining uncompromising quality standards.",
                            img: "https://img.freepik.com/free-photo/young-determined-armenian-curlyhaired-female-university-student-listen-carefully-asignment-look-confident-ready-task-cross-hands-chest-smiling-selfassured-standing-white-background_176420-56066.jpg?semt=ais_hybrid&w=740&q=80",
                            social: [
                                { platform: "linkedin", url: "https://linkedin.com/in/michael-lee2" },
                                { platform: "github", url: "https://github.com/michael-lee2" },
                                { platform: "twitter", url: "https://twitter.com/michael-lee2" }
                            ]
                        }
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-86">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 group-hover:to-black/40 transition-all duration-500"></div>

                                {/* Social Links - FIXED VERSION */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {member.social.map((socialItem, i) => (
                                        <a
                                            key={i}
                                            href={socialItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors duration-300 transform hover:scale-110 cursor-pointer"
                                            aria-label={`${socialItem.platform} profile`}
                                            onClick={(e) => {
                                                // You can add tracking or analytics here
                                                console.log(`Clicked ${socialItem.platform} for ${member.name}`);
                                            }}
                                        >
                                            <span className="text-sm font-semibold">
                                                {socialItem.platform === 'linkedin' ? 'in' : socialItem.platform.charAt(0).toUpperCase()}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-3">
                                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-green-600 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-green-600 font-semibold mt-1">{member.role}</p>
                                </div>

                                <p className="leading-relaxed">
                                    {member.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-16 h-16">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Values */}
            <div className="relative p-7 md:p-10 overflow-hidden mb-5">
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black rounded-3xl"></div>
                <div className="relative">
                    <div className="text-center text-white mb-12">
                        <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">
                            {t('aboutDetails.missionTitle')}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                            {t('aboutDetails.missionDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t('aboutDetails.values', { returnObjects: true }).map((value, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-6 md:p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-3 md:mb-4">0{index + 1}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{value.title}</h3>
                                <p className="text-gray-300">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutDetails;
