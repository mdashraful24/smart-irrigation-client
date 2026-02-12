import { useTranslation } from 'react-i18next';
import { UserPlus, Eye, Zap, Target, ChevronRight, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const AUTO_SLIDE_INTERVAL = 2000;
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
    const [direction, setDirection] = useState('next');
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    // Responsive detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-slide with smooth transitions
    useEffect(() => {
        if (isAutoPlay && steps.length > 0 && !isAnimating) {
            intervalRef.current = setInterval(() => {
                handleNextStep();
            }, AUTO_SLIDE_INTERVAL);
        }
        return () => clearInterval(intervalRef.current);
    }, [isAutoPlay, steps.length, isAnimating]);

    const handleStepChange = useCallback((newIndex, dir) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setDirection(dir);
        setActiveStep(newIndex);

        setTimeout(() => setIsAnimating(false), 600);
    }, [isAnimating]);

    const handleNextStep = useCallback(() => {
        const nextStep = (activeStep + 1) % steps.length;
        handleStepChange(nextStep, 'next');
    }, [activeStep, steps.length, handleStepChange]);

    const handlePrevStep = useCallback(() => {
        const prevStep = (activeStep - 1 + steps.length) % steps.length;
        handleStepChange(prevStep, 'prev');
    }, [activeStep, steps.length, handleStepChange]);

    const handleStepClick = useCallback((index) => {
        const dir = index > activeStep ? 'next' : 'prev';
        handleStepChange(index, dir);
        if (isAutoPlay) setIsAutoPlay(false);
    }, [activeStep, isAutoPlay, handleStepChange]);

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
                        onStepClick={handleStepClick}
                    />
                ) : (
                    <DesktopShowcase
                        steps={steps}
                        iconMap={iconMap}
                        activeStep={activeStep}
                        direction={direction}
                        isAnimating={isAnimating}
                        onStepClick={handleStepClick}
                        onNextStep={handleNextStep}
                        onPrevStep={handlePrevStep}
                    />
                )}
            </div>
        </section>
    );
};

