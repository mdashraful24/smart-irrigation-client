import { useTranslation } from 'react-i18next';
import ReactMarkdown from "react-markdown";
import img1 from "../../../assets/highlights/h1.jpg";
import img2 from "../../../assets/highlights/h2.jpg";
import img3 from "../../../assets/highlights/h3.jpg";
import img4 from "../../../assets/highlights/h4.jpg";
import img5 from "../../../assets/highlights/h5.jpg";
import img6 from "../../../assets/highlights/h6.jpg";
import img7 from "../../../assets/highlights/h7.jpg";
import img8 from "../../../assets/highlights/h8.jpg";
import img9 from "../../../assets/highlights/h9.jpg";
import { Link } from 'react-router';

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

const Highlight = () => {
    const { t } = useTranslation();

    const allProjects = t('highlight_showcase.projects', { returnObjects: true }) || [];
    const projects = allProjects.slice(0, 6);

    return (
        <div className="container mx-auto pb-24 lg:pb-30 px-4">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold capitalize">
                    {t('highlight.title')}
                </h2>
                <p className="mt-4 md:mt-7 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                    {t('highlight.subtitle')}
                </p>
            </div>

            {/* Project Cards Grid - All cards same height */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => {
                    const imageSrc = typeof project.image === 'string'
                        ? (imageMap[project.image] || project.image)
                        : (project.image || imageList[idx] || img1);

                    return (
                        <div
                            key={project.id}
                            className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-md ring-2 ring-gray-200 hover:ring-green-400 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Project Image - Fixed height */}
                            <div className="relative h-60 md:h-72 overflow-hidden">
                                <img
                                    src={imageSrc}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Project Content - Flex grow for consistent height */}
                            <div className="flex flex-col grow p-6">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="text-xl font-semibold group-hover:text-green-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="text-2xl font-bold text-gray-300 group-hover:text-green-400 transition-colors">
                                        {project.id}
                                    </div>
                                </div>
                                <p className="leading-relaxed grow">
                                    <ReactMarkdown>{project.description}</ReactMarkdown>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* See More Button */}
            {allProjects.length > 6 && (
                <div className="mt-10 text-end">
                    <Link
                        to="/highlight"
                        className="inline-flex items-center px-4 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:cursor-pointer"
                    >
                        {t('highlight.viewAll')}
                        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Highlight;
