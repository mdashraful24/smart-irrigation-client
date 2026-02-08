import { useEffect } from "react";
import About from "../About/About";
import Highlight from "../Highlight/Highlight";
import Slider from "../Slider/Slider";
import FAQ from "../FAQ/FAQ";

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mt-16">
            <Slider />
            <About />
            <Highlight />
            <FAQ />
        </div>
    );
};

export default Home;
