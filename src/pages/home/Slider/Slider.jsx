import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState, useEffect } from "react";
import { Monitor, LogIn, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

import img1 from "../../../assets/img/fresh-orange-fruit.jpg";
import img2 from "../../../assets/img/fresh-orange-fruit.jpg";
import img3 from "../../../assets/img/fresh-orange-fruit.jpg";

const Slider = () => {
    const images = [img1, img2, img3];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const slideContent = [
        {
            title: "Fresh Orange Delight",
            subtitle: "Premium Quality Fruits",
            description: "Experience the freshest oranges harvested daily from our sustainable farms"
        },
        {
            title: "Organic Farming",
            subtitle: "100% Natural Process",
            description: "Grown with care using only organic methods for maximum flavor"
        },
        {
            title: "Direct Delivery",
            subtitle: "From Farm to Table",
            description: "Get your fresh fruits delivered directly to your doorstep"
        }
    ];

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    // Add parallax effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollers = document.querySelectorAll('.parallax-item');
            scrollers.forEach(scroller => {
                const speed = scroller.dataset.speed || 1;
                const yPos = window.pageYOffset * speed;
                scroller.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="overflow-hidden relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-purple-500/10 blur-3xl z-0"></div>

            <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                showArrows={false}
                dynamicHeight={false}
                swipeable
                emulateTouch
                interval={5000}
                transitionTime={800}
                stopOnHover={false}
                onChange={handleSlideChange}
                selectedItem={currentSlide}
                className="relative z-10"
            >
                {images.map((image, index) => (
                    <div key={index} className="relative h-125 md:h-150 lg:h-175 overflow-hidden">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                                onError={(e) => {
                                    console.error(`Failed to load image ${index + 1}`);
                                    e.target.style.display = "none";
                                }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>
                            <div className="absolute inset-0 bg-linear-to-l from-black/20 to-transparent"></div>
                        </div>

                        {/* Animated Particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.5}s`,
                                        animationDuration: `${3 + Math.random() * 4}s`
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Content Container - CENTERED */}
                        <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
                            {/* Text Content - Centered */}
                            <div className="max-w-2xl text-center parallax-item" data-speed="0.3">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                    {slideContent[index].title}
                                </h1>
                                <div className="text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-400 font-semibold mb-6">
                                    Premium Experience
                                </div>
                                <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
                                    {slideContent[index].description}
                                </p>
                            </div>

                            {/* Action Buttons - Glass Morphism - Centered */}
                            <div className="flex flex-row justify-center items-center gap-4 md:gap-6 z-30 parallax-item mb-12" data-speed="0.5">
                                <a
                                    href="/all-fields"
                                    className="group relative overflow-hidden bg-linear-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/30 text-white font-semibold p-3 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-blue-500/90 hover:to-blue-600/90 flex items-center justify-center gap-3 min-w-32 md:min-w-40"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <Monitor className="w-5 h-5 shrink-0" />
                                    <span className="relative">Monitor</span>
                                    {/* <ChevronRight className="absolute right-4 w-0 h-5 group-hover:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" /> */}
                                </a>

                                <a
                                    href="/auth/login"
                                    className="group relative overflow-hidden bg-linear-to-r from-emerald-600/90 to-emerald-700/90 backdrop-blur-sm border border-emerald-400/30 text-white font-semibold p-3 rounded-xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-emerald-500/90 hover:to-emerald-600/90 flex items-center justify-center gap-3 min-w-32 md:min-w-40"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <LogIn className="w-5 h-5 shrink-0" />
                                    <span className="relative">Login</span>
                                    {/* <ChevronRight className="absolute right-4 w-0 h-5 group-hover:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" /> */}
                                </a>
                            </div>

                            {/* Decorative Line & Indicators - Positioned at bottom */}
                            <div className="absolute bottom-8 left-0 right-0 px-8 md:px-12 lg:px-16">
                                {/* Decorative Line */}
                                {/* <div className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent w-full mb-4"></div> */}

                                {/* Slide Indicator - Custom */}
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSlideChange(idx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx
                                                    ? 'w-8 bg-linear-to-r from-amber-400 to-orange-400'
                                                    : 'w-4 bg-white/40 hover:bg-white/60'
                                                    }`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-white/60 text-sm font-medium">
                                        <span className="text-white">{currentSlide + 1}</span>
                                        <span className="mx-2">/</span>
                                        <span>{images.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Custom Navigation Arrows */}
            <button
                onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 hover:border-white/40 transition-all duration-300 transform hover:scale-110 group/arrow opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 group-hover/arrow:-translate-x-1 transition-transform duration-300" />
            </button>

            <button
                onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 hover:border-white/40 transition-all duration-300 transform hover:scale-110 group/arrow opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 group-hover/arrow:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Slider;






// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

// import img1 from "../../../assets/img/fresh-orange-fruit.jpg";
// import img2 from "../../../assets/img/fresh-orange-fruit.jpg";
// import img3 from "../../../assets/img/fresh-orange-fruit.jpg";

// const Slider = () => {
//     const images = [img1, img2, img3];

//     return (
//         <div className="rounded-xl overflow-hidden relative">
//             <Carousel
//                 infiniteLoop
//                 useKeyboardArrows
//                 autoPlay
//                 showThumbs={false}
//                 showStatus={false}
//                 showIndicators={false}  // Remove indicator dots
//                 showArrows={false}      // Remove arrow buttons
//                 dynamicHeight={false}
//                 swipeable
//                 emulateTouch
//                 interval={3000}
//                 transitionTime={500}
//                 stopOnHover
//             // renderArrowPrev={(clickHandler, hasPrev) => (
//             //     // Left side
//             //     <button
//             //         className={`hidden md:block absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-70 ${!hasPrev ? "opacity-50 cursor-not-allowed" : ""
//             //             }`}
//             //         onClick={clickHandler}
//             //         disabled={!hasPrev}
//             //     >
//             //         &lt;
//             //     </button>
//             // )}
//             // renderArrowNext={(clickHandler, hasNext) => (
//             //     // Right side
//             //     <button
//             //         className={`hidden md:block absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-70 ${!hasNext ? "opacity-50 cursor-not-allowed" : ""
//             //             }`}
//             //         onClick={clickHandler}
//             //         disabled={!hasNext}
//             //     >
//             //         &gt;
//             //     </button>
//             // )}
//             >
//                 {images.map((image, index) => (
//                     <div key={index} className="relative">
//                         <img
//                             src={image}
//                             alt={`Slide ${index + 1}`}
//                             className="w-full h-64 md:h-96 lg:h-210 object-cover"
//                             onError={(e) => {
//                                 console.error(`Failed to load image ${index + 1}`);
//                                 e.target.style.display = "none";
//                             }}
//                         />
//                         {/* Buttons overlay - centered on each slide */}
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="flex flex-col md:flex-row gap-4 md:gap-6 z-20">
//                                 <a href="/monitor" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105">
//                                     Monitor
//                                 </a>
//                                 <a href="/auth/login" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105">
//                                     Login
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// };

// export default Slider;