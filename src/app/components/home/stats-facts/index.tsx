
"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import NavigationLink from "../../shared/navigation-link";
import { useEffect, useState } from "react";

function StatsFacts() {
    const [statsFactData, setStatsFactData] = useState<any>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                if (data) {
                    setStatsFactData(data?.statsFactData)
                }
                else{
                    console.error('No data found for statsFactData')
                }
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])


    return (
        <section className="relative overflow-hidden">
            <div className="relative py-20 md:py-40 z-10">
                <div className="container">
                    <div className="flex flex-col xl:flex xl:flex-row items-start gap-8">
                        <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
                            <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">01</span>
                            <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
                            <p className="section-bedge py-1.5 px-4 rounded-full">Our Impact</p>
                        </div>
                        <div className="flex flex-col gap-11">
                            <div className="flex flex-col gap-5 ">
                                <h2 className="max-w-3xl">Trusted by Shoppers Nationwide</h2>
                                <p className="max-w-xl text-secondary/70 dark:text-white/70">We deliver happiness to thousands of customers every day with unbeatable deals, top brands, and fast shipping. See why shoppers love us!</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-5 pt-4 md:pt-11 border-t border-secondary/12 dark:border-white/12">
                                    <h3 className="text-5xl md:text-6xl Xxl:text-7xl font-bold">
                                        <CountUp start={0} end={50000} duration={2.5} separator="," suffix="+" />
                                    </h3>
                                    <p className="text-base text-secondary/70 dark:text-white/70">Products Sold</p>
                                </div>
                                <div className="flex flex-col gap-5 pt-4 md:pt-11 border-t border-secondary/12 dark:border-white/12">
                                    <h3 className="text-5xl md:text-6xl Xxl:text-7xl font-bold">
                                        <CountUp start={0} end={20000} duration={2.5} separator="," suffix="+" />
                                    </h3>
                                    <p className="text-base text-secondary/70 dark:text-white/70">Happy Customers</p>
                                </div>
                                <div className="flex flex-col gap-5 pt-4 md:pt-11 border-t border-secondary/12 dark:border-white/12">
                                    <h3 className="text-5xl md:text-6xl Xxl:text-7xl font-bold">
                                        <CountUp start={0} end={200} duration={2.5} separator="," suffix="+" />
                                    </h3>
                                    <p className="text-base text-secondary/70 dark:text-white/70">Brands Available</p>
                                </div>
                            </div>
                            <div>
                                <NavigationLink navigationTitle="Shop Now" navigationLink="/shop" transform={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-28 -left-20">
                <Image src={"/images/home/statsfact/sectionbg.png"} alt="image" height={590} width={590} className="dark:hidden" />
                <Image src={"/images/home/statsfact/sectionbgdark.png"} alt="image" height={590} width={590} className="hidden dark:block" />
            </div>
        </section>
    );
}

export default StatsFacts;
