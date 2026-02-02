const Marquee = () => {
    
    const noticeData = {
        notices: [
            { id: 1, date: '10:45 AM', month: 'Today', title: '⚠️ Rain Alert', body: 'Rain probability decreasing tomorrow' },
            { id: 2, date: '10:30 AM', month: 'Today', title: '📊 Soil Update', body: 'Soil moisture optimal for winter crops' },
            { id: 3, date: '10:15 AM', month: 'Today', title: '🌡️ Temperature Alert', body: 'Temperature stable within seasonal range' },
            { id: 4, date: '10:00 AM', month: 'Today', title: '💧 Humidity Update', body: 'Humidity levels normal for this season' },
            { id: 5, date: '09:45 AM', month: 'Today', title: '🌦️ Weather Alert', body: 'No precipitation expected for next 48 hours' },
            { id: 6, date: '09:30 AM', month: 'Today', title: '🔋 Device Update', body: 'ESP32 battery at 87% - optimal condition' },
            { id: 7, date: '09:15 AM', month: 'Today', title: '📡 Connection Alert', body: 'Connection stable - 5s refresh rate active' },
            { id: 8, date: '09:00 AM', month: 'Today', title: '🌱 Sensor Update', body: 'Soil sensors reading accurately' },
            { id: 9, date: '08:45 AM', month: 'Today', title: '🌡️ Temperature Range', body: 'Daily temperature: 18°C to 25°C' },
            { id: 10, date: '08:30 AM', month: 'Today', title: '💨 Wind Update', body: 'Wind speed: 12 km/h from Northwest' },
        ]
    };

    return (
        <div className="w-full">
            <aside className="w-full border border-gray-200 rounded-xl h-105 drop-shadow-lg">
                {/* Header */}
                <div className="font-medium text-lg sm:text-xl md:text-2xl flex items-center px-5 py-2 rounded-t-lg shadow-lg">
                    <h2 className="li-font flex items-center gap-2 text-xl md:text-2xl">
                        Live Alerts & Updates
                    </h2>
                </div>

                <marquee
                    direction="up"
                    className="h-88"
                    scrollamount="2"
                    onMouseOver={(e) => e.currentTarget.stop()}
                    onMouseOut={(e) => e.currentTarget.start()}
                >
                    <div className="notice-container p-3 sm:p-5 flex flex-col gap-4">
                        {noticeData.notices.map((notice) => (
                            <div
                                key={notice.id}
                                className={`border p-3 drop-shadow rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${notice.title.includes('Alert')
                                    ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100'
                                    : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                                    }`}
                            >
                                <h3 className="font-semibold text-md mb-1">{notice.title}</h3>
                                <p className="text-sm">{notice.body}</p>
                            </div>
                        ))}
                    </div>
                </marquee>
            </aside>
        </div>
    );
};

export default Marquee;