// Header
const Header = ({ title, subtitle, isAutoPlay, onToggleMode }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-12 lg:mb-16">
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

                {/* Empty column to push content */}
                {/* <div className="hidden lg:block lg:col-span-1"></div> */}

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
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-green-200 via-green-200 to-transparent" />

            <div className="space-y-8">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon] || UserPlus;
                    const isActive = activeStep === index;
                    const isCompleted = activeStep > index;

                    return (
                        <div
                            key={index}
                            className={`relative flex items-start gap-4 transition-all duration-700 ease-in-out ${isActive ? 'scale-y-[1.02]' : 'opacity-80'}`}
                        >
                            {/* Timeline Node */}
                            <div className="relative z-10">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-700 ease-in-out cursor-pointer outline-none ring-0 focus:outline-none focus:ring-0
                                        ${isActive
                                            ? 'bg-linear-to-br from-green-500 to-green-600 shadow-lg shadow-green-200 scale-110 border-none'
                                            : isCompleted
                                                ? 'bg-linear-to-br from-green-400 to-green-500'
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
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {step.number}
                                    </span>
                                    <h3 className={`font-bold transition-all duration-700 ease-in-out ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {step.title}
                                    </h3>
                                </div>

                                <p className={`text-sm leading-relaxed transition-all duration-700 ease-in-out ${isActive ? 'block text-gray-800' : 'text-gray-600 line-clamp-2'}`}>
                                    {step.description}
                                </p>

                                {!isActive && (
                                    <button
                                        className="mt-3 text-sm font-medium text-green-600 flex items-center justify-center gap-1 transition-all duration-300 hover:gap-2 hover:text-green-700 outline-none ring-0 focus:outline-none focus:ring-0"
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

// Desktop: Carousel
const DesktopShowcase = ({ steps, iconMap, activeStep, direction, isAnimating, onStepClick, onNextStep, onPrevStep }) => {

    // Get middle card is always active
    const getVisibleSteps = () => {
        const steps_array = [];

        // Show previous card (activeStep - 1), current card (activeStep), next card (activeStep + 1)
        for (let i = -1; i <= 1; i++) {
            let index = (activeStep + i + steps.length) % steps.length;
            steps_array.push({
                ...steps[index],
                index,
                position: i
            });
        }
        return steps_array;
    };

    return (
        <div className="hidden lg:block relative">
            {/* Main Container with Carousel */}
            <div className="relative px-16">
                {/* Navigation Arrows */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30">
                    <NavButton
                        direction="prev"
                        onClick={onPrevStep}
                        disabled={isAnimating}
                    />
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 z-30">
                    <NavButton
                        direction="next"
                        onClick={onNextStep}
                        disabled={isAnimating}
                    />
                </div>

                {/* Cards Grid - 3 columns */}
                <div className="grid grid-cols-3 gap-6">
                    {getVisibleSteps().map((step, idx) => {
                        const StepIcon = iconMap[step.icon] || UserPlus;
                        const isActive = step.position === 0;
                        const position = step.position;

                        // Calculate animation classes based on direction and position
                        let animationClass = '';
                        if (isAnimating) {
                            if (direction === 'next') {
                                if (position === 0) animationClass = 'animate-slide-in-right';
                                else if (position === -1) animationClass = 'animate-slide-out-left';
                            } else {
                                if (position === 0) animationClass = 'animate-slide-in-left';
                                else if (position === 1) animationClass = 'animate-slide-out-right';
                            }
                        }

                        return (
                            <div
                                key={`${step.index}-${idx}`}
                                className={`
                                    relative group cursor-pointer
                                    transition-all duration-500
                                    ${animationClass}
                                    ${isActive
                                        ? 'scale-105 z-20'
                                        : 'scale-95 opacity-80 hover:scale-100 hover:opacity-100'
                                    }
                                `}
                                onClick={() => onStepClick(step.index)}
                            >
                                {/* Card */}
                                <div className={`
                                    h-full bg-white/90 backdrop-blur-sm rounded-2xl p-6
                                    border-2 transition-all duration-300
                                    hover:shadow-xl
                                    ${isActive
                                        ? 'border-green-500 shadow-green-200 shadow-xl'
                                        : 'border-gray-100 hover:border-green-200 shadow-lg'
                                    }
                                `}>
                                    {/* Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div className={`
                                            flex items-center justify-center w-14 h-14 
                                            rounded-xl transition-all duration-300
                                            ${isActive
                                                ? 'bg-linear-to-br from-green-500 to-green-600 scale-110'
                                                : 'bg-gray-100 group-hover:bg-green-100'
                                            }
                                        `}>
                                            <StepIcon className={`
                                                w-7 h-7 transition-all duration-300
                                                ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}
                                            `} />
                                        </div>
                                    </div>

                                    {/* Step Number */}
                                    <div className="flex justify-center mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${isActive
                                                ? 'bg-green-100 text-green-700 border'
                                                : 'bg-gray-100 text-gray-600'
                                            }
                                        `}>
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`
                                        text-xl font-bold text-center mb-4 
                                        ${isActive ? 'text-green-700' : 'text-gray-600'}
                                    `}>
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-sm text-center leading-relaxed ${isActive ? '' : 'text-gray-600'}`}>
                                        {step.description}
                                    </p>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute -top-2 -right-2">
                                            <span className="flex h-6 w-6">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 text-white items-center justify-center text-xs">
                                                    ✓
                                                </span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mt-14">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onStepClick(index)}
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
const NavButton = ({ direction, onClick, disabled }) => {
    const isPrev = direction === 'prev';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center justify-center w-12 h-12 rounded-full
                bg-white/80 backdrop-blur-sm border border-gray-200
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:bg-linear-to-r hover:from-green-500 hover:to-green-600
                hover:text-white hover:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:bg-white disabled:hover:text-gray-700
                disabled:hover:border-gray-200
                ${isPrev ? 'hover:-translate-x-1' : 'hover:translate-x-1'}
                z-30 pointer-events-auto cursor-pointer
            `}
            aria-label={direction === 'prev' ? 'Previous step' : 'Next step'}
        >
            <ArrowRight className={`w-5 h-5 ${isPrev ? 'rotate-180' : ''}`} />
        </button>
    );
};

export default HowItWorks;
