
import ProjectList from "../../components/projects";
import Herobanner from "../../components/shared/hero-banner";
import { getAllProjects } from "../../../lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Projects | ZAPBASKET",
};

export default function Page() {
    const projects = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/projects/banner/projects-banner.png"
                heading="Projects"
                desc="A <span>showcase of creativity</span>, strategy, and results explore the projects that define us." />
            <ProjectList />    
        </main>
    );
};
