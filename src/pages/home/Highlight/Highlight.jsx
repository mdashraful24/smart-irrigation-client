import { Link, useNavigate } from "react-router";
import img from "../../../assets/img/fresh-orange-fruit.jpg";

const projects = [
    {
        id: 1,
        title: "Fresh Orange Delivery",
        description: "Premium quality oranges delivered fresh to your doorstep with guaranteed same-day delivery",
        image: img,
        category: "Food & Beverage"
    },
    {
        id: 2,
        title: "Eco Farming Solutions",
        description: "Sustainable farming practices",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
        category: "Agriculture"
    },
    {
        id: 3,
        title: "Urban Garden Design",
        description: "Transforming urban spaces into green havens with innovative vertical gardening solutions and sustainable materials",
        image: "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?auto=format&fit=crop&w=800",
        category: "Design"
    },
    {
        id: 4,
        title: "Organic Produce Market",
        description: "Connecting organic farmers with local communities through our innovative platform",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800",
        category: "Retail"
    },
    {
        id: 5,
        title: "Farm to Table Initiative",
        description: "Reducing food miles, increasing freshness",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
        category: "Sustainability"
    },
    {
        id: 6,
        title: "Agricultural Tech Hub",
        description: "Innovative technology solutions for modern farmers including IoT sensors and AI-powered analytics",
        image: img,
        category: "Technology"
    }
];

const Highlight = () => {
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate('/highlight');
    };

    const handleCardClick = (id) => {
        navigate(`/highlight/${id}`);
    };

    return (
        <div className="container mx-auto pb-20 px-4">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold capitalize">
                    Highlights of our project
                </h2>
                <p className="mt-4 md:mt-7 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                    Explore our portfolio of successful projects and innovative solutions.
                </p>
            </div>

            {/* Project Cards Grid - All cards same height */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        // onClick={() => handleCardClick(project.id)}
                        className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Project Image - Fixed height */}
                        <div className="relative h-48 md:h-56 overflow-hidden">
                            <img
                                src={project.image}
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
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                                <div className="text-2xl font-bold text-gray-300">0{project.id}</div>
                            </div>
                            <p className="leading-relaxed line-clamp-3 grow">
                                {project.description}
                            </p>
                            {/* View Details Button */}
                            {/* <div className="flex items-center text-orange-600 font-medium group-hover:underline mt-4">
                                View Details
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="mt-10 text-end">
                <Link
                    to={"/highlight"}
                    className="inline-flex items-center px-4 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-300 hover:shadow-lg hover:cursor-pointer"
                >
                    View All Projects
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Highlight;
