
import AboutusDetail from "../../components/about/aboutus-detail";
import AboutusFullimg from "../../components/about/aboutus-fullimg";
import AboutusStats from "../../components/about/aboutus-stats";
import Team from "../../components/home/team";
import Herobanner from "../../components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Aboutus | ZAPBASKET",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/about-us/banner/aboutus-banner.png"
                heading="About us"
                desc="We craft <span>innovative digital</span> designs that amplify brand identity and drive meaningful results" />
            <AboutusDetail />
            <AboutusStats/>
            <AboutusFullimg/>
            <Team teamdataNumber="01"/>
        </main>
    );
};
