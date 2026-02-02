import { useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart
} from 'recharts';

const Chart = () => {
    // Chart data
    const chartData = [
        { month: 'Jan', soil: 45, rain: 1200, temp: 22, hum: 68 },
        { month: 'Feb', soil: 42, rain: 1100, temp: 24, hum: 65 },
        { month: 'Mar', soil: 48, rain: 1300, temp: 26, hum: 70 },
        { month: 'Apr', soil: 50, rain: 1400, temp: 28, hum: 72 },
        { month: 'May', soil: 52, rain: 1500, temp: 30, hum: 75 },
        { month: 'Jun', soil: 55, rain: 1600, temp: 32, hum: 78 },
        { month: 'Jul', soil: 58, rain: 1800, temp: 31, hum: 80 },
        { month: 'Aug', soil: 56, rain: 1700, temp: 30, hum: 78 },
        { month: 'Sep', soil: 53, rain: 1500, temp: 29, hum: 75 },
        { month: 'Oct', soil: 49, rain: 1300, temp: 27, hum: 70 },
        { month: 'Nov', soil: 46, rain: 1200, temp: 24, hum: 68 },
        { month: 'Dec', soil: 44, rain: 1100, temp: 22, hum: 66 },
    ];

    const [chartType, setChartType] = useState('composed');

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-800">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="flex items-center gap-2" style={{ color: entry.color }}>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            {entry.dataKey}: <span className="font-semibold">{entry.value}
                                {entry.dataKey === 'temp' ? '°C' : entry.dataKey === 'hum' ? '%' : entry.dataKey === 'soil' ? '%' : 'mm'}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold">Analytics</h2>

                {/* Chart Type Selector */}
                <div className="flex gap-2">
                    {['composed', 'line', 'bar', 'area'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            className={`px-2 py-1 text-sm rounded-full capitalize transition-all backdrop-blur-sm ${chartType === type
                                ? 'bg-linear-to-r from-blue-500/30 to-purple-500/30 text-gray-800 border border-white/40'
                                : 'bg-white/20 text-gray-700 hover:bg-white/30 border border-white/30'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'composed' ? (
                        <ComposedChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="rain"
                                name="Rainfall (mm)"
                                fill="#0ea5e9"
                                opacity={0.8}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="temp"
                                name="Temperature (°C)"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="soil"
                                name="Soil Moisture (%)"
                                stroke="#22c55e"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ r: 4 }}
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="hum"
                                name="Humidity (%)"
                                stroke="#8b5cf6"
                                fill="#8b5cf6"
                                fillOpacity={0.2}
                                strokeWidth={1}
                            />
                        </ComposedChart>
                    ) : chartType === 'line' ? (
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="temp"
                                name="Temperature (°C)"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="soil"
                                name="Soil Moisture (%)"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="hum"
                                name="Humidity (%)"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    ) : chartType === 'bar' ? (
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="temp"
                                name="Temperature (°C)"
                                fill="#ef4444"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="soil"
                                name="Soil Moisture (%)"
                                fill="#22c55e"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="hum"
                                name="Humidity (%)"
                                fill="#8b5cf6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    ) : chartType === 'area' ? (
                        <AreaChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="temp"
                                name="Temperature (°C)"
                                stroke="#ef4444"
                                fill="#ef4444"
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="soil"
                                name="Soil Moisture (%)"
                                stroke="#22c55e"
                                fill="#22c55e"
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="hum"
                                name="Humidity (%)"
                                stroke="#8b5cf6"
                                fill="#8b5cf6"
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    ) : null}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
