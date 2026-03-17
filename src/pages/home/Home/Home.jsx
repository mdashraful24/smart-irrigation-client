import { useEffect } from "react";
import About from "../About/About";
import Highlight from "../Highlight/Highlight";
import Slider from "../Slider/Slider";
import FAQ from "../FAQ/FAQ";
import FeaturesOverview from "../FeaturesOverview/FeaturesOverview";
import HowItWorks from "../HowItWorks/HowItWorks";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pageTitle = t('nav.home');
    const brand = t('brand');

    return (
        <div className="mt-16">
            <Helmet>
                <title>
                    {pageTitle ? `${pageTitle} | ${brand}` : ` ${brand}`}
                </title>
            </Helmet>

            <Slider />
            <About />
            <FeaturesOverview />
            <HowItWorks />
            <Highlight />
            <FAQ />
        </div>
    );
};

export default Home;
