import { useEffect, useState } from 'react';

const CropDetails = () => {
    const [powerOn, setPowerOn] = useState(true);

    // Sample data - you can replace with actual data
    const fieldName = "North Field";
    const cropName = "Cucumber";
    const avgSoil = 65;
    const avgTemperature = 28;
    const avgHumidity = 72;

    // Sample sensor data
    const soilSensors = Array.from({ length: 15 }, (_, i) => ({
        id: `s${i + 1}`,
        value: 60 + Math.floor(Math.random() * 20)
    }));

    const tempSensors = [
        { id: 't1', value: 27.5 },
        { id: 't2', value: 28.5 }
    ];

    const humiditySensors = [
        { id: 'h1', value: 70 },
        { id: 'h2', value: 74 }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 mt-10">
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-center mb-4">
                    {fieldName}
                </h1>
                <h2 className="text-2xl md:text-5xl font-semibold">
                    Crop: <span className="text-amber-600">{cropName}</span>
                </h2>
            </div>

            {/* Average Metrics Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border-l-4 border-amber-500">
                    <h3 className="text-sm font-medium mb-1">Avg Soil Moisture</h3>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-amber-600 font-bold">💧</span>
                        </div>
                        <span className="text-2xl font-bold">{avgSoil}%</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border-l-4 border-red-500">
                    <h3 className="text-sm font-medium mb-1">Avg Temperature</h3>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-red-600 font-bold">🌡</span>
                        </div>
                        <span className="text-2xl font-bold">{avgTemperature}°C</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border-l-4 border-blue-500">
                    <h3 className="text-sm font-medium mb-1">Avg Humidity</h3>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">💦</span>
                        </div>
                        <span className="text-2xl font-bold">{avgHumidity}%</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border-l-4 border-purple-500">
                    <h3 className="text-sm font-medium mb-1">Power Status</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-purple-600 font-bold">⚡</span>
                            </div>
                            <span className="text-2xl font-bold">
                                {powerOn ? 'ON' : 'OFF'}
                            </span>
                        </div>
                        {/* <button
                            onClick={() => setPowerOn(!powerOn)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${powerOn
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                        >
                            {powerOn ? 'Turn Off' : 'Turn On'}
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Sensor Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* S1-S15 Soil Moisture Sensors */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg md:text-2xl font-bold">Soil Moisture Sensors</h3>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            15 Sensors
                        </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {soilSensors.map((sensor) => (
                            <div
                                key={sensor.id}
                                className="bg-linear-to-br from-amber-50 to-amber-100 rounded-lg p-3 text-center border border-amber-200 hover:shadow-md transition-shadow"
                            >
                                <div className="font-medium mb-1">{sensor.id}</div>
                                <div className="text-2xl font-bold text-amber-700">{sensor.value}%</div>
                                <div className="mt-2 w-full bg-amber-200 rounded-full h-2">
                                    <div
                                        className="bg-amber-600 h-2 rounded-full"
                                        style={{ width: `${sensor.value}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Temperature and Humidity Sensors */}
                <div className="space-y-6">
                    {/* Temperature Sensors */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg md:text-2xl font-bold">Temperature Sensors</h3>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                2 Sensors
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {tempSensors.map((sensor) => (
                                <div
                                    key={sensor.id}
                                    className="bg-linear-to-br from-red-50 to-red-100 rounded-lg p-2 text-center border border-red-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="text-2xl mr-2">🌡</span>
                                        <div className="font-medium">{sensor.id}</div>
                                    </div>
                                    <div className="text-2xl font-bold text-red-700">{sensor.value}°C</div>
                                    <div className="mt-2 text-sm">
                                        {sensor.value > 30 ? 'High' : sensor.value < 20 ? 'Low' : 'Optimal'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Humidity Sensors */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg md:text-2xl font-bold">Humidity Sensors</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                2 Sensors
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {humiditySensors.map((sensor) => (
                                <div
                                    key={sensor.id}
                                    className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center border border-blue-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="text-2xl mr-2">💦</span>
                                        <div className="font-medium">{sensor.id}</div>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-700">{sensor.value}%</div>
                                    <div className="mt-2 text-sm">
                                        {sensor.value > 80 ? 'High' : sensor.value < 40 ? 'Low' : 'Optimal'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
