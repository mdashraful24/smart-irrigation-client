import { useEffect } from "react";
import { useNavigate } from "react-router";
import img from "../../assets/img/fresh-orange-fruit.jpg";

const HighlightShowcase = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projects = [
        {
            id: 1,
            title: "Fresh Orange Delivery",
            description: "Premium quality oranges delivered fresh to your doorstep with guaranteed same-day delivery",
            fullDescription: "Our Fresh Orange Delivery service ensures you get the highest quality citrus fruits directly from sustainable farms. We partner with local growers who use organic farming practices, ensuring each orange is packed with flavor and nutrients. Our logistics network guarantees delivery within 24 hours of harvest.",
            image: img,
            category: "Food & Beverage",
            features: ["24-hour delivery", "Organic certification", "Farm-direct pricing"],
            stats: { clients: 500, rating: 4.9, delivery: "24h" }
        },
        {
            id: 2,
            title: "Eco Farming Solutions",
            description: "Sustainable farming practices for modern agriculture",
            fullDescription: "We provide comprehensive eco-friendly farming solutions that help farmers increase yield while reducing environmental impact. Our system includes water conservation technology, natural pest control methods, and soil health monitoring.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
            category: "Agriculture",
            features: ["Water conservation", "Natural pest control", "Soil monitoring"],
            stats: { clients: 120, rating: 4.8, delivery: "Custom" }
        },
        {
            id: 3,
            title: "Urban Garden Design",
            description: "Transforming urban spaces into green havens with innovative vertical gardening solutions",
            fullDescription: "Our urban garden designs transform limited spaces into productive green areas. We specialize in vertical gardening, rooftop farms, and balcony gardens that maximize space utilization while creating beautiful, functional green spaces in urban environments.",
            image: "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?auto=format&fit=crop&w=800",
            category: "Design",
            features: ["Vertical gardens", "Space optimization", "Maintenance plans"],
            stats: { clients: 85, rating: 4.7, delivery: "2-4 weeks" }
        },
        {
            id: 4,
            title: "Organic Produce Market",
            description: "Connecting organic farmers with local communities through our innovative platform",
            fullDescription: "Our digital marketplace connects certified organic farmers directly with consumers and local businesses. We've created a transparent supply chain that benefits both producers and consumers while promoting sustainable agricultural practices.",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800",
            category: "Retail",
            features: ["Direct farmer access", "Quality assurance", "Transparent pricing"],
            stats: { clients: 300, rating: 4.9, delivery: "Same day" }
        },
        {
            id: 5,
            title: "Farm to Table Initiative",
            description: "Reducing food miles, increasing freshness for restaurants and hotels",
            fullDescription: "Our Farm-to-Table program partners with local restaurants and hotels to provide the freshest ingredients possible. We manage the entire supply chain from farm to kitchen, reducing food waste and carbon footprint while ensuring premium quality.",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
            category: "Sustainability",
            features: ["Local sourcing", "Waste reduction", "Quality tracking"],
            stats: { clients: 45, rating: 4.6, delivery: "Daily" }
        },
        {
            id: 6,
            title: "Agricultural Tech Hub",
            description: "Innovative technology solutions for modern farmers",
            fullDescription: "We develop and implement cutting-edge technology solutions for modern agriculture. Our offerings include IoT sensors for crop monitoring, AI-powered analytics for yield prediction, and automated irrigation systems that optimize water usage.",
            image: img,
            category: "Technology",
            features: ["IoT sensors", "AI analytics", "Automated systems"],
            stats: { clients: 75, rating: 4.8, delivery: "Custom" }
        },
        // Additional projects
        {
            id: 7,
            title: "Hydroponic Systems",
            description: "Advanced soil-less farming systems for urban agriculture",
            fullDescription: "Our hydroponic systems enable year-round cultivation without soil, using nutrient-rich water solutions. Perfect for urban environments where space is limited, these systems produce higher yields with less water consumption.",
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800",
            category: "Technology",
            features: ["Water efficient", "Year-round production", "Space saving"],
            stats: { clients: 60, rating: 4.7, delivery: "4-6 weeks" }
        },
        {
            id: 8,
            title: "Food Waste Reduction",
            description: "Technology solutions to minimize food waste in supply chains",
            fullDescription: "Our food waste reduction platform uses AI to predict demand, optimize inventory, and redirect surplus food to those in need. We work with supermarkets, restaurants, and farms to create a more sustainable food system.",
            image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=800",
            category: "Sustainability",
            features: ["AI prediction", "Inventory optimization", "Community redistribution"],
            stats: { clients: 95, rating: 4.9, delivery: "Ongoing" }
        },
        {
            id: 9,
            title: "Farm Equipment Rental",
            description: "Modern farming equipment rental service for small farmers",
            fullDescription: "We provide affordable access to modern farming equipment through our rental platform. This enables small-scale farmers to use high-quality machinery without the high capital investment, increasing their productivity and profitability.",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800",
            category: "Agriculture",
            features: ["Affordable access", "Modern equipment", "Maintenance included"],
            stats: { clients: 200, rating: 4.8, delivery: "48h" }
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 mt-10 mb-5">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-5 tracking-tight leading-tight">
                    Highlights of our project
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                    Explore our complete portfolio of innovative projects and solutions
                </p>
            </div>

            {/* Projects Grid - Similar to Highlight section */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        // onClick={() => navigate(`/highlight/${project.id}`)}
                        className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg"
                    >
                        {/* Project Image */}
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

                        {/* Project Content */}
                        <div className="flex flex-col grow p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                                <div className="text-2xl font-bold text-gray-300">0{project.id}</div>
                            </div>
                            <p className="leading-relaxed line-clamp-2 grow">
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
        </div>
    );
};

export default HighlightShowcase;
