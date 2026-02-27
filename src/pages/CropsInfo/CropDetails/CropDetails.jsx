import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Droplets, Thermometer, Cloud, Activity, Settings, ToggleLeft, ToggleRight, Gauge } from 'lucide-react';
import useAdmin from "../../../hooks/useAdmin";

// Custom hook for checking if element is in viewport
const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Set isInView to true immediately to show data
        setIsInView(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return [ref, isInView];
};

const CropDetails = () => {
    const { isAdmin } = useAdmin();
    const [waterSupplyOn, setWaterSupplyOn] = useState(false);
    const [systemStatus, setSystemStatus] = useState("optimal");
    const [ref, isInView] = useInView();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Sensor data states
    const [sensorData, setSensorData] = useState({
        soilMoisture: [],
        temperature: [],
        humidity: []
    });

    // Average values
    const [averages, setAverages] = useState({
        soil: 0,
        temperature: 0,
        humidity: 0
    });

    // Admin control states
    const [valveMode, setValveMode] = useState("auto");
    const [moistureThresholds, setMoistureThresholds] = useState({
        lower: 50,
        upper: 75
    });

    const fieldName = "Field Laboratory 01 (Malta Garden)";
    const cropName = "Cucumber";

    // Fetch sensor data from API
    const fetchSensorData = async () => {
        try {
            setLoading(true);
            console.log('Fetching sensor data...');

            const response = await fetch('/api/latest_sis_sn_01.php');

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            if (!result.data) {
                console.log('No data available from API');
                setError('No sensor data available');
                return;
            }

            const data = result.data;
            console.log('Processing data:', data);

            // Parse soil moisture sensors (sm01 to sm15)
            const soilMoistureSensors = [];
            for (let i = 1; i <= 15; i++) {
                const sensorKey = `sm${i.toString().padStart(2, '0')}`;
                if (data[sensorKey] !== undefined && data[sensorKey] !== null) {
                    soilMoistureSensors.push({
                        id: `S${i}`,
                        value: parseFloat(data[sensorKey]) || 0
                    });
                }
            }
            console.log('Parsed soil moisture sensors:', soilMoistureSensors);

            // Parse temperature sensors (t1, t2)
            const temperatureSensors = [];
            if (data.t1 !== undefined && data.t1 !== null) {
                temperatureSensors.push({
                    id: 'TEMP-01',
                    value: parseFloat(data.t1) || 0
                });
            }
            if (data.t2 !== undefined && data.t2 !== null) {
                temperatureSensors.push({
                    id: 'TEMP-02',
                    value: parseFloat(data.t2) || 0
                });
            }
            console.log('Parsed temperature sensors:', temperatureSensors);

            // Parse humidity sensors (h1, h2)
            const humiditySensors = [];
            if (data.h1 !== undefined && data.h1 !== null) {
                humiditySensors.push({
                    id: 'HUM-01',
                    value: parseFloat(data.h1) || 0
                });
            }
            if (data.h2 !== undefined && data.h2 !== null) {
                humiditySensors.push({
                    id: 'HUM-02',
                    value: parseFloat(data.h2) || 0
                });
            }
            console.log('Parsed humidity sensors:', humiditySensors);

            // Calculate averages if not provided
            const avgSoil = data.avg_sm ? parseFloat(data.avg_sm) :
                (soilMoistureSensors.length > 0 ?
                    soilMoistureSensors.reduce((acc, s) => acc + s.value, 0) / soilMoistureSensors.length : 0);

            const avgTemp = data.avg_t ? parseFloat(data.avg_t) :
                (temperatureSensors.length > 0 ?
                    temperatureSensors.reduce((acc, s) => acc + s.value, 0) / temperatureSensors.length : 0);

            const avgHum = data.avg_h ? parseFloat(data.avg_h) :
                (humiditySensors.length > 0 ?
                    humiditySensors.reduce((acc, s) => acc + s.value, 0) / humiditySensors.length : 0);

            console.log('Calculated averages:', { soil: avgSoil, temperature: avgTemp, humidity: avgHum });

            // Update all states at once
            setSensorData({
                soilMoisture: soilMoistureSensors,
                temperature: temperatureSensors,
                humidity: humiditySensors
            });

            setAverages({
                soil: avgSoil,
                temperature: avgTemp,
                humidity: avgHum
            });

            setLastUpdated(data.created_at);
            setError(null);

        } catch (err) {
            console.error('Error fetching sensor data:', err);
            setError('Failed to load sensor data.');

            // Don't set fallback data, just show error message
            // The components will show 0 values until data loads
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and polling setup
    useEffect(() => {
        fetchSensorData();

        const interval = setInterval(fetchSensorData, 30000);

        return () => clearInterval(interval);
    }, []);

    // Auto valve control logic
    useEffect(() => {
        if (valveMode === "auto" && averages.soil > 0) {
            if (waterSupplyOn && averages.soil >= moistureThresholds.upper) {
                setWaterSupplyOn(false);
            } else if (!waterSupplyOn && averages.soil <= moistureThresholds.lower) {
                setWaterSupplyOn(true);
            }
        }
    }, [averages.soil, valveMode, moistureThresholds, waterSupplyOn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update system status based on sensor values
    useEffect(() => {
        const avgSoilMoisture = averages.soil;

        if (avgSoilMoisture < moistureThresholds.lower - 10 || avgSoilMoisture > moistureThresholds.upper + 10) {
            setSystemStatus("critical");
        } else if (avgSoilMoisture < moistureThresholds.lower || avgSoilMoisture > moistureThresholds.upper) {
            setSystemStatus("warning");
        } else {
            setSystemStatus("optimal");
        }
    }, [averages.soil, moistureThresholds]);

    // Handle threshold changes
    const handleThresholdChange = (type, value) => {
        const numValue = parseInt(value) || 0;
        const clampedValue = Math.min(100, Math.max(0, numValue));

        setMoistureThresholds(prev => ({
            ...prev,
            [type]: clampedValue
        }));
    };

    // Handle valve toggle with manual mode check
    const handleValveToggle = () => {
        if (valveMode === "manual") {
            setWaterSupplyOn(!waterSupplyOn);
        }
    };

    // Format last updated time
    const formatLastUpdated = (datetime) => {
        if (!datetime) return 'N/A';
        const date = new Date(datetime);
        return date.toLocaleString();
    };

    // Status Configuration
    const statusConfig = {
        optimal: {
            color: 'bg-green-50 text-green-700 border-green-300',
            dot: 'bg-green-500',
            text: 'Optimal'
        },
        warning: {
            color: 'bg-yellow-50 text-yellow-700 border-yellow-400',
            dot: 'bg-yellow-500',
            text: 'Warning'
        },
        critical: {
            color: 'bg-red-50 text-red-700 border-red-300',
            dot: 'bg-red-500',
            text: 'Critical'
        }
    };

    const config = statusConfig[systemStatus];

    // Check if we have data to display
    const hasData = sensorData.soilMoisture.length > 0 || averages.soil > 0;

    return (
        <div className="min-h-screen">
            <div ref={ref} className="container mx-auto px-4 py-16 mt-10 mb-5">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 mb-8">
                    {/* Header Section */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
                            {fieldName}
                        </h1>
                        <div className="flex flex-row justify-center lg:justify-start items-center-safe gap-3">
                            <h2 className="text-2xl lg:text-3xl font-semibold">
                                {cropName}
                            </h2>
                            {/* <p className="flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-400">
                                Cucumber
                            </p> */}
                        </div>
                        {/* Last Updated Info */}
                        {lastUpdated && (
                            <p className="text-xs mt-2">
                                <span className="font-medium">Last updated:</span> {formatLastUpdated(lastUpdated)}
                            </p>
                        )}
                        {loading && (
                            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                                <span className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></span>
                                Refreshing data...
                            </p>
                        )}
                        {error && (
                            <p className="text-xs text-red-500 mt-2">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* System Status Badge */}
                    {hasData && (
                        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-sm bg-white/90 ${config.color}`}>
                            <Activity className="w-4 h-4" />
                            <span className="text-sm font-semibold">System Status:</span>
                            <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse mx-1`}></div>
                            <span className="text-sm font-medium">{config.text}</span>
                        </div>
                    )}
                </div>

                {/* Admin Controls */}
                {isAdmin && (
                    <div className="mb-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-semibold text-purple-900">Admin Controls</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Valve Mode Control - Single toggle for Auto/Manual */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <label className="block text-sm font-medium mb-3">
                                    Valve Control Mode
                                </label>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {valveMode === "auto" ? (
                                            <ToggleRight className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <ToggleLeft className="w-5 h-5 text-gray-600" />
                                        )}
                                        <span className="text-sm font-medium">
                                            {valveMode === "auto" ? "Auto Mode" : "Manual Mode"}
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={valveMode === "auto"}
                                        onChange={() => setValveMode(valveMode === "auto" ? "manual" : "auto")}
                                        className="toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
                                    />
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    {valveMode === "auto"
                                        ? "Valve operates automatically based on soil moisture thresholds"
                                        : "Manual control - you can turn the valve On/Off manually"}
                                </p>
                            </div>

                            {/* Water Supply Toggle */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <label className="block text-sm font-medium mb-3">
                                    Water Supply Control
                                </label>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Droplets className={`w-5 h-5 ${waterSupplyOn ? 'text-green-600 animate-bounce' : 'text-gray-500'}`} />
                                        <span className="text-sm font-medium">
                                            {waterSupplyOn ? 'Water Flowing' : 'Water Stopped'}
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={waterSupplyOn}
                                        onChange={handleValveToggle}
                                        disabled={valveMode === "auto"}
                                        className={`toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800 ${valveMode === "auto" ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    {valveMode === "auto"
                                        ? "Water supply is controlled automatically based on soil moisture"
                                        : "Manually control water supply (Auto Mode must be disabled)"}
                                </p>
                            </div>

                            {/* Soil Moisture Thresholds - Always open */}
                            <div className="bg-white rounded-xl p-4 shadow-sm lg:col-span-2">
                                <label className="block text-sm font-medium mb-3">
                                    Soil Moisture Thresholds
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <label className="block text-xs text-gray-600 font-medium mb-1">
                                            Lower Limit (Valve ON) - {moistureThresholds.lower}%
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={moistureThresholds.lower}
                                            onChange={(e) => handleThresholdChange('lower', e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                                            <span>0%</span>
                                            <span className="text-blue-600 font-medium">
                                                Valve turns ON below {moistureThresholds.lower}%
                                            </span>
                                            <span>100%</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-600 font-medium mb-1">
                                            Upper Limit (Valve OFF) - {moistureThresholds.upper}%
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={moistureThresholds.upper}
                                            onChange={(e) => handleThresholdChange('upper', e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                                            <span>0%</span>
                                            <span className="text-purple-600 font-medium">
                                                Valve turns OFF above {moistureThresholds.upper}%
                                            </span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Status Indicator */}
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Gauge className="w-4 h-4" />
                                        <span className="text-sm font-medium">Current Status</span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div className="text-xs text-gray-600 font-medium">
                                                Current Avg: {averages.soil.toFixed(1)}%
                                            </div>
                                            <div className="text-xs text-gray-600 font-medium">
                                                Target: {moistureThresholds.lower}% - {moistureThresholds.upper}%
                                            </div>
                                        </div>
                                        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="bg-blue-500"
                                                style={{ width: `${moistureThresholds.lower}%` }}
                                            ></div>
                                            <div
                                                className="bg-purple-500"
                                                style={{ width: `${moistureThresholds.upper - moistureThresholds.lower}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex text-xs text-gray-600 font-medium mt-1">
                                            <span>Valve ON Zone</span>
                                            <span className="ml-auto">Optimal Zone</span>
                                            <span className="ml-auto">Valve OFF Zone</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Average Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Soil Moisture Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-amber-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl">
                                <Droplets className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${averages.soil < moistureThresholds.lower
                                ? 'bg-blue-50 text-blue-700'
                                : averages.soil > moistureThresholds.upper
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-green-50 text-green-700'
                                }`}>
                                {averages.soil < moistureThresholds.lower
                                    ? 'Low'
                                    : averages.soil > moistureThresholds.upper
                                        ? 'High'
                                        : 'Optimal'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">Avg Soil Moisture</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={averages.soil}
                                            duration={2}
                                            suffix="%"
                                            decimals={1}
                                        />
                                    ) : (
                                        <span>{averages.soil.toFixed(1)}%</span>
                                    )}
                                </span>
                                {isAdmin && (
                                    <span className="text-xs">
                                        (Target: {moistureThresholds.lower}-{moistureThresholds.upper}%)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Temperature Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-red-50 to-red-100 rounded-xl">
                                <Thermometer className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-red-50 text-red-700 rounded-full">
                                {averages.temperature > 30 ? 'High' : averages.temperature < 20 ? 'Low' : 'Optimal'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">Avg Temperature</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={averages.temperature}
                                            duration={2}
                                            suffix="°C"
                                            decimals={1}
                                        />
                                    ) : (
                                        <span>{averages.temperature.toFixed(1)}°C</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Humidity Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                                <Cloud className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {averages.humidity > 80 ? 'High' : averages.humidity < 40 ? 'Low' : 'Optimal'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">Avg Humidity</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={averages.humidity}
                                            duration={2}
                                            suffix="%"
                                            decimals={1}
                                        />
                                    ) : (
                                        <span>{averages.humidity.toFixed(1)}%</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Water Supply Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-cyan-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-cyan-50 to-cyan-100 rounded-xl">
                                <Droplets className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${waterSupplyOn ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                                {waterSupplyOn ? 'ON' : 'OFF'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">Water Supply</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${waterSupplyOn ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span className="text-xl font-bold">
                                        {waterSupplyOn ? 'Flowing' : 'Stopped'}
                                    </span>
                                </div>
                                {isAdmin && valveMode === "auto" && (
                                    <span className="ml-auto text-xs px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full border border-purple-200">
                                        Auto Mode
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* {waterSupplyOn && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"
                                            style={{ width: '75%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-cyan-600">2.4 L/s</span>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>

                {/* Sensor Grids Section */}
                {sensorData.soilMoisture.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Soil Moisture Sensors */}
                        <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between gap-3 mb-8">
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">Soil Moisture Grid</h3>
                                    <p>Real-time moisture levels across the field</p>
                                </div>
                                <div className="px-3 py-1 bg-amber-50 text-amber-800 text-sm font-medium border border-amber-300">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={sensorData.soilMoisture.length}
                                            duration={2}
                                            suffix=" Sensors"
                                        />
                                    ) : (
                                        <span>{sensorData.soilMoisture.length} Nodes</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
                                {sensorData.soilMoisture.map((sensor) => (
                                    <div
                                        key={sensor.id}
                                        className="group relative bg-linear-to-b from-white to-gray-50 rounded-xl p-4 text-center border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="absolute top-3 right-3 text-xs font-medium text-gray-700">
                                            {sensor.id}
                                        </div>
                                        <div className="text-2xl font-bold mt-4 mb-3">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={sensor.value}
                                                    duration={2}
                                                    suffix="%"
                                                    decimals={1}
                                                />
                                            ) : (
                                                <span>{sensor.value}%</span>
                                            )}
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-1000 ${sensor.value > moistureThresholds.upper
                                                    ? 'bg-red-500'
                                                    : sensor.value < moistureThresholds.lower
                                                        ? 'bg-blue-500'
                                                        : 'bg-linear-to-r from-amber-400 to-amber-600'
                                                    }`}
                                                style={{ width: `${sensor.value}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs mt-2">
                                            {sensor.value > moistureThresholds.upper
                                                ? 'High'
                                                : sensor.value < moistureThresholds.lower
                                                    ? 'Low'
                                                    : 'Optimal'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Temperature & Humidity Side */}
                        <div className="space-y-8">
                            {/* Temperature Sensors */}
                            {sensorData.temperature.length > 0 && (
                                <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between gap-3 mb-6">
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-semibold mb-2">Temperature Zones</h3>
                                            <p>Ambient temperature readings</p>
                                        </div>
                                        <div className="px-3 py-1 bg-red-50 text-red-800 text-sm font-medium border border-red-300">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={sensorData.temperature.length}
                                                    duration={2}
                                                    suffix=" Sensors"
                                                />
                                            ) : (
                                                <span>{sensorData.temperature.length} Sensors</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        {sensorData.temperature.map((sensor) => (
                                            <div
                                                key={sensor.id}
                                                className="group bg-linear-to-br from-white to-red-50 rounded-xl px-4 py-3 border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="font-medium">{sensor.id}</div>
                                                    <Thermometer className="w-5 h-5 text-red-500" />
                                                </div>
                                                <div className="text-2xl font-bold mb-2">
                                                    {isInView ? (
                                                        <CountUp
                                                            start={0}
                                                            end={sensor.value}
                                                            duration={2}
                                                            suffix="°C"
                                                            decimals={1}
                                                        />
                                                    ) : (
                                                        <span>{sensor.value.toFixed(1)}°C</span>
                                                    )}
                                                </div>
                                                <div className={`text-sm font-medium ${sensor.value > 30 ? 'text-red-600' : sensor.value < 20 ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {sensor.value > 30 ? 'Above Optimal' :
                                                        sensor.value < 20 ? 'Below Optimal' :
                                                            'Optimal'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Humidity Sensors */}
                            {sensorData.humidity.length > 0 && (
                                <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between gap-3 mb-6">
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-semibold mb-2">Humidity Levels</h3>
                                            <p>Atmospheric humidity readings</p>
                                        </div>
                                        <div className="px-3 py-1 bg-blue-50 text-blue-800 text-sm font-medium border border-blue-300">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={sensorData.humidity.length}
                                                    duration={2}
                                                    suffix=" Sensors"
                                                />
                                            ) : (
                                                <span>{sensorData.humidity.length} Sensors</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        {sensorData.humidity.map((sensor) => (
                                            <div
                                                key={sensor.id}
                                                className="group bg-linear-to-br from-white to-blue-50 rounded-xl px-4 py-3 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="font-medium">{sensor.id}</div>
                                                    <Cloud className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <div className="text-2xl font-bold mb-2">
                                                    {isInView ? (
                                                        <CountUp
                                                            start={0}
                                                            end={sensor.value}
                                                            duration={2}
                                                            suffix="%"
                                                            decimals={1}
                                                        />
                                                    ) : (
                                                        <span>{sensor.value.toFixed(1)}%</span>
                                                    )}
                                                </div>
                                                <div className={`text-sm font-medium ${sensor.value > 80 ? 'text-red-600' : sensor.value < 40 ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {sensor.value > 80 ? 'High' :
                                                        sensor.value < 40 ? 'Low' :
                                                            'Optimal'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Show message when no sensor data */}
                {!hasData && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-700">No sensor data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDetails;
