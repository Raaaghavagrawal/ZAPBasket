import BlogList from "../../components/blog/blog-list";
import Herobanner from "../../components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Blog | ZAPBASKET",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/blog/banner/blog_banner.png"
                heading="Blog"
                desc="Excited to <span>begin something amazing?</span> Get in touch—we'd love to connect with you!" />    
                <BlogList/>
        </main>
    );
};
