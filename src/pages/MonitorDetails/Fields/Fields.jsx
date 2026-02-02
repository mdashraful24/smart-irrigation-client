import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Fields = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sample data for demonstration
    const fieldCards = [
        {
            id: 1,
            fieldName: 'North Field',
            location: 'Springfield, IL',
            cropName: 'Cucumber',
            clickable: true,
            status: 'active'
        },
        {
            id: 2,
            fieldName: 'Southwest Plot',
            location: 'Lincoln, NE',
            cropName: 'Soybeans',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 3,
            fieldName: 'River Valley',
            location: 'Fresno, CA',
            cropName: 'Almonds',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 4,
            fieldName: 'Sunshine Farm',
            location: 'Orlando, FL',
            cropName: 'Citrus',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 5,
            fieldName: 'Mountain View',
            location: 'Denver, CO',
            cropName: 'Wheat',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 6,
            fieldName: 'Prairie Land',
            location: 'Amarillo, TX',
            cropName: 'Cotton',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 7,
            fieldName: 'Green Acres',
            location: 'Portland, OR',
            cropName: 'Blueberries',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 8,
            fieldName: 'Golden Field',
            location: 'Bismarck, ND',
            cropName: 'Sunflowers',
            clickable: false,
            status: 'upcoming'
        }
    ];

    // Handle card click
    const handleCardClick = (card) => {
        if (card.clickable) {
            // Navigate to details page
            // navigate(`/field/${card.id}`, { state: { fieldData: card } });
            navigate(`/all-crops`, { state: { fieldData: card } });
        }
    };

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 mt-10">
            {/* Project Name Header */}
            <div className="mb-8">
                <h1 className="text-3xl lg:text-5xl font-medium tracking-tight leading-tight">
                    Farm Field Monitoring System
                </h1>
                <p className="text-gray-600 text-lg mt-2">Real-time monitoring of agricultural fields</p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fieldCards.map((card) => (
                    <div
                        key={card.id}
                        className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 flex flex-col min-h-80 ${card.clickable
                            ? 'cursor-pointer hover:scale-[1.02]'
                            : 'cursor-default'
                            } ${hoveredCard === card.id
                                ? 'border-emerald-500'
                                : 'border-gray-200'
                            }`}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleCardClick(card)}
                    >
                        {/* Animated Running Border Effect */}
                        <div className={`absolute inset-0 rounded-xl pointer-events-none ${hoveredCard === card.id ? 'opacity-100' : 'opacity-0'
                            } transition-opacity duration-300`}>
                            <div className="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-border-run"></div>
                            </div>
                        </div>

                        {/* Card Header with colored accent */}
                        <div className="h-2 bg-linear-to-r from-green-400 to-emerald-600"></div>

                        <div className="p-6 flex-1 flex flex-col">
                            {/* Field Name */}
                            <div className="mb-4">
                                <h2 className="text-xl font-bold truncate">
                                    {card.fieldName}
                                </h2>
                                <div className="w-12 h-1 bg-emerald-500 mt-1 rounded-full"></div>
                            </div>

                            {/* For upcoming cards, show only Upcoming overlay */}
                            {!card.clickable ? (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-yellow-100 rounded-full">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span className="text-xl font-bold text-yellow-700">Upcoming</span>
                                        <p className="text-gray-600 text-sm mt-1">Available Soon</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Location (only for active/clickable cards) */}
                                    <div className="mb-4 flex-1">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-500">Location</p>
                                                <p className="text-gray-800">{card.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crop Name (only for active/clickable cards) */}
                                    <div className="mb-6">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-500">Current Crop</p>
                                                <p className="text-gray-800">{card.cropName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Status Indicator (only for active/clickable cards) */}
                            {card.clickable && (
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Status</span>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                            <span className="text-sm font-medium text-green-600">Active</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Clickable indicator for first card */}
                            {card.clickable && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Click to view details</span>
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fields;
