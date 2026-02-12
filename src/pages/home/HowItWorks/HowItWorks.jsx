import { useTranslation } from 'react-i18next';
import { UserPlus, Eye, Zap, Target, ChevronRight, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const AUTO_SLIDE_INTERVAL = 3000;
const MOBILE_BREAKPOINT = 1024;

const HowItWorks = () => {
    const { t } = useTranslation();
    const steps = useMemo(
        () => t('howItWorks.steps', { returnObjects: true }) || [],
        [t]
    );

    const [activeStep, setActiveStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    // Responsive detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleStepChange = useCallback((newIndex) => {
        setActiveStep(newIndex);
    }, []);

    const toggleMode = useCallback(() => {
        setIsAutoPlay(prev => !prev);
    }, []);

    const iconMap = {
        UserPlus, Eye, Zap, Target
    };

    if (!steps.length) return null;

    // Main render
    return (
        <section
            ref={containerRef}
            className="relative container mx-auto pb-24 lg:pb-30 px-4 overflow-hidden"
        >
            <div className="container mx-auto relative z-10">
                {/* Header with Glass Morphism Effect */}
                <Header
                    title={t('howItWorks.title')}
                    subtitle={t('howItWorks.subtitle')}
                    isAutoPlay={isAutoPlay}
                    onToggleMode={toggleMode}
                />

                {/* Main Content */}
                {isMobile ? (
                    <MobileTimeline
                        steps={steps}
                        iconMap={iconMap}
                        activeStep={activeStep}
                        onStepClick={handleStepChange}
                        isAutoPlay={isAutoPlay}
                    />
                ) : (
                    <DesktopShowcase
                        steps={steps}
                        iconMap={iconMap}
                        activeStep={activeStep}
                        onStepClick={handleStepChange}
                        isAutoPlay={isAutoPlay}
                        setIsAnimating={setIsAnimating}
                    />
                )}
            </div>
        </section>
    );
};

