import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import img from "../../../assets/about/img3.png";
import { ChevronRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-24 lg:py-30">
            {/* Heading */}
            <h2 className="block lg:hidden text-4xl md:text-5xl text-center font-bold mb-10">
                {t('about.title')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image Side - Premium styling */}
                <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:bg-linear-to-br before:from-transparent before:via-transparent before:to-black/5 before:z-10">
                        <img
                            src={img}
                            alt="Fresh orange fruit"
                            className="w-full h-full lg:h-120 object-cover object-center transform transition-all duration-700 group-hover:scale-105"
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                    {/* Decorative element */}
                    {/* <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-orange-200/30 rounded-xl -z-10"></div>
                    <div className="absolute -left-4 -bottom-4 w-20 h-20 border border-orange-200/30 rounded-xl -z-10"></div> */}
                </div>

                {/* Content Side - Elegant typography */}
                <div className="text-center lg:text-left">
                    {/* Heading */}
                    <h2 className="hidden lg:block text-4xl md:text-5xl font-bold mb-10">
                        {t('about.title')}
                    </h2>

                    {/* Content */}
                    <div className="space-y-5 mb-3 lg:mb-5">
                        <div className="text-lg lg:text-xl leading-relaxed">
                            <ReactMarkdown>{t('aboutDetails.journeyP1')}</ReactMarkdown>
                        </div>
                        <div className="text-lg lg:text-xl leading-relaxed line-clamp-4 lg:line-clamp-2">
                            <ReactMarkdown>{t('aboutDetails.journeyP2')}</ReactMarkdown>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-4 font-semibold text-lg hover:text-green-600 transition-colors duration-300"
                    >
                        <span className="relative">
                            {t('about.cta')}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
