import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import img1 from "../../assets/highlights/h1.jpg";
import img2 from "../../assets/highlights/h2.jpg";
import img3 from "../../assets/highlights/h3.jpg";
import img4 from "../../assets/highlights/h4.jpg";
import img5 from "../../assets/highlights/h5.jpg";
import img6 from "../../assets/highlights/h6.jpg";
import img7 from "../../assets/highlights/h7.jpg";
import img8 from "../../assets/highlights/h8.jpg";
import img9 from "../../assets/highlights/h9.jpg";

const imageMap = {
    "h1.jpg": img1,
    "h2.jpg": img2,
    "h3.jpg": img3,
    "h4.jpg": img4,
    "h5.jpg": img5,
    "h6.jpg": img6,
    "h7.jpg": img7,
    "h8.jpg": img8,
    "h9.jpg": img9,
};

const imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const HighlightShowcase = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projects = t('highlight_showcase.projects', { returnObjects: true }) || [];

    return (
        <div className="container mx-auto px-4 py-16 mt-10 mb-5">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-5 tracking-tight leading-tight">
                    {t('highlight_showcase.title')}
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                    {t('highlight_showcase.subtitle')}
                </p>
            </div>

            {/* Projects Grid - Similar to Highlight section */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => {
                    const imageSrc = typeof project.image === 'string'
                        ? (imageMap[project.image] || project.image)
                        : (project.image || imageList[idx] || img1);

                    return (
                        <div
                            key={project.id}
                            // onClick={() => navigate(`/highlight/${project.id}`)}
                            className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-md ring-2 ring-gray-200 hover:ring-green-400 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Project Image */}
                            <div className="relative h-60 md:h-72 overflow-hidden">
                                <img
                                    src={imageSrc}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-semibold rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="flex flex-col grow p-6">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="text-xl font-semibold group-hover:text-green-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="text-2xl font-bold text-gray-300 group-hover:text-green-400 transition-colors">{project.id}</div>
                                </div>
                                <p className="leading-relaxed grow">
                                    {project.description}
                                </p>

                                {/* View Details Button */}
                                {/* <div className="flex items-center text-green-600 font-medium group-hover:underline mt-4">
                                View Details
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default HighlightShowcase;