// Header Component
const Header = ({ title, subtitle, isAutoPlay, onToggleMode }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-12 lg:mb-20">
            <div className="grid lg:grid-cols-5 place-items-start justify-items-center lg:justify-items-stretch gap-8">
                {/* Title with Gradient */}
                <div className="lg:col-span-4 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
                        {title}
                    </h2>
                    <p className="text-lg lg:text-xl">
                        {subtitle}
                    </p>
                </div>

                {/* Floating Label */}
                <div className="lg:col-span-1 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-100 shadow-sm lg:justify-self-end">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold">
                        {isAutoPlay ? t('howItWorks.autoMode') : t('howItWorks.hoverMode')}
                    </span>
                    <button
                        onClick={onToggleMode}
                        className={`relative ml-2 inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2
                        ${isAutoPlay ? 'bg-green-500' : 'bg-gray-300'}`}
                        role="switch"
                        aria-checked={isAutoPlay}
                    >
                        <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-300 shadow-sm 
                            ${isAutoPlay ? 'translate-x-5' : 'translate-x-0.5'}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Mobile: Vertical Timeline Style
const MobileTimeline = ({ steps, iconMap, activeStep, onStepClick }) => {
    return (
        <div className="relative lg:hidden">
            {/* Vertical Line Background (gray) */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-gray-200 to-gray-200" />

            {/* Vertical Line Progress (green) - height based on active step */}
            <div
                className="absolute left-6 top-0 w-0.5 bg-linear-to-b from-green-500 via-green-400 to-green-500 transition-all duration-700 ease-in-out"
                style={{
                    height: `${((activeStep + 1) / steps.length) * 100}%`,
                    maxHeight: '100%'
                }}
            />

            <div className="space-y-8">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon] || UserPlus;
                    const isActive = activeStep === index;
                    const isCompleted = activeStep > index;

                    return (
                        <div
                            key={index}
                            className={`relative flex items-start gap-4 transition-all duration-700 ease-in-out ${isActive ? 'scale-y-[1.02]' : 'opacity-100'}`}
                        >
                            {/* Timeline Node */}
                            <div className="relative z-10">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-700 ease-in-out cursor-pointer outline-none ring-0 focus:outline-none focus:ring-0
                                        ${isActive
                                            ? 'bg-linear-to-br from-green-500 to-green-600 shadow-lg shadow-green-200 scale-110 border-none'
                                            : isCompleted
                                                ? 'bg-linear-to-br from-green-500 to-green-600'
                                                : 'bg-white border-2 border-gray-200 hover:border-green-300'
                                        }`}
                                    onClick={() => onStepClick(index)}
                                >
                                    <IconComponent
                                        className={`w-5 h-5 transition-all duration-700 ease-in-out ${isActive || isCompleted ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`}
                                    />
                                </div>

                                {/* Completion Check */}
                                {isCompleted && (
                                    <div className="absolute -top-1 -right-1">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 bg-white rounded-full animate-in zoom-in duration-300" />
                                    </div>
                                )}
                            </div>

                            {/* Content Card */}
                            <div
                                className={`flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-700 ease-in-out cursor-pointer
                                    ${isActive
                                        ? 'border-green-200 shadow-xl bg-white scale-[1.02]'
                                        : 'border-gray-100 hover:border-green-200 shadow hover:shadow-md'
                                    }`}
                                onClick={() => onStepClick(index)}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-700 ease-in-out
                                        ${isActive
                                            ? 'bg-green-100 text-green-700 scale-105'
                                            : isCompleted
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {step.number}
                                    </span>
                                    <h3 className={`font-bold transition-all duration-700 ease-in-out 
                                    ${isActive
                                            ? 'text-gray-900'
                                            : isCompleted
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                        }
                                    `}
                                    >
                                        {step.title}
                                    </h3>
                                </div>

                                <p className={`text-sm leading-relaxed transition-all duration-700 ease-in-out 
                                    ${isActive
                                        ? 'text-gray-900'
                                        : isCompleted
                                            ? 'text-gray-900'
                                            : 'text-gray-500 line-clamp-2'
                                    }`}
                                >
                                    {step.description}
                                </p>

                                {(!isActive && !isCompleted) && (
                                    <button
                                        className="mt-3 text-sm font-medium text-green-600 flex items-center gap-1 transition-all duration-300 hover:gap-2 hover:text-green-700 outline-none ring-0 focus:outline-none focus:ring-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStepClick(index);
                                        }}
                                    >
                                        <span>Read more</span>
                                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Desktop: Swiper Carousel
const DesktopShowcase = ({ steps, iconMap, activeStep, onStepClick, isAutoPlay, setIsAnimating }) => {
    const [swiper, setSwiper] = useState(null);

    // Sync active step with Swiper
    useEffect(() => {
        if (swiper && swiper.realIndex !== activeStep) {
            swiper.slideTo(activeStep, 500);
        }
    }, [activeStep, swiper]);

    // Handle autoplay toggle
    useEffect(() => {
        if (swiper) {
            if (isAutoPlay) {
                swiper.autoplay.start();
            } else {
                swiper.autoplay.stop();
            }
        }
    }, [isAutoPlay, swiper]);

    // Handle dot click
    const handleDotClick = (index) => {
        onStepClick(index);
        if (swiper) {
            swiper.slideTo(index, 500);
        }
    };

    return (
        <div className="hidden lg:block relative">
            {/* Main Container */}
            <div className="relative px-12">
                {/* Custom Navigation Arrows - Only show when not autoplay */}
                {!isAutoPlay && (
                    <>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30">
                            <NavButton
                                direction="prev"
                                onClick={() => swiper?.slidePrev()}
                            />
                        </div>
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-30">
                            <NavButton
                                direction="next"
                                onClick={() => swiper?.slideNext()}
                            />
                        </div>
                    </>
                )}

                {/* Swiper Carousel */}
                <Swiper
                    onSwiper={setSwiper}
                    modules={[Navigation, Autoplay, EffectCoverflow]}
                    slidesPerView={3}
                    spaceBetween={32}
                    centeredSlides={true}
                    loop={true}
                    speed={600}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 150,
                        modifier: 3,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: AUTO_SLIDE_INTERVAL,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onSlideChange={(swiper) => {
                        const realIndex = swiper.realIndex;
                        if (realIndex !== activeStep) {
                            setIsAnimating(true);
                            onStepClick(realIndex);
                            setTimeout(() => setIsAnimating(false), 600);
                        }
                    }}
                    className="py-8 overflow-visible!"
                >
                    {steps.map((step, index) => {
                        const StepIcon = iconMap[step.icon] || UserPlus;

                        return (
                            <SwiperSlide key={index} className="overflow-visible!">
                                {({ isActive }) => (
                                    <div
                                        className={`
                                            relative group cursor-pointer
                                            transition-all duration-500
                                            ${isActive
                                                ? 'z-20'
                                                : 'scale-95 opacity-70 hover:scale-100 hover:opacity-100'
                                            }
                                        `}
                                        onClick={() => {
                                            if (swiper) {
                                                swiper.slideTo(index, 600);
                                            }
                                        }}
                                    >
                                        {/* Card */}
                                        <div className={`
                                            h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8
                                            border-2 transition-all duration-300
                                            hover:shadow-2xl
                                            ${isActive
                                                ? 'border-green-500 shadow-green-200 shadow-xl'
                                                : 'border-gray-100 hover:border-green-200 shadow-lg'
                                            }
                                        `}>
                                            {/* Icon */}
                                            <div className="flex justify-center mb-6">
                                                <div className={`
                                                    flex items-center justify-center w-16 h-16 
                                                    rounded-2xl transition-all duration-300
                                                    ${isActive
                                                        ? 'bg-linear-to-br from-green-500 to-green-600 scale-110 shadow-lg shadow-green-200'
                                                        : 'bg-gray-100 group-hover:bg-green-100'
                                                    }
                                                `}>
                                                    <StepIcon className={`
                                                        w-8 h-8 transition-all duration-300
                                                        ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}
                                                    `} />
                                                </div>
                                            </div>

                                            {/* Step Number */}
                                            <div className="flex justify-center mb-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                                    ${isActive
                                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }
                                                `}>
                                                    {step.number}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className={`
                                                text-xl font-bold text-center mb-4 
                                                ${isActive ? 'text-gray-900' : 'text-gray-600'}
                                            `}>
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-center leading-relaxed ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                                                {step.description}
                                            </p>

                                            {/* Active Indicator */}
                                            {isActive && (
                                                <div className="absolute -top-3 -right-3">
                                                    <span className="flex h-7 w-7">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-7 w-7 bg-linear-to-r from-green-500 to-green-600 text-white items-center justify-center text-sm shadow-lg">
                                                            ✓
                                                        </span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mt-14">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`
                                rounded-full transition-all duration-500
                                ${index === activeStep
                                    ? 'w-10 h-2.5 bg-green-500'
                                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-green-400'
                                }
                            `}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Navigation Button
const NavButton = ({ direction, onClick }) => {
    const isPrev = direction === 'prev';

    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center w-12 h-12 rounded-full
                bg-white/80 backdrop-blur-sm border border-gray-200
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:bg-linear-to-r hover:from-green-500 hover:to-green-600
                hover:text-white hover:border-transparent
                ${isPrev ? 'hover:-translate-x-1' : 'hover:translate-x-1'}
                z-30 pointer-events-auto cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                text-gray-700 hover:text-white
            `}
            aria-label={direction === 'prev' ? 'Previous step' : 'Next step'}
        >
            <ArrowRight className={`w-5 h-5 ${isPrev ? 'rotate-180' : ''}`} />
        </button>
    );
};

export default HowItWorks;
