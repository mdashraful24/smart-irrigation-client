import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Droplets, Thermometer, Cloud, Activity, Settings, ToggleLeft, ToggleRight, Gauge, Save, Power, AlertCircle, CheckCircle, Info } from 'lucide-react';
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
    const [thresholdLoading, setThresholdLoading] = useState(true);
    const [valveLoading, setValveLoading] = useState(true);
    const [savingThreshold, setSavingThreshold] = useState(false);
    const [savingValve, setSavingValve] = useState(false);
    const [error, setError] = useState(null);
    const [thresholdError, setThresholdError] = useState(null);
    const [valveError, setValveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(null);
    const [valveSaveSuccess, setValveSaveSuccess] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [thresholdLastUpdated, setThresholdLastUpdated] = useState(null);
    const [valveLastUpdated, setValveLastUpdated] = useState(null);

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
        lower: 30,
        upper: 90
    });

    // Track original thresholds for save button state
    const [originalThresholds, setOriginalThresholds] = useState({
        lower: 30,
        upper: 90
    });

    const fieldName = "Field Laboratory 01 (Malta Garden)";
    const cropName = "Cucumber";

    // Save valve mode to API (Auto/Manual)
    const saveValveMode = async (newValveMode) => {
        try {
            setSavingValve(true);
            setValveSaveSuccess(null);

            // Convert "auto" to 1, "manual" to 0
            const valveModeValue = newValveMode === "auto" ? 1 : 0;
            const url = `/api/insert_valve.php?valve=${valveModeValue}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            setValveSaveSuccess(`Valve mode set to ${newValveMode}! ID: ${result.inserted_id}`);

            // Update local state
            setValveMode(newValveMode);

            // Refresh valve mode data after saving
            setTimeout(() => {
                fetchValveModeData();
            }, 1000);

        } catch (err) {
            console.error('Error saving valve mode:', err);
            setValveSaveSuccess(null);
            alert('Failed to save valve mode: ' + err.message);
        } finally {
            setSavingValve(false);
        }
    };

    // Save water supply state to API
    const saveWaterSupplyState = async (newWaterSupplyState) => {
        try {
            setSavingValve(true);
            setValveSaveSuccess(null);

            // You'll need a different API endpoint for water supply control
            // This is a placeholder - replace with your actual water supply API
            const waterSupplyValue = newWaterSupplyState ? 1 : 0;
            const url = `/api/insert_water_supply.php?state=${waterSupplyValue}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            setValveSaveSuccess(`Water supply ${newWaterSupplyState ? 'ON' : 'OFF'}!`);

            // Update local state
            setWaterSupplyOn(newWaterSupplyState);

            // Refresh water supply data after saving
            setTimeout(() => {
                fetchWaterSupplyData();
            }, 1000);

        } catch (err) {
            console.error('Error saving water supply state:', err);
            setValveSaveSuccess(null);
            alert('Failed to save water supply state: ' + err.message);
        } finally {
            setSavingValve(false);
        }
    };

    // Save threshold data to API
    const saveThresholdData = async () => {
        try {
            setSavingThreshold(true);
            setSaveSuccess(null);

            const url = `/api/insert_threshold.php?low=${moistureThresholds.lower}&up=${moistureThresholds.upper}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            setSaveSuccess(`Thresholds saved successfully! ID: ${result.inserted_id}`);

            // Update original thresholds after successful save
            setOriginalThresholds({
                lower: moistureThresholds.lower,
                upper: moistureThresholds.upper
            });

            // Refresh threshold data after saving
            setTimeout(() => {
                fetchThresholdData();
            }, 1000);

        } catch (err) {
            console.error('Error saving threshold data:', err);
            setSaveSuccess(null);
            alert('Failed to save threshold data: ' + err.message);
        } finally {
            setSavingThreshold(false);
        }
    };

    // Fetch valve mode data from API (Auto/Manual)
    const fetchValveModeData = async () => {
        try {
            setValveLoading(true);

            const response = await fetch('/api/latest_valve.php');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            if (!result.data) {
                setValveError('No valve mode data available');
                return;
            }

            const data = result.data;

            // Update valve mode (1 = AUTO, 0 = MANUAL)
            setValveMode(data.valve === 1 ? "auto" : "manual");
            setValveLastUpdated(data.time);
            setValveError(null);

        } catch (err) {
            console.error('Error fetching valve mode data:', err);
            setValveError('Failed to load valve mode data.');
        } finally {
            setValveLoading(false);
        }
    };

    // Fetch water supply data from API
    const fetchWaterSupplyData = async () => {
        try {
            // This is a placeholder - implement your actual water supply API endpoint
            const response = await fetch('/api/latest_water_supply.php');

            if (!response.ok) {
                // If endpoint doesn't exist, don't show error, just keep current state
                return;
            }

            const result = await response.json();

            if (!result.ok || !result.data) {
                return;
            }

            const data = result.data;
            setWaterSupplyOn(data.state === 1);

        } catch (err) {
            // Silently fail - water supply might be controlled by valve mode
            console.log('Water supply API not available, using valve mode logic');
        }
    };

    // Fetch threshold data from API
    const fetchThresholdData = async () => {
        try {
            setThresholdLoading(true);

            const response = await fetch('/api/latest_threshold.php');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            if (!result.data) {
                setThresholdError('No threshold data available');
                return;
            }

            const data = result.data;

            const newLower = parseFloat(data.low) || 30;
            const newUpper = parseFloat(data.up) || 90;

            // Update threshold values
            setMoistureThresholds({
                lower: newLower,
                upper: newUpper
            });

            // Update original thresholds
            setOriginalThresholds({
                lower: newLower,
                upper: newUpper
            });

            setThresholdLastUpdated(data.time);
            setThresholdError(null);

        } catch (err) {
            console.error('Error fetching threshold data:', err);
            setThresholdError('Failed to load threshold data.');
        } finally {
            setThresholdLoading(false);
        }
    };

    // Fetch sensor data from API
    const fetchSensorData = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/latest_sis_sn_01.php');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.ok) {
                throw new Error(result.error || 'API returned error');
            }

            if (!result.data) {
                setError('No sensor data available');
                return;
            }

            const data = result.data;

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
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and polling setup
    useEffect(() => {
        // Fetch all data
        fetchSensorData();
        fetchThresholdData();
        fetchValveModeData();
        fetchWaterSupplyData();

        // Poll for new data
        const sensorInterval = setInterval(fetchSensorData, 30000);
        const thresholdInterval = setInterval(fetchThresholdData, 60000);
        const valveModeInterval = setInterval(fetchValveModeData, 30000);
        const waterSupplyInterval = setInterval(fetchWaterSupplyData, 5000);

        return () => {
            clearInterval(sensorInterval);
            clearInterval(thresholdInterval);
            clearInterval(valveModeInterval);
            clearInterval(waterSupplyInterval);
        };
    }, []);

    // Auto valve control logic
    useEffect(() => {
        if (valveMode === "auto" && averages.soil > 0) {
            if (waterSupplyOn && averages.soil >= moistureThresholds.upper) {
                // Auto turn OFF - call water supply API
                saveWaterSupplyState(false);
            } else if (!waterSupplyOn && averages.soil <= moistureThresholds.lower) {
                // Auto turn ON - call water supply API
                saveWaterSupplyState(true);
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

    // Handle valve mode toggle
    const handleValveModeToggle = () => {
        const newMode = valveMode === "auto" ? "manual" : "auto";
        saveValveMode(newMode);
    };

    // Handle water supply toggle with manual mode check
    const handleWaterSupplyToggle = () => {
        if (valveMode === "manual") {
            saveWaterSupplyState(!waterSupplyOn);
        }
    };

    // Format last updated time
    const formatLastUpdated = (datetime) => {
        if (!datetime) return 'N/A';
        const date = new Date(datetime);
        return date.toLocaleString();
    };

    // Check if thresholds have changed
    const hasThresholdsChanged = () => {
        return moistureThresholds.lower !== originalThresholds.lower ||
            moistureThresholds.upper !== originalThresholds.upper;
    };

    // Status Configuration
    const statusConfig = {
        optimal: {
            color: 'bg-green-50 text-green-700 border-green-300',
            dot: 'bg-green-500',
            text: 'Optimal',
            icon: CheckCircle,
            bgGradient: 'from-green-50 to-emerald-50'
        },
        warning: {
            color: 'bg-yellow-50 text-yellow-700 border-yellow-400',
            dot: 'bg-yellow-500',
            text: 'Warning',
            icon: AlertCircle,
            bgGradient: 'from-yellow-50 to-amber-50'
        },
        critical: {
            color: 'bg-red-50 text-red-700 border-red-300',
            dot: 'bg-red-500',
            text: 'Critical',
            icon: AlertCircle,
            bgGradient: 'from-red-50 to-rose-50'
        }
    };

    const config = statusConfig[systemStatus];
    const StatusIcon = config.icon;

    // Check if we have data to display
    const hasData = sensorData.soilMoisture.length > 0 || averages.soil > 0;

    // Calculate moisture status
    const getMoistureStatus = () => {
        if (averages.soil < moistureThresholds.lower) return 'low';
        if (averages.soil > moistureThresholds.upper) return 'high';
        return 'optimal';
    };

    const moistureStatus = getMoistureStatus();

    const moistureStatusConfig = {
        low: {
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: Droplets,
            message: 'Soil is dry. Irrigation recommended.',
            action: 'Turn ON'
        },
        optimal: {
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200',
            icon: CheckCircle,
            message: 'Soil moisture is optimal.',
            action: 'Maintain'
        },
        high: {
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: AlertCircle,
            message: 'Soil is saturated. Irrigation should be OFF.',
            action: 'Turn OFF'
        }
    };

    const MoistureStatusIcon = moistureStatusConfig[moistureStatus].icon;

    return (
        <div className="min-h-screen">
            <div ref={ref} className="container mx-auto px-4 py-16 mt-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 mb-6">
                    {/* Header Section */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
                            {fieldName}
                        </h1>
                        <p className="text-2xl lg:text-3xl font-semibold mb-4">
                            {cropName}
                        </p>
                        {/* Last Updated Info */}
                        {lastUpdated && (
                            <p className="text-xs">
                                <span className="font-medium">Last Updated (Sensor data):</span> {formatLastUpdated(lastUpdated)}
                            </p>
                        )}
                        {thresholdLastUpdated && (
                            <p className="text-xs mt-1">
                                <span className="font-medium">Last Updated (Thresholds):</span> {formatLastUpdated(thresholdLastUpdated)}
                            </p>
                        )}
                        {valveLastUpdated && (
                            <p className="text-xs mt-1">
                                <span className="font-medium">Last Updated (Valve mode):</span> {formatLastUpdated(valveLastUpdated)}
                            </p>
                        )}
                        {error && (
                            <p className="text-xs text-red-500 mt-2">
                                {error}
                            </p>
                        )}
                        {thresholdError && (
                            <p className="text-xs text-red-500 mt-1">
                                {thresholdError}
                            </p>
                        )}
                        {valveError && (
                            <p className="text-xs text-red-500 mt-1">
                                {valveError}
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
                    <div className="mb-8 bg-linear-to-r from-indigo-50 to-gray-50 rounded-2xl p-4 border border-gray-200 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold">Admin Controls</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                        onChange={handleValveModeToggle}
                                        disabled={savingValve}
                                        className={`toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800 ${savingValve ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    {valveMode === "auto"
                                        ? "Valve operates automatically based on soil moisture thresholds"
                                        : "Manual control - you can turn the water supply On/Off manually"}
                                </p>
                            </div>

                            {/* Water Supply Toggle with Save Button */}
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
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={waterSupplyOn}
                                            onChange={handleWaterSupplyToggle}
                                            disabled={valveMode === "auto" || savingValve}
                                            className={`toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800 ${(valveMode === "auto" || savingValve) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {/* {savingValve && (
                                            <span className="text-xs text-red-600 flex items-center gap-1 ml-2">
                                                <span className="animate-spin h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full"></span>
                                                Saving...
                                            </span>
                                        )} */}
                                    </div>
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    {valveMode === "auto"
                                        ? "Water supply is controlled automatically based on soil moisture"
                                        : "Manually control water supply (Auto Mode must be disabled)"}
                                </p>
                            </div>

                            {/* Soil Moisture Thresholds - REDESIGNED SECTION */}
                            <div className="bg-white rounded-xl p-4 shadow-sm lg:col-span-2 border border-gray-200">
                                {/* Header with Save Button */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="hidden md:block p-2 bg-blue-50 rounded-lg">
                                            <Gauge className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm md:text-base font-semibold">Soil Moisture Thresholds</h4>
                                            <p className="text-xs mt-0.5">Configure automatic irrigation limits</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={saveThresholdData}
                                        disabled={savingThreshold || !hasThresholdsChanged()}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[0.9rem] md:text-sm font-medium transition-all duration-300
                                            ${savingThreshold || !hasThresholdsChanged()
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl cursor-pointer'
                                            }`}
                                    >
                                        <Save className="hidden md:block w-4 h-4" />
                                        {savingThreshold ? (
                                            "Saving..."
                                        ) : (
                                            <>
                                                <span className="md:hidden">Save</span>
                                                <span className="hidden md:inline">Save Changes</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Threshold Sliders */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
                                    {/* Lower Limit Card */}
                                    <div className="bg-gray-50 rounded-lg px-2 md:px-4 py-2 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <span className="text-sm font-medium">Lower Limit</span>
                                                <p className="text-xs mt-0.5">Irrigation turns ON below this level</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="px-2 py-1.5 bg-blue-100 rounded-lg">
                                                    <span className="text-[1rem] font-bold text-blue-700">{moistureThresholds.lower}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={moistureThresholds.lower}
                                                onChange={(e) => handleThresholdChange('lower', e.target.value)}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>0%</span>
                                                <span className="text-blue-600 font-medium">ON below {moistureThresholds.lower}%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upper Limit Card */}
                                    <div className="bg-gray-50 rounded-lg px-2 md:px-4 py-2 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <span className="text-sm font-medium">Upper Limit</span>
                                                <p className="text-xs mt-0.5">Irrigation turns OFF above this level</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="px-2 py-1.5 bg-blue-100 rounded-lg">
                                                    <span className="text-[1rem] font-bold text-blue-700">{moistureThresholds.upper}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={moistureThresholds.upper}
                                                onChange={(e) => handleThresholdChange('upper', e.target.value)}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>0%</span>
                                                <span className="text-blue-600 font-medium">OFF above {moistureThresholds.upper}%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Status Dashboard - COMPLETELY REDESIGNED */}
                                <div className={`rounded-xl p-3 lg:p-4 border-2 ${moistureStatusConfig[moistureStatus].border} ${moistureStatusConfig[moistureStatus].bg}`}>
                                    {/* Status Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`hidden md:block p-2 rounded-lg ${moistureStatus === 'low' ? 'bg-blue-100' : moistureStatus === 'high' ? 'bg-red-100' : 'bg-green-100'}`}>
                                                <MoistureStatusIcon className={`w-5 h-5 ${moistureStatusConfig[moistureStatus].color}`} />
                                            </div>
                                            <div>
                                                <h5 className="text-sm md:text-base font-semibold">Moisture Status</h5>
                                                <p className="text-xs mt-0.5">Real-time analysis</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1.5 rounded-full ${moistureStatus === 'low' ? 'bg-blue-100 text-blue-700' : moistureStatus === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} font-medium text-sm`}>
                                            {moistureStatus === 'low' ? 'Below Range' : moistureStatus === 'high' ? 'Above Range' : 'Within Range'}
                                        </div>
                                    </div>

                                    {/* Main Metrics Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Current Value Card */}
                                        <div className="bg-white rounded-lg px-2 md:px-3 py-2.5 shadow-sm">
                                            <span className="text-xs block mb-1">Current Moisture</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold">{averages.soil.toFixed(1)}</span>
                                                <span className="text-sm">%</span>
                                            </div>
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${moistureStatus === 'low' ? 'bg-blue-500' :
                                                        moistureStatus === 'high' ? 'bg-red-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${averages.soil}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Target Range Card */}
                                        <div className="bg-white rounded-lg px-2 md:px-3 py-2.5 shadow-sm">
                                            <span className="text-xs block mb-1">Target Range</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg font-bold">{moistureThresholds.lower}%</span>
                                                <span className="text-sm">to</span>
                                                <span className="text-lg font-bold">{moistureThresholds.upper}%</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-xs">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    Dry Zone (Below {moistureThresholds.lower}%)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Recommended Action Card */}
                                        <div className={`rounded-lg px-2 md:px-3 py-2.5 shadow-sm ${moistureStatus === 'low' ? 'bg-blue-50' :
                                            moistureStatus === 'high' ? 'bg-red-50' : 'bg-green-50'
                                            }`}>
                                            <span className="text-xs block mb-1">Recommended Action</span>
                                            <div className="flex items-center gap-2">
                                                <Power className={`w-4 h-4 ${moistureStatus === 'low' ? 'text-blue-600' :
                                                    moistureStatus === 'high' ? 'text-red-600' : 'text-green-700'
                                                    }`} />
                                                <span className="font-medium">
                                                    {moistureStatus === 'low' ? 'Start Irrigation' :
                                                        moistureStatus === 'high' ? 'Stop Irrigation' : 'Maintain Current'}
                                                </span>
                                            </div>
                                            <p className="text-xs mt-1">
                                                {moistureStatusConfig[moistureStatus].message}
                                            </p>
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
                        <p className="text-lg">No sensor data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDetails;







// Another Design
// import { useEffect, useState, useRef } from "react";
// import CountUp from "react-countup";
// import { Droplets, Thermometer, Cloud, Activity, Settings, ToggleLeft, ToggleRight, Gauge, Save, Power } from 'lucide-react';
// import useAdmin from "../../../hooks/useAdmin";

// // Custom hook for checking if element is in viewport
// const useInView = () => {
//     const [isInView, setIsInView] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         // Set isInView to true immediately to show data
//         setIsInView(true);

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsInView(true);
//                     observer.unobserve(entry.target);
//                 }
//             },
//             {
//                 threshold: 0.1,
//                 rootMargin: "0px 0px -100px 0px"
//             }
//         );

//         const currentRef = ref.current;
//         if (currentRef) {
//             observer.observe(currentRef);
//         }

//         return () => {
//             if (currentRef) {
//                 observer.unobserve(currentRef);
//             }
//         };
//     }, []);

//     return [ref, isInView];
// };

// const CropDetails = () => {
//     const { isAdmin } = useAdmin();
//     const [waterSupplyOn, setWaterSupplyOn] = useState(false);
//     const [systemStatus, setSystemStatus] = useState("optimal");
//     const [ref, isInView] = useInView();
//     const [loading, setLoading] = useState(true);
//     const [thresholdLoading, setThresholdLoading] = useState(true);
//     const [valveLoading, setValveLoading] = useState(true);
//     const [savingThreshold, setSavingThreshold] = useState(false);
//     const [savingValve, setSavingValve] = useState(false);
//     const [error, setError] = useState(null);
//     const [thresholdError, setThresholdError] = useState(null);
//     const [valveError, setValveError] = useState(null);
//     const [saveSuccess, setSaveSuccess] = useState(null);
//     const [valveSaveSuccess, setValveSaveSuccess] = useState(null);
//     const [lastUpdated, setLastUpdated] = useState(null);
//     const [thresholdLastUpdated, setThresholdLastUpdated] = useState(null);
//     const [valveLastUpdated, setValveLastUpdated] = useState(null);

//     // Sensor data states
//     const [sensorData, setSensorData] = useState({
//         soilMoisture: [],
//         temperature: [],
//         humidity: []
//     });

//     // Average values
//     const [averages, setAverages] = useState({
//         soil: 0,
//         temperature: 0,
//         humidity: 0
//     });

//     // Admin control states
//     const [valveMode, setValveMode] = useState("auto");
//     const [moistureThresholds, setMoistureThresholds] = useState({
//         lower: 30,
//         upper: 90
//     });

//     // Track original thresholds for save button state
//     const [originalThresholds, setOriginalThresholds] = useState({
//         lower: 30,
//         upper: 90
//     });

//     const fieldName = "Field Laboratory 01 (Malta Garden)";
//     const cropName = "Cucumber";

//     // Save valve mode to API (Auto/Manual)
//     const saveValveMode = async (newValveMode) => {
//         try {
//             setSavingValve(true);
//             setValveSaveSuccess(null);

//             // Convert "auto" to 1, "manual" to 0
//             const valveModeValue = newValveMode === "auto" ? 1 : 0;
//             const url = `/api/insert_valve.php?valve=${valveModeValue}`;

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             setValveSaveSuccess(`Valve mode set to ${newValveMode}! ID: ${result.inserted_id}`);

//             // Update local state
//             setValveMode(newValveMode);

//             // Refresh valve mode data after saving
//             setTimeout(() => {
//                 fetchValveModeData();
//             }, 1000);

//         } catch (err) {
//             console.error('Error saving valve mode:', err);
//             setValveSaveSuccess(null);
//             alert('Failed to save valve mode: ' + err.message);
//         } finally {
//             setSavingValve(false);
//         }
//     };

//     // Save water supply state to API
//     const saveWaterSupplyState = async (newWaterSupplyState) => {
//         try {
//             setSavingValve(true);
//             setValveSaveSuccess(null);

//             // You'll need a different API endpoint for water supply control
//             // This is a placeholder - replace with your actual water supply API
//             const waterSupplyValue = newWaterSupplyState ? 1 : 0;
//             const url = `/api/insert_water_supply.php?state=${waterSupplyValue}`;

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             setValveSaveSuccess(`Water supply ${newWaterSupplyState ? 'ON' : 'OFF'}!`);

//             // Update local state
//             setWaterSupplyOn(newWaterSupplyState);

//             // Refresh water supply data after saving
//             setTimeout(() => {
//                 fetchWaterSupplyData();
//             }, 1000);

//         } catch (err) {
//             console.error('Error saving water supply state:', err);
//             setValveSaveSuccess(null);
//             alert('Failed to save water supply state: ' + err.message);
//         } finally {
//             setSavingValve(false);
//         }
//     };

//     // Save threshold data to API
//     const saveThresholdData = async () => {
//         try {
//             setSavingThreshold(true);
//             setSaveSuccess(null);

//             const url = `/api/insert_threshold.php?low=${moistureThresholds.lower}&up=${moistureThresholds.upper}`;

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             setSaveSuccess(`Thresholds saved successfully! ID: ${result.inserted_id}`);

//             // Update original thresholds after successful save
//             setOriginalThresholds({
//                 lower: moistureThresholds.lower,
//                 upper: moistureThresholds.upper
//             });

//             // Refresh threshold data after saving
//             setTimeout(() => {
//                 fetchThresholdData();
//             }, 1000);

//         } catch (err) {
//             console.error('Error saving threshold data:', err);
//             setSaveSuccess(null);
//             alert('Failed to save threshold data: ' + err.message);
//         } finally {
//             setSavingThreshold(false);
//         }
//     };

//     // Fetch valve mode data from API (Auto/Manual)
//     const fetchValveModeData = async () => {
//         try {
//             setValveLoading(true);

//             const response = await fetch('/api/latest_valve.php');

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             if (!result.data) {
//                 setValveError('No valve mode data available');
//                 return;
//             }

//             const data = result.data;

//             // Update valve mode (1 = AUTO, 0 = MANUAL)
//             setValveMode(data.valve === 1 ? "auto" : "manual");
//             setValveLastUpdated(data.time);
//             setValveError(null);

//         } catch (err) {
//             console.error('Error fetching valve mode data:', err);
//             setValveError('Failed to load valve mode data.');
//         } finally {
//             setValveLoading(false);
//         }
//     };

//     // Fetch water supply data from API
//     const fetchWaterSupplyData = async () => {
//         try {
//             // This is a placeholder - implement your actual water supply API endpoint
//             const response = await fetch('/api/latest_water_supply.php');

//             if (!response.ok) {
//                 // If endpoint doesn't exist, don't show error, just keep current state
//                 return;
//             }

//             const result = await response.json();

//             if (!result.ok || !result.data) {
//                 return;
//             }

//             const data = result.data;
//             setWaterSupplyOn(data.state === 1);

//         } catch (err) {
//             // Silently fail - water supply might be controlled by valve mode
//             console.log('Water supply API not available, using valve mode logic');
//         }
//     };

//     // Fetch threshold data from API
//     const fetchThresholdData = async () => {
//         try {
//             setThresholdLoading(true);

//             const response = await fetch('/api/latest_threshold.php');

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             if (!result.data) {
//                 setThresholdError('No threshold data available');
//                 return;
//             }

//             const data = result.data;

//             const newLower = parseFloat(data.low) || 30;
//             const newUpper = parseFloat(data.up) || 90;

//             // Update threshold values
//             setMoistureThresholds({
//                 lower: newLower,
//                 upper: newUpper
//             });

//             // Update original thresholds
//             setOriginalThresholds({
//                 lower: newLower,
//                 upper: newUpper
//             });

//             setThresholdLastUpdated(data.time);
//             setThresholdError(null);

//         } catch (err) {
//             console.error('Error fetching threshold data:', err);
//             setThresholdError('Failed to load threshold data.');
//         } finally {
//             setThresholdLoading(false);
//         }
//     };

//     // Fetch sensor data from API
//     const fetchSensorData = async () => {
//         try {
//             setLoading(true);

//             const response = await fetch('/api/latest_sis_sn_01.php');

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();

//             if (!result.ok) {
//                 throw new Error(result.error || 'API returned error');
//             }

//             if (!result.data) {
//                 setError('No sensor data available');
//                 return;
//             }

//             const data = result.data;

//             // Parse soil moisture sensors (sm01 to sm15)
//             const soilMoistureSensors = [];
//             for (let i = 1; i <= 15; i++) {
//                 const sensorKey = `sm${i.toString().padStart(2, '0')}`;
//                 if (data[sensorKey] !== undefined && data[sensorKey] !== null) {
//                     soilMoistureSensors.push({
//                         id: `S${i}`,
//                         value: parseFloat(data[sensorKey]) || 0
//                     });
//                 }
//             }

//             // Parse temperature sensors (t1, t2)
//             const temperatureSensors = [];
//             if (data.t1 !== undefined && data.t1 !== null) {
//                 temperatureSensors.push({
//                     id: 'TEMP-01',
//                     value: parseFloat(data.t1) || 0
//                 });
//             }
//             if (data.t2 !== undefined && data.t2 !== null) {
//                 temperatureSensors.push({
//                     id: 'TEMP-02',
//                     value: parseFloat(data.t2) || 0
//                 });
//             }

//             // Parse humidity sensors (h1, h2)
//             const humiditySensors = [];
//             if (data.h1 !== undefined && data.h1 !== null) {
//                 humiditySensors.push({
//                     id: 'HUM-01',
//                     value: parseFloat(data.h1) || 0
//                 });
//             }
//             if (data.h2 !== undefined && data.h2 !== null) {
//                 humiditySensors.push({
//                     id: 'HUM-02',
//                     value: parseFloat(data.h2) || 0
//                 });
//             }

//             // Calculate averages if not provided
//             const avgSoil = data.avg_sm ? parseFloat(data.avg_sm) :
//                 (soilMoistureSensors.length > 0 ?
//                     soilMoistureSensors.reduce((acc, s) => acc + s.value, 0) / soilMoistureSensors.length : 0);

//             const avgTemp = data.avg_t ? parseFloat(data.avg_t) :
//                 (temperatureSensors.length > 0 ?
//                     temperatureSensors.reduce((acc, s) => acc + s.value, 0) / temperatureSensors.length : 0);

//             const avgHum = data.avg_h ? parseFloat(data.avg_h) :
//                 (humiditySensors.length > 0 ?
//                     humiditySensors.reduce((acc, s) => acc + s.value, 0) / humiditySensors.length : 0);

//             // Update all states at once
//             setSensorData({
//                 soilMoisture: soilMoistureSensors,
//                 temperature: temperatureSensors,
//                 humidity: humiditySensors
//             });

//             setAverages({
//                 soil: avgSoil,
//                 temperature: avgTemp,
//                 humidity: avgHum
//             });

//             setLastUpdated(data.created_at);
//             setError(null);

//         } catch (err) {
//             console.error('Error fetching sensor data:', err);
//             setError('Failed to load sensor data.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Initial fetch and polling setup
//     useEffect(() => {
//         // Fetch all data
//         fetchSensorData();
//         fetchThresholdData();
//         fetchValveModeData();
//         fetchWaterSupplyData();

//         // Poll for new data
//         const sensorInterval = setInterval(fetchSensorData, 30000);
//         const thresholdInterval = setInterval(fetchThresholdData, 60000);
//         const valveModeInterval = setInterval(fetchValveModeData, 30000);
//         const waterSupplyInterval = setInterval(fetchWaterSupplyData, 5000);

//         return () => {
//             clearInterval(sensorInterval);
//             clearInterval(thresholdInterval);
//             clearInterval(valveModeInterval);
//             clearInterval(waterSupplyInterval);
//         };
//     }, []);

//     // Auto valve control logic
//     useEffect(() => {
//         if (valveMode === "auto" && averages.soil > 0) {
//             if (waterSupplyOn && averages.soil >= moistureThresholds.upper) {
//                 // Auto turn OFF - call water supply API
//                 saveWaterSupplyState(false);
//             } else if (!waterSupplyOn && averages.soil <= moistureThresholds.lower) {
//                 // Auto turn ON - call water supply API
//                 saveWaterSupplyState(true);
//             }
//         }
//     }, [averages.soil, valveMode, moistureThresholds, waterSupplyOn]);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Update system status based on sensor values
//     useEffect(() => {
//         const avgSoilMoisture = averages.soil;

//         if (avgSoilMoisture < moistureThresholds.lower - 10 || avgSoilMoisture > moistureThresholds.upper + 10) {
//             setSystemStatus("critical");
//         } else if (avgSoilMoisture < moistureThresholds.lower || avgSoilMoisture > moistureThresholds.upper) {
//             setSystemStatus("warning");
//         } else {
//             setSystemStatus("optimal");
//         }
//     }, [averages.soil, moistureThresholds]);

//     // Handle threshold changes
//     const handleThresholdChange = (type, value) => {
//         const numValue = parseInt(value) || 0;
//         const clampedValue = Math.min(100, Math.max(0, numValue));

//         setMoistureThresholds(prev => ({
//             ...prev,
//             [type]: clampedValue
//         }));
//     };

//     // Handle valve mode toggle
//     const handleValveModeToggle = () => {
//         const newMode = valveMode === "auto" ? "manual" : "auto";
//         saveValveMode(newMode);
//     };

//     // Handle water supply toggle with manual mode check
//     const handleWaterSupplyToggle = () => {
//         if (valveMode === "manual") {
//             saveWaterSupplyState(!waterSupplyOn);
//         }
//     };

//     // Format last updated time
//     const formatLastUpdated = (datetime) => {
//         if (!datetime) return 'N/A';
//         const date = new Date(datetime);
//         return date.toLocaleString();
//     };

//     // Check if thresholds have changed
//     const hasThresholdsChanged = () => {
//         return moistureThresholds.lower !== originalThresholds.lower ||
//             moistureThresholds.upper !== originalThresholds.upper;
//     };

//     // Status Configuration
//     const statusConfig = {
//         optimal: {
//             color: 'bg-green-50 text-green-700 border-green-300',
//             dot: 'bg-green-500',
//             text: 'Optimal'
//         },
//         warning: {
//             color: 'bg-yellow-50 text-yellow-700 border-yellow-400',
//             dot: 'bg-yellow-500',
//             text: 'Warning'
//         },
//         critical: {
//             color: 'bg-red-50 text-red-700 border-red-300',
//             dot: 'bg-red-500',
//             text: 'Critical'
//         }
//     };

//     const config = statusConfig[systemStatus];

//     // Check if we have data to display
//     const hasData = sensorData.soilMoisture.length > 0 || averages.soil > 0;

//     return (
//         <div className="min-h-screen">
//             <div ref={ref} className="container mx-auto px-4 py-16 mt-10 mb-5">
//                 <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 mb-8">
//                     {/* Header Section */}
//                     <div className="text-center lg:text-left">
//                         <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
//                             {fieldName}
//                         </h1>
//                         <div className="flex flex-row justify-center lg:justify-start items-center-safe gap-3">
//                             <h2 className="text-2xl lg:text-3xl font-semibold">
//                                 {cropName}
//                             </h2>
//                         </div>
//                         {/* Last Updated Info */}
//                         {lastUpdated && (
//                             <p className="text-xs mt-2">
//                                 <span className="font-medium">Last Updated (Sensor data):</span> {formatLastUpdated(lastUpdated)}
//                             </p>
//                         )}
//                         {thresholdLastUpdated && (
//                             <p className="text-xs mt-1">
//                                 <span className="font-medium">Last Updated (Thresholds):</span> {formatLastUpdated(thresholdLastUpdated)}
//                             </p>
//                         )}
//                         {valveLastUpdated && (
//                             <p className="text-xs mt-1">
//                                 <span className="font-medium">Last Updated (Valve mode):</span> {formatLastUpdated(valveLastUpdated)}
//                             </p>
//                         )}
//                         {error && (
//                             <p className="text-xs text-red-500 mt-2">
//                                 {error}
//                             </p>
//                         )}
//                         {thresholdError && (
//                             <p className="text-xs text-red-500 mt-1">
//                                 {thresholdError}
//                             </p>
//                         )}
//                         {valveError && (
//                             <p className="text-xs text-red-500 mt-1">
//                                 {valveError}
//                             </p>
//                         )}
//                     </div>

//                     {/* System Status Badge */}
//                     {hasData && (
//                         <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-sm bg-white/90 ${config.color}`}>
//                             <Activity className="w-4 h-4" />
//                             <span className="text-sm font-semibold">System Status:</span>
//                             <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse mx-1`}></div>
//                             <span className="text-sm font-medium">{config.text}</span>
//                         </div>
//                     )}
//                 </div>

//                 {/* Admin Controls */}
//                 {isAdmin && (
//                     <div className="mb-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
//                         <div className="flex items-center gap-2 mb-4">
//                             <Settings className="w-5 h-5 text-purple-600" />
//                             <h3 className="text-lg font-semibold text-purple-900">Admin Controls</h3>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             {/* Valve Mode Control - Single toggle for Auto/Manual */}
//                             <div className="bg-white rounded-xl p-4 shadow-sm">
//                                 <label className="block text-sm font-medium mb-3">
//                                     Valve Control Mode
//                                 </label>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         {valveMode === "auto" ? (
//                                             <ToggleRight className="w-5 h-5 text-green-600" />
//                                         ) : (
//                                             <ToggleLeft className="w-5 h-5 text-gray-600" />
//                                         )}
//                                         <span className="text-sm font-medium">
//                                             {valveMode === "auto" ? "Auto Mode" : "Manual Mode"}
//                                         </span>
//                                     </div>
//                                     <input
//                                         type="checkbox"
//                                         checked={valveMode === "auto"}
//                                         onChange={handleValveModeToggle}
//                                         disabled={savingValve}
//                                         className={`toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800 ${savingValve ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                     />
//                                 </div>
//                                 <p className="mt-3 text-xs text-gray-600">
//                                     {valveMode === "auto"
//                                         ? "Valve operates automatically based on soil moisture thresholds"
//                                         : "Manual control - you can turn the water supply On/Off manually"}
//                                 </p>
//                             </div>

//                             {/* Water Supply Toggle with Save Button */}
//                             <div className="bg-white rounded-xl p-4 shadow-sm">
//                                 <label className="block text-sm font-medium mb-3">
//                                     Water Supply Control
//                                 </label>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <Droplets className={`w-5 h-5 ${waterSupplyOn ? 'text-green-600 animate-bounce' : 'text-gray-500'}`} />
//                                         <span className="text-sm font-medium">
//                                             {waterSupplyOn ? 'Water Flowing' : 'Water Stopped'}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={waterSupplyOn}
//                                             onChange={handleWaterSupplyToggle}
//                                             disabled={valveMode === "auto" || savingValve}
//                                             className={`toggle border-blue-600 bg-blue-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800 ${(valveMode === "auto" || savingValve) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                         />
//                                         {savingValve && (
//                                             <span className="text-xs text-red-600 flex items-center gap-1 ml-2">
//                                                 <span className="animate-spin h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full"></span>
//                                                 Saving...
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <p className="mt-3 text-xs text-gray-600">
//                                     {valveMode === "auto"
//                                         ? "Water supply is controlled automatically based on soil moisture"
//                                         : "Manually control water supply (Auto Mode must be disabled)"}
//                                 </p>
//                             </div>

//                             {/* Soil Moisture Thresholds - Always open with Save button */}
//                             <div className="bg-white rounded-xl p-4 shadow-sm lg:col-span-2">
//                                 <div className="flex items-center justify-between mb-3">
//                                     <label className="block text-sm font-medium">
//                                         Soil Moisture Thresholds
//                                     </label>
//                                     <button
//                                         onClick={saveThresholdData}
//                                         disabled={savingThreshold || !hasThresholdsChanged()}
//                                         className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
//                                             ${savingThreshold || !hasThresholdsChanged()
//                                                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                                 : 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200 cursor-pointer'
//                                             }`}
//                                     >
//                                         <Save className="w-4 h-4" />
//                                         {savingThreshold ? 'Saving...' : 'Save'}
//                                     </button>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                                     <div>
//                                         <label className="block text-xs text-gray-600 font-medium mb-1">
//                                             Lower Limit (Valve ON) - {moistureThresholds.lower}%
//                                         </label>
//                                         <div className="range-container">
//                                             <div className="range-bg"></div>
//                                             <div
//                                                 className="range-fill"
//                                                 style={{ width: `${moistureThresholds.lower}%` }}
//                                             ></div>
//                                             <input
//                                                 type="range"
//                                                 min="0"
//                                                 max="100"
//                                                 value={moistureThresholds.lower}
//                                                 onChange={(e) => handleThresholdChange('lower', e.target.value)}
//                                                 className="range-input-custom"
//                                             />
//                                         </div>
//                                         <div className="flex justify-between text-xs text-gray-600 mt-3">
//                                             <span>0%</span>
//                                             <span className="text-blue-600 font-medium">
//                                                 Valve turns ON below {moistureThresholds.lower}%
//                                             </span>
//                                             <span>100%</span>
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-xs text-gray-600 font-medium mb-1">
//                                             Upper Limit (Valve OFF) - {moistureThresholds.upper}%
//                                         </label>
//                                         <div className="range-container">
//                                             <div className="range-bg"></div>
//                                             <div
//                                                 className="range-fill"
//                                                 style={{ width: `${moistureThresholds.upper}%` }}
//                                             ></div>
//                                             <input
//                                                 type="range"
//                                                 min="0"
//                                                 max="100"
//                                                 value={moistureThresholds.upper}
//                                                 onChange={(e) => handleThresholdChange('upper', e.target.value)}
//                                                 className="range-input-custom"
//                                             />
//                                         </div>
//                                         <div className="flex justify-between text-xs text-gray-600 mt-3">
//                                             <span>0%</span>
//                                             <span className="text-blue-600 font-medium">
//                                                 Valve turns OFF above {moistureThresholds.upper}%
//                                             </span>
//                                             <span>100%</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Current Status Indicator */}
//                                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <Gauge className="w-4 h-4" />
//                                         <span className="text-sm font-medium">Current Status</span>
//                                     </div>

//                                     {/* Current Value Display */}
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-xs font-semibold">
//                                             Current: {averages.soil.toFixed(1)}%
//                                         </span>
//                                         <span className="text-xs font-semibold">
//                                             Target: {moistureThresholds.lower}% - {moistureThresholds.upper}%
//                                         </span>
//                                     </div>

//                                     {/* Progress Bar with Zones and Current Value Indicator */}
//                                     <div className="relative pt-1">
//                                         {/* Zone Labels */}
//                                         <div className="flex text-[0.65rem] font-medium mb-1">
//                                             <span className="text-blue-600">Dry Zone</span>
//                                             <span className="ml-auto text-green-600">Optimal</span>
//                                             <span className="ml-auto text-red-600">Wet Zone</span>
//                                         </div>

//                                         {/* Progress Bar */}
//                                         <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
//                                             {/* Blue Zone - Below Lower Threshold */}
//                                             <div
//                                                 className="bg-blue-500 flex items-center justify-start px-1 text-[0.7rem] font-semibold text-white"
//                                                 style={{ width: `${moistureThresholds.lower}%` }}
//                                             >
//                                                 {moistureThresholds.lower > 15 && 'ON'}
//                                             </div>

//                                             {/* Green Zone - Optimal Range */}
//                                             <div
//                                                 className="bg-green-500 flex items-center justify-center px-1 text-[0.7rem] md:text-xs font-semibold text-white"
//                                                 style={{ width: `${moistureThresholds.upper - moistureThresholds.lower}%` }}
//                                             >
//                                                 {(moistureThresholds.upper - moistureThresholds.lower) > 15 && 'OK'}
//                                             </div>

//                                             {/* Red Zone - Above Upper Threshold */}
//                                             <div
//                                                 className="bg-red-500 flex items-center justify-end px-1 text-[0.7rem] font-semibold text-white"
//                                                 style={{ width: `${100 - moistureThresholds.upper}%` }}
//                                             >
//                                                 {100 - moistureThresholds.upper > 15 && 'OFF'}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Action Message based on current status */}
//                                     {averages.soil > 0 && (
//                                         <div
//                                             className={`mt-3 p-2 rounded-lg text-xs font-medium text-center
//                                                 ${averages.soil < moistureThresholds.lower
//                                                     ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                                                     : averages.soil > moistureThresholds.upper
//                                                         ? 'bg-red-50 text-red-700 border border-red-200'
//                                                         : 'bg-green-50 text-green-700 border border-green-200'
//                                                 }`}
//                                         >
//                                             {averages.soil < moistureThresholds.lower
//                                                 ? '💧 Soil is dry. Irrigation should be ON.'
//                                                 : averages.soil > moistureThresholds.upper
//                                                     ? '💧 Soil is saturated. Irrigation should be OFF.'
//                                                     : '💧 Soil moisture is optimal.'
//                                             }
//                                             {valveMode === 'auto' && (
//                                                 <span className="block mt-1 text-[10px] opacity-75">
//                                                     System is in AUTO mode - valve will adjust automatically
//                                                 </span>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Average Metrics Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                     {/* Soil Moisture Card */}
//                     <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-amber-200">
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="p-2.5 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl">
//                                 <Droplets className="w-5 h-5 text-amber-600" />
//                             </div>
//                             <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${averages.soil < moistureThresholds.lower
//                                 ? 'bg-blue-50 text-blue-700'
//                                 : averages.soil > moistureThresholds.upper
//                                     ? 'bg-red-50 text-red-700'
//                                     : 'bg-green-50 text-green-700'
//                                 }`}>
//                                 {averages.soil < moistureThresholds.lower
//                                     ? 'Low'
//                                     : averages.soil > moistureThresholds.upper
//                                         ? 'High'
//                                         : 'Optimal'}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-medium mb-1">Avg Soil Moisture</h3>
//                             <div className="flex items-baseline gap-2">
//                                 <span className="text-2xl lg:text-3xl font-bold">
//                                     {isInView ? (
//                                         <CountUp
//                                             start={0}
//                                             end={averages.soil}
//                                             duration={2}
//                                             suffix="%"
//                                             decimals={1}
//                                         />
//                                     ) : (
//                                         <span>{averages.soil.toFixed(1)}%</span>
//                                     )}
//                                 </span>
//                                 {isAdmin && (
//                                     <span className="text-xs">
//                                         (Target: {moistureThresholds.lower}-{moistureThresholds.upper}%)
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Temperature Card */}
//                     <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="p-2.5 bg-linear-to-br from-red-50 to-red-100 rounded-xl">
//                                 <Thermometer className="w-5 h-5 text-red-600" />
//                             </div>
//                             <div className="text-xs font-medium px-2.5 py-1 bg-red-50 text-red-700 rounded-full">
//                                 {averages.temperature > 30 ? 'High' : averages.temperature < 20 ? 'Low' : 'Optimal'}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-medium mb-1">Avg Temperature</h3>
//                             <div className="flex items-baseline gap-2">
//                                 <span className="text-2xl lg:text-3xl font-bold">
//                                     {isInView ? (
//                                         <CountUp
//                                             start={0}
//                                             end={averages.temperature}
//                                             duration={2}
//                                             suffix="°C"
//                                             decimals={1}
//                                         />
//                                     ) : (
//                                         <span>{averages.temperature.toFixed(1)}°C</span>
//                                     )}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Humidity Card */}
//                     <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="p-2.5 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
//                                 <Cloud className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
//                                 {averages.humidity > 80 ? 'High' : averages.humidity < 40 ? 'Low' : 'Optimal'}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-medium mb-1">Avg Humidity</h3>
//                             <div className="flex items-baseline gap-2">
//                                 <span className="text-2xl lg:text-3xl font-bold">
//                                     {isInView ? (
//                                         <CountUp
//                                             start={0}
//                                             end={averages.humidity}
//                                             duration={2}
//                                             suffix="%"
//                                             decimals={1}
//                                         />
//                                     ) : (
//                                         <span>{averages.humidity.toFixed(1)}%</span>
//                                     )}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Water Supply Card */}
//                     <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-cyan-200">
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="p-2.5 bg-linear-to-br from-cyan-50 to-cyan-100 rounded-xl">
//                                 <Droplets className="w-5 h-5 text-cyan-600" />
//                             </div>
//                             <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${waterSupplyOn ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
//                                 {waterSupplyOn ? 'ON' : 'OFF'}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-medium mb-1">Water Supply</h3>
//                             <div className="flex items-center gap-3">
//                                 <div className="flex items-center gap-2">
//                                     <div className={`w-3 h-3 rounded-full ${waterSupplyOn ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
//                                     <span className="text-xl font-bold">
//                                         {waterSupplyOn ? 'Flowing' : 'Stopped'}
//                                     </span>
//                                 </div>
//                                 {isAdmin && valveMode === "auto" && (
//                                     <span className="ml-auto text-xs px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full border border-purple-200">
//                                         Auto Mode
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sensor Grids Section */}
//                 {sensorData.soilMoisture.length > 0 && (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Soil Moisture Sensors */}
//                         <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                             <div className="flex items-center justify-between gap-3 mb-8">
//                                 <div>
//                                     <h3 className="text-xl lg:text-2xl font-semibold mb-2">Soil Moisture Grid</h3>
//                                     <p>Real-time moisture levels across the field</p>
//                                 </div>
//                                 <div className="px-3 py-1 bg-amber-50 text-amber-800 text-sm font-medium border border-amber-300">
//                                     {isInView ? (
//                                         <CountUp
//                                             start={0}
//                                             end={sensorData.soilMoisture.length}
//                                             duration={2}
//                                             suffix=" Sensors"
//                                         />
//                                     ) : (
//                                         <span>{sensorData.soilMoisture.length} Nodes</span>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
//                                 {sensorData.soilMoisture.map((sensor) => (
//                                     <div
//                                         key={sensor.id}
//                                         className="group relative bg-linear-to-b from-white to-gray-50 rounded-xl p-4 text-center border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
//                                     >
//                                         <div className="absolute top-3 right-3 text-xs font-medium text-gray-700">
//                                             {sensor.id}
//                                         </div>
//                                         <div className="text-2xl font-bold mt-4 mb-3">
//                                             {isInView ? (
//                                                 <CountUp
//                                                     start={0}
//                                                     end={sensor.value}
//                                                     duration={2}
//                                                     suffix="%"
//                                                     decimals={1}
//                                                 />
//                                             ) : (
//                                                 <span>{sensor.value}%</span>
//                                             )}
//                                         </div>
//                                         <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
//                                             <div
//                                                 className={`h-2 rounded-full transition-all duration-1000 ${sensor.value > moistureThresholds.upper
//                                                     ? 'bg-red-500'
//                                                     : sensor.value < moistureThresholds.lower
//                                                         ? 'bg-blue-500'
//                                                         : 'bg-linear-to-r from-amber-400 to-amber-600'
//                                                     }`}
//                                                 style={{ width: `${sensor.value}%` }}
//                                             ></div>
//                                         </div>
//                                         <div className="text-xs mt-2">
//                                             {sensor.value > moistureThresholds.upper
//                                                 ? 'High'
//                                                 : sensor.value < moistureThresholds.lower
//                                                     ? 'Low'
//                                                     : 'Optimal'}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Temperature & Humidity Side */}
//                         <div className="space-y-8">
//                             {/* Temperature Sensors */}
//                             {sensorData.temperature.length > 0 && (
//                                 <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                                     <div className="flex items-center justify-between gap-3 mb-6">
//                                         <div>
//                                             <h3 className="text-xl lg:text-2xl font-semibold mb-2">Temperature Zones</h3>
//                                             <p>Ambient temperature readings</p>
//                                         </div>
//                                         <div className="px-3 py-1 bg-red-50 text-red-800 text-sm font-medium border border-red-300">
//                                             {isInView ? (
//                                                 <CountUp
//                                                     start={0}
//                                                     end={sensorData.temperature.length}
//                                                     duration={2}
//                                                     suffix=" Sensors"
//                                                 />
//                                             ) : (
//                                                 <span>{sensorData.temperature.length} Sensors</span>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
//                                         {sensorData.temperature.map((sensor) => (
//                                             <div
//                                                 key={sensor.id}
//                                                 className="group bg-linear-to-br from-white to-red-50 rounded-xl px-4 py-3 border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-300"
//                                             >
//                                                 <div className="flex items-center justify-between mb-4">
//                                                     <div className="font-medium">{sensor.id}</div>
//                                                     <Thermometer className="w-5 h-5 text-red-500" />
//                                                 </div>
//                                                 <div className="text-2xl font-bold mb-2">
//                                                     {isInView ? (
//                                                         <CountUp
//                                                             start={0}
//                                                             end={sensor.value}
//                                                             duration={2}
//                                                             suffix="°C"
//                                                             decimals={1}
//                                                         />
//                                                     ) : (
//                                                         <span>{sensor.value.toFixed(1)}°C</span>
//                                                     )}
//                                                 </div>
//                                                 <div className={`text-sm font-medium ${sensor.value > 30 ? 'text-red-600' : sensor.value < 20 ? 'text-blue-600' : 'text-green-600'}`}>
//                                                     {sensor.value > 30 ? 'Above Optimal' :
//                                                         sensor.value < 20 ? 'Below Optimal' :
//                                                             'Optimal'}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Humidity Sensors */}
//                             {sensorData.humidity.length > 0 && (
//                                 <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                                     <div className="flex items-center justify-between gap-3 mb-6">
//                                         <div>
//                                             <h3 className="text-xl lg:text-2xl font-semibold mb-2">Humidity Levels</h3>
//                                             <p>Atmospheric humidity readings</p>
//                                         </div>
//                                         <div className="px-3 py-1 bg-blue-50 text-blue-800 text-sm font-medium border border-blue-300">
//                                             {isInView ? (
//                                                 <CountUp
//                                                     start={0}
//                                                     end={sensorData.humidity.length}
//                                                     duration={2}
//                                                     suffix=" Sensors"
//                                                 />
//                                             ) : (
//                                                 <span>{sensorData.humidity.length} Sensors</span>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
//                                         {sensorData.humidity.map((sensor) => (
//                                             <div
//                                                 key={sensor.id}
//                                                 className="group bg-linear-to-br from-white to-blue-50 rounded-xl px-4 py-3 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
//                                             >
//                                                 <div className="flex items-center justify-between mb-4">
//                                                     <div className="font-medium">{sensor.id}</div>
//                                                     <Cloud className="w-5 h-5 text-blue-500" />
//                                                 </div>
//                                                 <div className="text-2xl font-bold mb-2">
//                                                     {isInView ? (
//                                                         <CountUp
//                                                             start={0}
//                                                             end={sensor.value}
//                                                             duration={2}
//                                                             suffix="%"
//                                                             decimals={1}
//                                                         />
//                                                     ) : (
//                                                         <span>{sensor.value.toFixed(1)}%</span>
//                                                     )}
//                                                 </div>
//                                                 <div className={`text-sm font-medium ${sensor.value > 80 ? 'text-red-600' : sensor.value < 40 ? 'text-blue-600' : 'text-green-600'}`}>
//                                                     {sensor.value > 80 ? 'High' :
//                                                         sensor.value < 40 ? 'Low' :
//                                                             'Optimal'}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Show message when no sensor data */}
//                 {!hasData && !loading && (
//                     <div className="text-center py-12">
//                         <p className="text-lg">No sensor data available</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CropDetails;