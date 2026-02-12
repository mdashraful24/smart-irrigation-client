import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import WeatherStation from '../../WeatherDashboard/WeatherStation/WeatherStation';

const Crops = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [hoveredCard, setHoveredCard] = useState(null);

    // Get field data from navigation state
    const fieldData = location.state?.fieldData || {
        fieldName: 'Field Laboratory 01 (Malta Garden)',
        location: 'Springfield, IL',
        cropName: 'Cucumber'
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sample crop data for demonstration
    const cropCards = [
        {
            id: 1,
            cropName: 'Cucumber',
            averageSoilMoisture: '65%',
            averageTemperature: '24°C',
            averageHumidity: '70%',
            waterSupply: 'Sufficient',
            clickable: true,
            status: 'growing'
        },
        {
            id: 2,
            cropName: 'Soybeans',
            variety: 'AG32X8',
            plantingDate: 'May 10, 2024',
            harvestDate: 'October 20, 2024',
            clickable: false,
            status: 'growing'
        },
        {
            id: 3,
            cropName: 'Wheat',
            variety: 'Winter Red',
            plantingDate: 'October 5, 2023',
            harvestDate: 'June 15, 2024',
            clickable: false,
            status: 'harvested'
        },
        {
            id: 4,
            cropName: 'Alfalfa',
            variety: 'Vernal',
            plantingDate: 'March 20, 2024',
            harvestDate: 'Multiple Cuttings',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 5,
            cropName: 'Barley',
            variety: 'Conlon',
            plantingDate: 'March 25, 2024',
            harvestDate: 'July 30, 2024',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 6,
            cropName: 'Oats',
            variety: 'Jerry',
            plantingDate: 'April 5, 2024',
            harvestDate: 'August 15, 2024',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 7,
            cropName: 'Canola',
            variety: 'HyClass',
            plantingDate: 'August 20, 2024',
            harvestDate: 'November 2024',
            clickable: false,
            status: 'upcoming'
        },
        {
            id: 8,
            cropName: 'Sunflowers',
            variety: 'Clearfield',
            plantingDate: 'May 5, 2024',
            harvestDate: 'September 2024',
            clickable: false,
            status: 'upcoming'
        }
    ];

    // Handle crop card click
    const handleCardClick = (card) => {
        if (card.clickable) {
            // Navigate to crop details page
            // navigate(`/crop/${card.id}`, { state: { cropData: card, fieldData } });
            navigate(`/crop-details`, { state: { cropData: card, fieldData } });
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'growing':
                return { dot: 'bg-green-500', text: 'text-green-600' };
            case 'harvested':
                return { dot: 'bg-blue-500', text: 'text-blue-600' };
            case 'upcoming':
                return { dot: 'bg-yellow-500', text: 'text-yellow-600' };
            default:
                return { dot: 'bg-gray-500', text: 'text-gray-600' };
        }
    };

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 mt-10 mb-5">

            {/* Field Name Header */}
            <div className="flex flex-col justify-center items-center pb-10">
                <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
                    {fieldData.fieldName}
                </h1>
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p className="text-lg">{fieldData.location}</p>
                </div>
            </div>

            {/* Weather Station */}
            <div className='pb-16'>
                <WeatherStation />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cropCards.map((card) => (
                    <div
                        key={card.id}
                        className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border flex flex-col min-h-80 ${card.clickable
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
                        <div className={`h-2 ${card.clickable ? 'bg-linear-to-r from-green-400 to-emerald-600' : 'bg-linear-to-r from-yellow-400 to-yellow-600'}`}></div>

                        <div className="p-6 flex-1 flex flex-col">
                            {/* Crop Name */}
                            <div className="mb-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 1m6-2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M9 10l3 1m0-2l-3-1m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M12 4v16"></path>
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-bold">{t('crops.cropName')}</p>
                                        <p>{card.cropName}</p>
                                    </div>
                                </div>
                                {/* <div className={`w-12 h-1 ${card.clickable ? 'bg-emerald-500' : 'bg-yellow-500'} mt-1 rounded-full`}></div> */}
                            </div>

                            {/* For upcoming cards, show only Upcoming overlay */}
                            {!card.clickable ? (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-yellow-100 rounded-full">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span className="text-xl font-bold text-yellow-700">{t('crops.upcoming')}</span>
                                        <p className="text-sm mt-1">{t('crops.availableSoon')}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Average Soil Moisture */}
                                    <div className="mb-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold">{t('crops.averageSoilMoisture')}</p>
                                                    <p>{card.averageSoilMoisture}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Average Humidity */}
                                    <div className="mb-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold">{t('crops.averageTemperature')}</p>
                                                    <p>{card.averageTemperature}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Average Humidity */}
                                    <div className="mb-6">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold">{t('crops.averageHumidity')}</p>
                                                    <p>{card.averageHumidity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Water Supply */}
                                    <div className="mb-6">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold">{t('crops.waterSupply')}</p>
                                                    <p>{card.waterSupply}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Status Indicator (only for active/clickable cards) */}
                            {card.clickable && (
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{t('crops.status')}</span>
                                        <div className="flex items-center">
                                            <div className={`w-2 h-2 ${getStatusColor(card.status).dot} rounded-full mr-2 ${card.status === 'growing' ? 'animate-pulse' : ''}`}></div>
                                            <span className={`text-sm font-medium ${getStatusColor(card.status).text}`}>
                                                {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Clickable indicator for clickable cards */}
                            {/* {card.clickable && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-600">{t('crops.clickDetails')}</span>
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Crops;
