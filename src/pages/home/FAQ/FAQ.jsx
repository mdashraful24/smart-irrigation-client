import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Droplets, Sprout, Settings, Zap, Shield, Clock } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqRef = useRef(null);

    const faqs = [
        {
            question: "What is a smart irrigation system and how does it work?",
            answer: "Our smart irrigation system uses advanced sensors, weather data, and AI algorithms to optimize watering schedules. The system monitors soil moisture levels, weather forecasts, and plant needs in real-time, automatically adjusting watering to deliver the perfect amount of water exactly when your plants need it.",
            icon: <Zap className="w-5 h-5" />
        },
        {
            question: "How much water can I save with this system?",
            answer: "Most customers save 30-50% on their water usage. Our system eliminates overwatering by providing precise irrigation based on actual plant needs and environmental conditions. You'll see significant reductions in your water bill while maintaining a healthier landscape.",
            icon: <Droplets className="w-5 h-5" />
        },
        {
            question: "Is the system difficult to install?",
            answer: "Our irrigation system is designed for easy DIY installation. Most homeowners complete setup in 2-3 hours with our step-by-step guide. For those who prefer professional installation, we offer certified installer services in most areas.",
            icon: <Settings className="w-5 h-5" />
        },
        {
            question: "Can I control the system remotely?",
            answer: "Yes! Our mobile app allows you to control and monitor your irrigation system from anywhere. Adjust schedules, check soil moisture levels, receive alerts, and view watering history right from your smartphone.",
            icon: <Clock className="w-5 h-5" />
        },
        {
            question: "What happens during rain or extreme weather?",
            answer: "Our system automatically pauses watering when rain is detected or forecasted. It resumes normal operation once conditions improve, ensuring you never waste water irrigating during or right after rainfall.",
            icon: <Shield className="w-5 h-5" />
        },
        {
            question: "Will this system work for different types of plants?",
            answer: "Absolutely! Our system supports customizable zones for different plant types. You can create separate watering schedules for lawns, flower beds, vegetable gardens, and shrubs, each with optimized watering patterns.",
            icon: <Sprout className="w-5 h-5" />
        },
        {
            question: "What's included in the basic package?",
            answer: "The starter kit includes: smart controller, 6 soil moisture sensors, weather sensor, WiFi hub, mobile app access, and all necessary installation components. Additional zones and sensors can be added as needed.",
            icon: <Settings className="w-5 h-5" />
        },
        {
            question: "Is there a warranty?",
            answer: "We offer a 3-year comprehensive warranty on all components. Our customer support team is available 7 days a week to help with any questions or technical issues.",
            icon: <Shield className="w-5 h-5" />
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Close FAQ when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the click is outside the FAQ container and an FAQ is open
            if (faqRef.current &&
                !faqRef.current.contains(event.target) &&
                activeIndex !== null) {
                setActiveIndex(null);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeIndex]);

    return (
        <div className="container mx-auto pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12 md:mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold capitalize">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 md:mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                        Everything you need to know about our smart irrigation system
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4" ref={faqRef}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                className="w-full p-4 text-left flex items-center justify-between focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-blue-500">
                                        {faq.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {faq.question}
                                    </h3>
                                </div>
                                <div>
                                    {activeIndex === index ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`px-6 transition-all duration-300 ease-in-out ${activeIndex === index
                                    ? 'pb-5 max-h-96 opacity-100'
                                    : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                <div className="pl-6 border-l-2 border-blue-400">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
