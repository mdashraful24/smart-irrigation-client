import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Droplets, Sprout, Settings, Zap, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqRef = useRef(null);

    const { t } = useTranslation();
    const faqs = t('faq.items', { returnObjects: true }) || [];
    const icons = [Zap, Droplets, Settings, Clock, Shield, Sprout, Settings, Shield];

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
        <div className="container mx-auto pb-24 lg:pb-30 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12 md:mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold capitalize">
                        {t('faq.title')}
                    </h2>
                    <p className="mt-4 md:mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                        {t('faq.subtitle')}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4" ref={faqRef}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-green-50 hover:border-green-300"
                        >
                            <button
                                className="w-full p-4 text-left flex items-center justify-between focus:outline-none cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-green-500">
                                        {React.createElement(icons[index] || Zap, { className: 'w-5 h-5' })}
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
                                <div className="pl-6 border-l-2 border-green-500">
                                    <p className="leading-relaxed">
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
