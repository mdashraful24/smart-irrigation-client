import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from 'react-i18next';

// Import team member images
import storyImg from "../../assets/about/img3.png";

import sir1 from "../../assets/members/kabir-sir.jpeg";
import sir2 from "../../assets/members/rahim-sir.jpeg";
import sir3 from "../../assets/members/dipto-sir.jpeg";

import img1 from "../../assets/members/awsaf.jpeg";
import img2 from "../../assets/members/methon.jpeg";
import img3 from "../../assets/members/sethi.jpeg";
import img4 from "../../assets/members/kazi.jpeg";
import img5 from "../../assets/members/noushad.jpeg";
import { Helmet } from "react-helmet-async";

// Create image map for team members
const imageMap = {
    "kabir-sir.jpeg": sir1,
    "rahim-sir.jpeg": sir2,
    "dipto-sir.jpeg": sir3,
    "awsaf.jpeg": img1,
    "methon.jpeg": img2,
    "sethi.jpeg": img3,
    "kazi.jpeg": img4,
    "noushad": img5,
};

// Create separate image lists for sirs and students
const sirImageList = [sir1, sir2, sir3];
const studentImageList = [img1, img2, img3, img4, img5];

const AboutDetails = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch all data using translation hook
    const workingProgressContent = t('aboutDetails.workingProgressContent', { returnObjects: true }) || [];
    const values = t('aboutDetails.values', { returnObjects: true }) || [];
    const teamMembers = t('aboutDetails.teamMembers', { returnObjects: true }) || [];
    const pageTitle = t('nav.about');
    const brand = t('brand');

    // Separate team members into sirs (first 3) and students (remaining)
    const sirs = teamMembers.slice(0, 3);
    const students = teamMembers.slice(3);

    // Function to render team member cards
    const renderTeamMembers = (members, imageList) => {
        return members.map((member, index) => {
            // For students, we need to cycle through available images
            // Since there are more students than images, we'll use modulo
            const imageIndex = index % imageList.length;
            const imageSrc = member.img
                ? (imageMap[member.img.split('/').pop()] || member.img)
                : imageList[imageIndex];

            return (
                <div
                    key={member.id || index}
                    className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-86">
                        <img
                            src={imageSrc}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 group-hover:to-black/40 transition-all duration-500"></div>

                        {/* Social Links - Only show if there are actual social links */}
                        {member.social && member.social[0]?.platform !== '#' && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                {member.social.map((socialItem, i) => (
                                    <a
                                        key={i}
                                        href={socialItem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors duration-300 transform hover:scale-110 cursor-pointer"
                                        aria-label={`${socialItem.platform} profile`}
                                    >
                                        <span className="text-sm font-semibold">
                                            {socialItem.platform === 'linkedin' ? 'in' : socialItem.platform.charAt(0).toUpperCase()}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="mb-1">
                            <h3 className="text-xl sm:text-2xl font-bold"> {/*  group-hover:text-green-600 transition-colors duration-300 */}
                                {member.name}
                            </h3>
                            <p className="text-green-600 font-semibold mt-1">{member.role}</p>
                        </div>
                        {member.department && (
                            <p className="leading-relaxed mt-1 text-gray-600">
                                {member.department}
                            </p>
                        )}
                        <p className="leading-relaxed mt-1 text-gray-500">
                            {member.description}
                        </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="container mx-auto px-4 py-16 mt-10">
            <Helmet>
                <title>
                    {pageTitle ? `${pageTitle} | ${brand}` : ` ${brand}`}
                </title>
            </Helmet>

            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 lg:mb-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 md:mb-5 tracking-tight leading-tight">
                    {t('aboutDetails.title')}
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-0">
                    {t('aboutDetails.lead')}
                </p>
            </div>

            {/* Story Section with Elegant Design */}
            <div className="text-center lg:text-left relative mb-16 md:mb-24 lg:mb-32">
                <div className="mb-10 md:mb-8">
                    <h2 className="text-3xl md:text-5xl">
                        {t('aboutDetails.journeyTitle')}
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <div className="space-y-4 md:space-y-6">
                            <div className="md:text-lg leading-relaxed">
                                <ReactMarkdown>{t('aboutDetails.journeyP1')}</ReactMarkdown>
                            </div>
                            <div className="md:text-lg leading-relaxed">
                                <ReactMarkdown>{t('aboutDetails.journeyP2')}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative order-1 lg:order-2">
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src={storyImg}
                                alt="Our story"
                                className="w-full h-full lg:h-100 object-cover transform transition-transform duration-700 lg:hover:scale-105"
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
            <div className="mb-20 md:mb-24 lg:mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl mb-4 md:mb-6">
                        {t('aboutDetails.teamTitle')}
                    </h2>
                    <p className="max-w-2xl mx-auto md:text-lg">
                        {t('aboutDetails.teamLead')}
                    </p>
                </div>

                {/* Faculty/Advisors Section (Sirs) */}
                {sirs.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-green-600">
                            {t('aboutDetails.teachers')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {renderTeamMembers(sirs, sirImageList)}
                        </div>
                    </div>
                )}

                {/* Research Assistants Section (Students) */}
                {students.length > 0 && (
                    <div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-green-600">
                            {t('aboutDetails.students')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {renderTeamMembers(students, studentImageList)}
                        </div>
                    </div>
                )}
            </div>

            {/* Working Progress Section */}
            <div className="mb-20 md:mb-24 lg:mb-32">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-5xl mb-4 md:mb-6">
                        {t('aboutDetails.workingProgressTitle')}
                    </h2>
                    <p className="max-w-3xl mx-auto md:text-lg leading-relaxed">
                        {t('aboutDetails.workingProgressLead')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {Array.isArray(workingProgressContent) && workingProgressContent.map((project, index) => (
                        <div
                            key={index}
                            className="flex flex-col h-full bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-md hover:border-green-400 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Top Section */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="grow pr-4">
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        {project.title}
                                    </h3>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${project.status === 'In Progress' || project.status === 'চলমান'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <p className="leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Push Progress Section to Bottom */}
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                        Progress
                                    </span>
                                    <span className="text-sm font-bold text-green-600">
                                        {project.progress}%
                                    </span>
                                </div>

                                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
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
                        {Array.isArray(values) && values.map((value, index) => (
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
