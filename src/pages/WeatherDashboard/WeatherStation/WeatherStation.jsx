import { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Marquee from '../Marquee/Marquee';

const WeatherStation = () => {
    const [currentTime, setCurrentTime] = useState('10:40:24');

    // Stats data with glass effect 
    const statsData = [
        {
            id: 1,
            title: "Temp",
            value: "22 °C",
            icon: "🌡️",
            color: "blue",
            change: "+1°C from yesterday",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-blue-500/20 to-blue-400/10"
        },
        {
            id: 2,
            title: "Humidity",
            value: "68 %",
            icon: "💧",
            color: "green",
            change: "Comfortable range",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-green-500/20 to-green-400/10"
        },
        {
            id: 3,
            title: "Soil",
            value: "45 %",
            icon: "🌱",
            color: "amber",
            change: "Optimal moisture",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-amber-500/20 to-amber-400/10"
        },
        {
            id: 4,
            title: "Rain",
            value: "3 %",
            icon: "🌧️",
            color: "cyan",
            change: "NO rain today",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-cyan-500/20 to-cyan-400/10",
            status: "NO"
        }
    ];

    // Simulate live time updates
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0];
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10">
            {/* Header */}
            <header className="mb-4 sm:mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Weather Station</h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse mr-1.5 sm:mr-2"></span>
                            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
                                Auto refresh 5s • Online • Ashulia/Birulia/Dhaka
                            </span>
                        </div>
                        {/* <div className="hidden sm:flex items-center ml-auto">
                                <span className="text-xs sm:text-sm text-gray-500 font-mono bg-white/50 px-2 py-1 rounded-md">
                                    {currentTime}
                                </span>
                            </div> */}
                    </div>
                </div>
            </header>

            {/* 4 Stats Cards with glass effect */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10">
                {statsData.map((stat) => (
                    <div
                        key={stat.id}
                        className={`relative backdrop-blur-md sm:backdrop-blur-lg md:backdrop-blur-xl ${stat.bgColor} 
                                    rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${stat.borderColor} 
                                    shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg
                                    md:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] md:hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] 
                                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden`}
                    >
                        {/* Gradient glow overlay */}
                        <div className={`absolute inset-0 bg-linear-to-br ${stat.glowColor} opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500 rounded-xl sm:rounded-2xl`}></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{stat.title}</h3>
                                <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow rounded-full flex items-center justify-center 
                                        text-lg sm:text-xl md:text-2xl backdrop-blur-sm bg-white/40 border border-white/50 shadow-sm`}>
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1 text-gray-900">{stat.value}</div>
                                    <div className="text-xs sm:text-sm text-gray-600 line-clamp-1 sm:line-clamp-2">{stat.change}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Time Display */}
            {/* <div className="sm:hidden mb-4">
                <div className="flex justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-sm font-mono font-medium text-gray-700">{currentTime}</span>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Content - Chart and Marquee */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                <div className="lg:col-span-3 order-2 lg:order-1">
                    <Chart />
                </div>
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <Marquee />
                </div>
            </div>
        </div>
    );
};

export default WeatherStation;
