import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Thermometer, Cloud, Settings, ToggleLeft, ToggleRight, Gauge, Zap, Wind, Sun, Fan, SprayCan, TrendingUp, AlertTriangle, Check, X, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useAdmin from "../../../hooks/useAdmin";

// Custom hook for checking if element is in viewport
const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
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
    const { t } = useTranslation();

    // Admin control states
    const [valveMode, setValveMode] = useState("auto");
    const [moistureThresholds, setMoistureThresholds] = useState({
        lower: 50,
        upper: 75
    });

    const fieldName = "Field Laboratory 01 (Malta Garden)";
    const cropName = "Cucumber";
    const avgSoil = 65;
    const avgTemperature = 28;
    const avgHumidity = 72;

    // Sample sensor data
    const [soilSensors, setSoilSensors] = useState(
        Array.from({ length: 15 }, (_, i) => ({
            id: `S${i + 1}`,
            value: 60 + Math.floor(Math.random() * 20)
        }))
    );

    const tempSensors = [
        { id: 'TEMP-01', value: 27.5 },
        { id: 'TEMP-02', value: 28.5 }
    ];

    const humiditySensors = [
        { id: 'HUM-01', value: 70 },
        { id: 'HUM-02', value: 74 }
    ];

    // Simulate sensor updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSoilSensors(prev =>
                prev.map(sensor => ({
                    ...sensor,
                    value: Math.min(100, Math.max(0,
                        sensor.value + (Math.random() * 4 - 2)
                    ))
                }))
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Auto valve control logic
    useEffect(() => {
        if (valveMode === "auto") {
            const avgSoilMoisture = soilSensors.reduce((acc, sensor) => acc + sensor.value, 0) / soilSensors.length;

            if (waterSupplyOn && avgSoilMoisture >= moistureThresholds.upper) {
                setWaterSupplyOn(false);
            } else if (!waterSupplyOn && avgSoilMoisture <= moistureThresholds.lower) {
                setWaterSupplyOn(true);
            }
        }
    }, [soilSensors, valveMode, moistureThresholds, waterSupplyOn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update system status
    useEffect(() => {
        const avgSoilMoisture = soilSensors.reduce((acc, sensor) => acc + sensor.value, 0) / soilSensors.length;

        if (avgSoilMoisture < moistureThresholds.lower - 10 || avgSoilMoisture > moistureThresholds.upper + 10) {
            setSystemStatus("critical");
        } else if (avgSoilMoisture < moistureThresholds.lower || avgSoilMoisture > moistureThresholds.upper) {
            setSystemStatus("warning");
        } else {
            setSystemStatus("optimal");
        }
    }, [soilSensors, moistureThresholds]);

    // Handle threshold changes
    const handleThresholdChange = (type, value) => {
        const numValue = parseInt(value) || 0;
        const clampedValue = Math.min(100, Math.max(0, numValue));

        setMoistureThresholds(prev => ({
            ...prev,
            [type]: clampedValue
        }));
    };

    // Handle valve toggle
    const handleValveToggle = () => {
        if (valveMode === "manual") {
            setWaterSupplyOn(!waterSupplyOn);
        }
    };

    // Status Configuration - Adjusted for white background
    const statusConfig = {
        optimal: {
            bg: 'bg-green-600',
            border: 'border-green-600',
            text: 'text-green-600',
            lightBg: 'bg-green-50',
            icon: Check,
            label: 'SYSTEM NOMINAL'
        },
        warning: {
            bg: 'bg-amber-600',
            border: 'border-amber-600',
            text: 'text-amber-600',
            lightBg: 'bg-amber-50',
            icon: AlertTriangle,
            label: 'CAUTION'
        },
        critical: {
            bg: 'bg-red-600',
            border: 'border-red-600',
            text: 'text-red-600',
            lightBg: 'bg-red-50',
            icon: X,
            label: 'CRITICAL'
        }
    };

    const StatusIcon = statusConfig[systemStatus].icon;

    return (
        <div className="min-h-screen bg-white">
            {/* Light Grid Background */}
            <div className="fixed inset-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }}></div>

            <div ref={ref} className="container relative mx-auto px-4 py-16 mt-10 mb-5">
                {/* Header Section - Light Brutalist Style */}
                <div className="mb-12 border-l-4 border-green-600 pl-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-2 h-2 bg-green-600 animate-pulse"></div>
                                <span className="text-xs font-mono text-green-600 tracking-widest">ACTIVE FIELD</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2">
                                {t('cropDetails.fieldName')}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-gray-600">{t('cropDetails.cropLang')}</span>
                                    <h2 className="text-2xl lg:text-3xl font-bold">
                                        {t('cropDetails.crops')}
                                    </h2>
                                </div>
                                <div className="h-6 w-px bg-gray-200"></div>
                                {/* <div className="flex items-center gap-2">
                                    <Hexagon className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm font-mono text-amber-600">v2.4.0</span>
                                </div> */}
                            </div>
                        </div>

                        {/* System Status - Light Industrial Display */}
                        <div className={`flex items-center gap-4 px-6 py-4 bg-white border-2 ${statusConfig[systemStatus].border} shadow-sm`}>
                            <div className={`w-3 h-3 ${statusConfig[systemStatus].bg} rounded-full`}></div>
                            <div>
                                <div className={`text-sm font-mono ${statusConfig[systemStatus].text} mb-1`}>
                                    {t('cropDetails.systemStatus')}
                                </div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    <StatusIcon className={`w-5 h-5 ${statusConfig[systemStatus].text}`} />
                                    {t('cropDetails.systemOptimal')}
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className={`w-1 h-8 ${statusConfig[systemStatus].bg} opacity-${(i + 1) * 30}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Controls - Light Industrial Control Panel */}
                {isAdmin && (
                    <div className="mb-8 border-2 border-gray-200 bg-white shadow-sm">
                        {/* Panel Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200">
                            <div className="flex items-center gap-3">
                                <Settings className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-mono">CONTROL PANEL // ADMIN</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-600 animate-pulse"></div>
                                <span className="text-xs font-mono">ACTIVE</span>
                            </div>
                        </div>

                        {/* Panel Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                {/* Valve Mode Control - Toggle Switches */}
                                <div className="lg:col-span-2">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Zap className="w-4 h-4 text-green-600" />
                                        <span className="text-xs font-mono">VALVE CONTROL // MODE SELECT</span>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                        <button
                                            onClick={() => setValveMode("auto")}
                                            className={`relative p-5 border-2 transition-all cursor-pointer ${valveMode === "auto"
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                }`}
                                        >
                                            <ToggleRight className={`w-8 h-8 mb-3 ${valveMode === "auto" ? "text-green-600" : "text-gray-400"}`} />
                                            <div className={`text-lg font-bold ${valveMode === "auto" ? "text-gray-900" : "text-gray-500"}`}>
                                                AUTO
                                            </div>
                                            <div className="text-xs font-mono text-gray-500 mt-1">
                                                AUTOMATIC SEQUENCE
                                            </div>
                                            {valveMode === "auto" && (
                                                <div className="absolute top-2 right-2 w-2 h-2 bg-green-600 animate-pulse"></div>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => setValveMode("manual")}
                                            className={`relative p-6 border-2 transition-all cursor-pointer ${valveMode === "manual"
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                }`}
                                        >
                                            <ToggleLeft className={`w-8 h-8 mb-3 ${valveMode === "manual" ? "text-green-600" : "text-gray-400"}`} />
                                            <div className={`text-lg font-bold ${valveMode === "manual" ? "text-gray-900" : "text-gray-500"}`}>
                                                MANUAL
                                            </div>
                                            <div className="text-xs font-mono text-gray-500 mt-1">
                                                DIRECT CONTROL
                                            </div>
                                            {valveMode === "manual" && (
                                                <div className="absolute top-2 right-2 w-2 h-2 bg-green-600 animate-pulse"></div>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Soil Moisture Thresholds - Always Visible */}
                                <div className="lg:col-span-3">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Gauge className="w-4 h-4 text-green-600" />
                                        <span className="text-xs font-mono">MOISTURE THRESHOLDS</span>
                                    </div>

                                    <div className="space-y-6 border-2 border-gray-200 p-6 bg-white">
                                        {/* Lower Limit */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-mono">LOWER LIMIT (VALVE ON)</span>
                                                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 border border-blue-200">
                                                    {moistureThresholds.lower}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={moistureThresholds.lower}
                                                onChange={(e) => handleThresholdChange('lower', e.target.value)}
                                                className="w-full h-1 bg-gray-200 appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${moistureThresholds.lower}%, #e5e7eb ${moistureThresholds.lower}%, #e5e7eb 100%)`
                                                }}
                                            />
                                        </div>

                                        {/* Upper Limit */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-mono">UPPER LIMIT (VALVE OFF)</span>
                                                <span className="text-sm font-mono text-green-600 bg-green-50 px-3 py-1 border border-green-200">
                                                    {moistureThresholds.upper}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={moistureThresholds.upper}
                                                onChange={(e) => handleThresholdChange('upper', e.target.value)}
                                                className="w-full h-1 bg-gray-200 appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #059669 0%, #059669 ${moistureThresholds.upper}%, #e5e7eb ${moistureThresholds.upper}%, #e5e7eb 100%)`
                                                }}
                                            />
                                        </div>

                                        {/* Range Visualization */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-2 mb-3">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-xs font-mono">RANGE VISUALIZATION</span>
                                            </div>
                                            <div className="relative h-8 bg-gray-100 border border-gray-200">
                                                <div
                                                    className="absolute h-full bg-blue-100"
                                                    style={{ width: `${moistureThresholds.lower}%` }}
                                                >
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-blue-700">ON</span>
                                                </div>
                                                <div
                                                    className="absolute h-full bg-green-100"
                                                    style={{
                                                        left: `${moistureThresholds.lower}%`,
                                                        width: `${moistureThresholds.upper - moistureThresholds.lower}%`
                                                    }}
                                                >
                                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-green-700">OPT</span>
                                                </div>
                                                <div
                                                    className="absolute h-full bg-purple-100"
                                                    style={{ left: `${moistureThresholds.upper}%`, width: `${100 - moistureThresholds.upper}%` }}
                                                >
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-purple-700">OFF</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Average Metrics Section - Light Industrial Gauges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Soil Moisture */}
                    <div className="border-2 border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Square className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-mono">MOISTURE</span>
                            </div>
                            <div className={`px-2 py-1 border ${avgSoil < moistureThresholds.lower
                                ? 'border-blue-600 text-blue-600 bg-blue-50'
                                : avgSoil > moistureThresholds.upper
                                    ? 'border-red-600 text-red-600 bg-red-50'
                                    : 'border-green-600 text-green-600 bg-green-50'
                                } text-xs font-mono`}>
                                {avgSoil < moistureThresholds.lower
                                    ? 'LOW'
                                    : avgSoil > moistureThresholds.upper
                                        ? 'HIGH'
                                        : 'OPT'}
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-4xl font-black">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={avgSoil}
                                        duration={2}
                                        suffix="%"
                                    />
                                ) : "0%"}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-gray-200">
                            <div
                                className={`h-1 transition-all duration-500 ${avgSoil < moistureThresholds.lower
                                    ? 'bg-blue-600'
                                    : avgSoil > moistureThresholds.upper
                                        ? 'bg-red-600'
                                        : 'bg-green-600'
                                    }`}
                                style={{ width: `${avgSoil}%` }}
                            ></div>
                        </div>

                        {/* {isAdmin && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <span className="text-xs font-mono text-gray-500">
                                    TARGET: {moistureThresholds.lower}% - {moistureThresholds.upper}%
                                </span>
                            </div>
                        )} */}
                    </div>

                    {/* Temperature */}
                    <div className="border-2 border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Square className="w-4 h-4 text-red-600" />
                                <span className="text-xs font-mono">TEMP</span>
                            </div>
                            <div className="px-2 py-1 border border-green-600 text-green-600 bg-green-50 text-xs font-mono">
                                OPT
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-4xl font-black">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={avgTemperature}
                                        duration={2}
                                        suffix="°C"
                                    />
                                ) : "0°C"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-amber-600" />
                            <div className="text-xs font-mono">STABLE</div>
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className="border-2 border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Square className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-mono">HUMIDITY</span>
                            </div>
                            <div className="px-2 py-1 border border-green-600 text-green-600 bg-green-50 text-xs font-mono">
                                OPT
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-4xl font-black">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={avgHumidity}
                                        duration={2}
                                        suffix="%"
                                    />
                                ) : "0%"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4 text-blue-600" />
                            <div className="text-xs font-mono">ATMOSPHERIC</div>
                        </div>
                    </div>

                    {/* Water Supply */}
                    <div className="border-2 border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Square className="w-4 h-4 text-cyan-600" />
                                <span className="text-xs font-mono">VALVE</span>
                            </div>
                            <div className={`px-2 py-1 border ${waterSupplyOn ? 'border-green-600 text-green-600 bg-green-50' : 'border-gray-300 text-gray-500 bg-gray-50'
                                } text-xs font-mono`}>
                                {waterSupplyOn ? 'OPEN' : 'CLOSED'}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${waterSupplyOn ? 'bg-green-600 animate-pulse' : 'bg-gray-300'}`}></div>
                                <span className="text-2xl font-bold">
                                    {waterSupplyOn ? 'FLOWING' : 'STOPPED'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            {isAdmin && valveMode === "manual" && (
                                <button
                                    onClick={handleValveToggle}
                                    className={`px-4 py-2 text-xs font-mono border transition-colors ${waterSupplyOn
                                        ? 'border-red-600 text-red-600 hover:bg-red-50'
                                        : 'border-green-600 text-green-600 hover:bg-green-50'
                                        }`}
                                >
                                    {waterSupplyOn ? 'CLOSE VALVE' : 'OPEN VALVE'}
                                </button>
                            )}

                            {isAdmin && valveMode === "auto" && (
                                <div className="flex items-center gap-2 px-4 py-2 border border-green-600/30 text-green-600 bg-green-50 text-xs font-mono">
                                    <Zap className="w-3 h-3" />
                                    AUTO MODE
                                </div>
                            )}

                            {waterSupplyOn && (
                                <span className="text-xs font-mono text-blue-600">2.4 L/s</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sensor Grids Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Soil Moisture Sensors - Grid Display */}
                    <div className="border-2 border-gray-200 bg-white shadow-sm">
                        {/* Section Header */}
                        <div className="flex items-center justify-between gap-2 px-6 py-4 border-b-2 border-gray-200">
                            <div className="flex items-center gap-3">
                                <SprayCan className="w-5 h-5 text-amber-600" />
                                <div>
                                    <h3 className="text-lg font-bold">{t('cropDetails.soilMoistureGrid')}</h3>
                                    <p className="text-sm font-mono text-gray-700">{t('cropDetails.moistureLevels')}</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 border border-amber-700 text-amber-700 bg-amber-50 text-sm font-mono">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={15}
                                        duration={2}
                                        suffix={` NODES`}
                                    />
                                ) : `0 NODES`}
                            </div>
                        </div>

                        {/* Sensor Grid */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {soilSensors.map((sensor) => (
                                    <div
                                        key={sensor.id}
                                        className={`border-2 p-4 text-center transition-all ${sensor.value > moistureThresholds.upper
                                            ? 'border-red-600 bg-red-50'
                                            : sensor.value < moistureThresholds.lower
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-green-600 bg-green-50'
                                            }`}
                                    >
                                        <div className="text-xs font-mono mb-2">{sensor.id}</div>
                                        <div className="text-2xl font-bold mb-2">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={Math.round(sensor.value)}
                                                    duration={2}
                                                    suffix="%"
                                                />
                                            ) : "0%"}
                                        </div>
                                        <div className="w-full h-1 bg-gray-200">
                                            <div
                                                className={`h-1 transition-all duration-500 ${sensor.value > moistureThresholds.upper
                                                    ? 'bg-red-600'
                                                    : sensor.value < moistureThresholds.lower
                                                        ? 'bg-blue-600'
                                                        : 'bg-green-600'
                                                    }`}
                                                style={{ width: isInView ? `${sensor.value}%` : "0%" }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Temperature & Humidity Side */}
                    <div className="space-y-8">
                        {/* Temperature Sensors */}
                        <div className="border-2 border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between gap-2 px-6 py-4 border-b-2 border-gray-200">
                                <div className="flex items-center gap-3">
                                    <Thermometer className="w-5 h-5 text-red-600" />
                                    <div>
                                        <h3 className="text-lg font-bold">{t('cropDetails.temperatureZones')}</h3>
                                        <p className="text-sm font-mono text-gray-700">{t('cropDetails.ambientTemp')}</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 border border-red-600 text-red-600 bg-red-50 text-sm font-mono">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={2}
                                            duration={2}
                                            suffix={` SENSORS`}
                                        />
                                    ) : `0 SENSORS`}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tempSensors.map((sensor) => (
                                        <div
                                            key={sensor.id}
                                            className="border-2 border-red-200 bg-red-50/50 p-6"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-mono">{sensor.id}</span>
                                                <Fan className="w-4 h-4 text-red-600" />
                                            </div>
                                            <div className="text-4xl font-bold mb-2">
                                                {isInView ? (
                                                    <CountUp
                                                        start={0}
                                                        end={sensor.value}
                                                        duration={2}
                                                        suffix="°C"
                                                        decimals={1}
                                                    />
                                                ) : "0°C"}
                                            </div>
                                            <div className={`text-xs font-mono ${sensor.value > 30 ? 'text-red-600' : sensor.value < 20 ? 'text-blue-600' : 'text-green-600'
                                                }`}>
                                                {sensor.value > 30
                                                    ? `> ${t('cropDetails.optimalRange')}`
                                                    : sensor.value < 20
                                                        ? `< ${t('cropDetails.optimalRange')}`
                                                        : t('cropDetails.withinRange')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Humidity Sensors */}
                        <div className="border-2 border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between gap-2 px-6 py-4 border-b-2 border-gray-200">
                                <div className="flex items-center gap-3">
                                    <Cloud className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <h3 className="text-lg font-bold">{t('cropDetails.humidityLevels')}</h3>
                                        <p className="text-sm font-mono text-gray-700">{t('cropDetails.atmosphericHumidity')}</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 border border-blue-600 text-blue-600 bg-blue-50 text-sm font-mono">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={2}
                                            duration={2}
                                            suffix={` SENSORS`}
                                        />
                                    ) : `0 SENSORS`}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {humiditySensors.map((sensor) => (
                                        <div
                                            key={sensor.id}
                                            className="border-2 border-blue-200 bg-blue-50/50 p-6"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-mono">{sensor.id}</span>
                                                <Wind className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="text-4xl font-bold mb-2">
                                                {isInView ? (
                                                    <CountUp
                                                        start={0}
                                                        end={sensor.value}
                                                        duration={2}
                                                        suffix="%"
                                                    />
                                                ) : "0%"}
                                            </div>
                                            <div className={`text-xs font-mono ${sensor.value > 80 ? 'text-red-600' : sensor.value < 40 ? 'text-blue-600' : 'text-green-600'
                                                }`}>
                                                {sensor.value > 80
                                                    ? `> ${t('cropDetails.highHumidity')}`
                                                    : sensor.value < 40
                                                        ? `< ${t('cropDetails.lowHumidity')}`
                                                        : t('cropDetails.optimalRange')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
