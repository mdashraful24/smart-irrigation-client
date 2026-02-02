import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Marquee from '../Marquee/Marquee';

const WeatherStation = () => {
    const [currentTime, setCurrentTime] = useState('10:40:24');

    // Stats data
    const statsData = [
        {
            id: 1,
            title: "Temp",
            value: "22 °C",
            icon: "🌡️",
            color: "blue",
            change: "+1°C from yesterday",
            bgColor: "from-blue-100 to-blue-50",
            borderColor: "border-blue-200"
        },
        {
            id: 2,
            title: "Humidity",
            value: "68 %",
            icon: "💧",
            color: "green",
            change: "Comfortable range",
            bgColor: "from-green-100 to-green-50",
            borderColor: "border-green-200"
        },
        {
            id: 3,
            title: "Soil",
            value: "45 %",
            icon: "🌱",
            color: "amber",
            change: "Optimal moisture",
            bgColor: "from-amber-100 to-amber-50",
            borderColor: "border-amber-200"
        },
        {
            id: 4,
            title: "Rain",
            value: "3 %",
            icon: "🌧️",
            color: "cyan",
            change: "NO rain today",
            bgColor: "from-cyan-100 to-cyan-50",
            borderColor: "border-cyan-200",
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
        <div className="min-h-screen">
            <div className="container mx-auto px-4 lg:px-0 py-16 mt-10">

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Weather Station</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></span>
                                    <span className="text-sm font-medium text-gray-600">
                                        Auto refresh 5s • Online • Ashulia/Birulia/Dhaka
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat) => (
                        <div
                            key={stat.id}
                            className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl px-5 py-3 border ${stat.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${stat.color === 'blue' ? 'bg-blue-200' :
                                    stat.color === 'green' ? 'bg-green-200' :
                                        stat.color === 'amber' ? 'bg-amber-200' :
                                            'bg-cyan-200'
                                    }`}>
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.change}</div>
                                </div>

                                {stat.status && (
                                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.color === 'cyan' ? 'bg-cyan-100 text-cyan-800' :
                                        'bg-blue-100 text-blue-800'
                                        }`}>
                                        {stat.status}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content - Chart and Marquee */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <Chart />
                    </div>
                    <div className="lg:col-span-2">
                        <Marquee />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherStation;