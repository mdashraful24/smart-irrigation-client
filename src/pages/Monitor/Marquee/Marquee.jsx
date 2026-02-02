const Marquee = () => {
    
    const noticeData = {
        notices: [
            { id: 1, title: 'Rain Alert', body: 'Rain probability decreasing tomorrow' },
            { id: 2, title: 'Soil Update', body: 'Soil moisture optimal for winter crops' },
            { id: 3, title: 'Temperature Alert', body: 'Temperature stable within seasonal range' },
            { id: 4, title: 'Humidity Update', body: 'Humidity levels normal for this season' },
            { id: 5, title: 'Weather Alert', body: 'No precipitation expected for next 48 hours' },
            { id: 6, title: 'Device Update', body: 'ESP32 battery at 87% - optimal condition' },
            { id: 7, title: 'Connection Alert', body: 'Connection stable - 5s refresh rate active' },
            { id: 8, title: 'Sensor Update', body: 'Soil sensors reading accurately' },
            { id: 9, title: 'Temperature Range', body: 'Daily temperature: 18°C to 25°C' },
            { id: 10, title: 'Wind Update', body: 'Wind speed: 12 km/h from Northwest' },
        ]
    };

    return (
        <div className="w-full border border-gray-200 rounded-2xl shadow-lg p-5">
            <marquee
                direction="up"
                className="h-94"
                scrollamount="4"
                onMouseOver={(e) => e.currentTarget.stop()}
                onMouseOut={(e) => e.currentTarget.start()}
            >
                <div className="flex flex-col gap-4">
                    {noticeData.notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`border p-3 rounded-xl transition-all duration-300 hover:shadow-md ${notice.title.includes('Alert')
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
        </div>
    );
};

export default Marquee;
