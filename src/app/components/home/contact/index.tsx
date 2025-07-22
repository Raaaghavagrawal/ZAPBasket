"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Contact = (props: { contactdataNumber: string }) => {
    const { contactdataNumber } = props;
    const [submitted, setSubmitted] = useState(false);
    const [loader, setLoader] = useState(false);
    const [contactData, setContactData] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setContactData(data?.statsFactData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])
    const reset = () => {
        formData.name = "";
        formData.email = "";
        formData.message = "";
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });
            const data = await res.json();
            setSubmitted(data.success);
            setLoader(false);
            if (data.success) {
                reset();
            } else {
                setError(data.error || "Failed to send message.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to send message.");
            setLoader(false);
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    return (
        <section className="py-20 md:py-40 flex items-center justify-center min-h-screen mt-10">
            <div className="container flex flex-col gap-12 items-center justify-center">
                {/* Left: Info */}
                <div className="w-full max-w-2xl flex flex-col gap-8 items-center text-center">
                    <div className="flex items-center gap-4">
                        {/* <span className="bg-primary dark:text-secondary py-1.5 px-2.5 text-base font-medium rounded-full">{contactdataNumber ? contactdataNumber : 10}</span> */}
                        {/* <div className="h-px w-16 bg-black/12 dark:bg-white/12" /> */}
                        <p className="section-bedge py-1.5 px-4 rounded-full">Contact us</p>
                    </div>
                    <h2 className="max-w-2xl text-4xl font-bold text-secondary dark:text-white">Get in touch</h2>
                    <p className="max-w-2xl text-secondary/70 dark:text-white/70">Need help with your order, have a product inquiry, or want to share feedback? Our team is here to assist you. Fill out the form and we’ll respond promptly!</p>
                    <ul className="flex flex-col gap-3">
                        {contactData?.keypoint?.map((value:any, index:any) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="bg-primary w-fit p-1.5 rounded-full flex-shrink-0">
                                    <Image src="/images/Icon/right-check.svg" alt="right-icon" width={20} height={20} />
                                </div>
                                <span className="flex-1 text-secondary dark:text-white">{value}</span>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {/* Removed manager profile image */}
                        <div>
                            <p className="font-semibold text-secondary dark:text-white">{contactData?.managerProfile?.name}</p>
                            <span className="text-base text-secondary/70 dark:text-white/70">{contactData?.managerProfile?.position}</span>
                        </div>
                    </div>
                </div>
                {/* Right: Form */}
                <div className="w-full max-w-2xl flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto rounded-2xl p-8 dark:bg-twilliteblack dark:shadow-xl flex flex-col gap-6">
                        <div className="flex items-center gap-3 bg-[#f4f4f5] dark:bg-darkblack rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                            <svg className="text-secondary dark:text-white w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <input
                                required
                                className="w-full bg-transparent border-none outline-none text-secondary dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2"
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
                        <div className="flex items-center gap-3 bg-[#f4f4f5] dark:bg-darkblack rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                            <svg className="text-secondary dark:text-white w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
                            <input
                                required
                                className="w-full bg-transparent border-none outline-none text-secondary dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex items-start gap-3 bg-[#f4f4f5] dark:bg-darkblack rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                            <svg className="text-secondary dark:text-white w-5 h-5 mt-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-secondary dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2 resize-none"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                            />
                        </div>
                        {submitted && (
                            <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span>Great! Email has been sent. We will get in touch asap.</span>
                            </div>
                        )}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>{error}</span>
                            </div>
                        )}
                        <div>
                            {!loader ? (
                                <button type="submit" className="group relative flex justify-center items-center w-full bg-primary hover:bg-secondary rounded-full transition-all duration-300 ease-in-out cursor-pointer shadow-md">
                                    <span className="py-4 px-2 text-lg font-bold text-secondary group-hover:text-white transition-all duration-300 ease-in-out">Submit message</span>
                                    <div className="absolute top-0.5 right-0.5 transition-all duration-300 ease-in-out group-hover:left-0">
                                        <svg className="flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-45" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_1_873)">
                                                <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                                                <path d="M24 23H34M34 23V33M34 23L24 33" stroke="#1F2A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_d_1_873" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="1.5" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_873" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_873" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </button>
                            ) : (
                                <button className="bg-grey item-center flex gap-2 py-3 px-7 rounded">
                                    <div className="animate-spin inline-block size-6 border-2 border-current border-t-transparent text-primary rounded-full dark:text-primary" role="status" aria-label="loading">
                                        <span className="sr-only">Loading...</span>
                                    </div>{" "}
                                    Submitting
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
