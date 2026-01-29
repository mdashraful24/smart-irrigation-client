import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/img/fresh-orange-fruit.jpg";
import img2 from "../../../assets/img/fresh-orange-fruit.jpg";
import img3 from "../../../assets/img/fresh-orange-fruit.jpg";

const Slider = () => {
    const images = [img1, img2, img3];

    return (
        <div className="rounded-xl overflow-hidden">
            <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
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
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-64 md:h-96 lg:h-210 object-cover"
                            onError={(e) => {
                                console.error(`Failed to load image ${index + 1}`);
                                e.target.style.display = "none";
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
