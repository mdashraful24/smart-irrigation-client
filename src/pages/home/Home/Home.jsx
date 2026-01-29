import About from "../About/About";
import Highlight from "../Highlight/Highlight";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div className="mt-16">
            <Slider />
            <About />
            <Highlight />
        </div>
    );
};

export default Home;