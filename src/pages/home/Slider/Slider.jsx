import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/img/fresh-orange-fruit.jpg";
import img2 from "../../../assets/img/fresh-orange-fruit.jpg";
import img3 from "../../../assets/img/fresh-orange-fruit.jpg";

const Slider = () => {
    const images = [img1, img2, img3];

    return (
        <div className="rounded-xl overflow-hidden relative">
            <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={false}  // Remove indicator dots
                showArrows={false}      // Remove arrow buttons
                dynamicHeight={false}
                swipeable
                emulateTouch
                interval={3000}
                transitionTime={500}
                stopOnHover
            // renderArrowPrev={(clickHandler, hasPrev) => (
            //     // Left side
            //     <button
            //         className={`hidden md:block absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-70 ${!hasPrev ? "opacity-50 cursor-not-allowed" : ""
            //             }`}
            //         onClick={clickHandler}
            //         disabled={!hasPrev}
            //     >
            //         &lt;
            //     </button>
            // )}
            // renderArrowNext={(clickHandler, hasNext) => (
            //     // Right side
            //     <button
            //         className={`hidden md:block absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-70 ${!hasNext ? "opacity-50 cursor-not-allowed" : ""
            //             }`}
            //         onClick={clickHandler}
            //         disabled={!hasNext}
            //     >
            //         &gt;
            //     </button>
            // )}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-64 md:h-96 lg:h-210 object-cover"
                            onError={(e) => {
                                console.error(`Failed to load image ${index + 1}`);
                                e.target.style.display = "none";
                            }}
                        />
                        {/* Buttons overlay - centered on each slide */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 z-20">
                                <a href="/monitor" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105">
                                    Monitor
                                </a>
                                <a href="/auth/login" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
