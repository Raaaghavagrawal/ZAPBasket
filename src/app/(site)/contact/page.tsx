import Contact from "../../components/home/contact";
import Herobanner from "../../components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact | ZAPBASKET",
};

export default function Page() {
    return (
        <main>
            <Contact contactdataNumber="01"/>
        </main>
    );
};
