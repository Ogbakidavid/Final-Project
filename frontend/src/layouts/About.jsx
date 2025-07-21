import AboutImage from "/avatar.png"
import { Button } from "@/components/ui/button"
import Skills from "../layouts/Skills";
import Project from "./Project";
import Blog from "./Blog";
import Education from "./Education";
import Contact from "./Contact";
import Icon from "./icons";

export default function About() {
    return (
        <section id="about" className="text-white z-50 w-full h-full scroll-smooth">
            <div className="container mx-auto px-3 py-6 bg-primary shadow-2xl -m-6">
                <div
                    className="pt-18">
                    <h1 className="font-space text-center capitalize text-2xl md:text-4xl font-bold 
                    flex flex-col gap-y-1.5 items-center">
                        about me
                        <span className="h-1 w-[100px] bg-gray-950 rounded-md"></span>
                    </h1>
                    <div className="grid lg:grid-cols-2 items-center gap-12 py-18 px-7">
                        {/* Text Content */}
                        <div className="font-space space-y-2 text-center lg:text-start">
                            <h3 className="text-2xl font-bold">Hi 🖐🏻, I'm David Ogbaki,</h3>
                            <p className="text-base font-medium">
                                I'm a passionate full-stack developer (MERN Stack) and blockchain
                                enthusiast dedicated to building impactful solutions. Whether it's
                                crafting seamless user experiences, designing scalable web applications,
                                or exploring the potential of decentralized technology, I am driven by the
                                power of tech to transform lives.
                            </p>
                            <Button className="bg-gray-900/80 font-bold mt-4 text-lg" size="lg">Available to work</Button>
                        </div>

                        {/* About Image */}
                        <div className="relative w-full max-w-[300px] mx-auto">
                            <div className="bg-zinc-200 relative z-10 pt-10">
                                <img
                                    src={AboutImage}
                                    alt="about image"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="absolute top-7 left-7 w-full h-full border-8 border-white z-0"></div>
                        </div>
                    </div>
                </div>
                <Skills />
                <Icon />
                <Project />
                <Blog />
                <Education />
                <Contact />
                <p className="text-center font-space font-medium">@ 2025 Ogbaki David, All Rights reserved.</p>
            </div>
        </section>
    )
}