import { Phone, Twitter, Linkedin, Mail, Github } from "lucide-react";

export default function Contact() {
    const contactText = "*Get in Touch*"
    return (
        <section className="py-9 px-2 sm:px-6 lg:px-8 w-full overflow-hidden">
            <div className="relative">
                <div className="flex animate-scroll-left whitespace-nowrap">
                    <div className="flex space-x-32 min-w-full justify-around">
                        {Array(1).fill(0).map((_, index) => (
                            <h1 key={`first-${index}`} className="font-space text-center capitalize text-4xl sm:text-8xl font-bold 
                            flex flex-col gap-y-1.5 items-center animate-pulse flex-shrink-0 text-zinc-200">
                                {contactText}
                            </h1>
                        ))}
                    </div>

                    <div className="flex space-x-32 min-w-full justify-around">
                        {Array(1).fill(0).map((_, index) => (
                            <h1 key={`first-${index}`} className="font-space text-center capitalize text-4xl sm:text-8xl font-bold 
                            flex flex-col gap-y-1.5 items-center animate-pulse flex-shrink-0 text-zinc-200">
                                {contactText}
                            </h1>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center py-6">
                <span className="h-1 w-[100px] bg-gray-950/80 rounded-md"></span>

                <div className="flex justify-center px-6 mt-10">
                    <div className="bg-gray-950/80 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full border border-primary">
                        <div className="space-y-4 font-space w-[380px]">
                            <div className="flex items-center space-x-3 text-teal-100">
                                <Phone />
                                <span>+2349161865468</span>
                            </div>

                            <div className="flex items-center space-x-3 text-teal-100">
                                <Linkedin />
                                <span>Ogbaki David</span>
                            </div>

                            <div className="flex items-center space-x-3 text-teal-100">
                                <Twitter />
                                <span>@ogbakidavid3002</span>
                            </div>

                            <div className="flex items-center space-x-3 text-teal-100">
                                <Github />
                                <span>Ogbakidavid</span>
                            </div>

                            <div className="flex items-center space-x-3 text-teal-100">
                                <Mail />
                                <span>creativeogbaki04@gmail.com</span>
                            </div>
                        </div>

                        {/* Your existing arrow (now functional) */}
                        {/* <div className="flex justify-center mt-8">
                            <button
                                onClick={scrollToTop}
                                className="w-12 h-12 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                                aria-label="Back to top"
                            >
                                <ChevronUp className="w-6 h-6 text-white" />
                            </button>
                        </div> */}

                        {/* <div className="text-center mt-6">
                            <p className="text-teal-200 text-sm">
                                © 2024 Lorraine Wambiru, All rights reserved.
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}