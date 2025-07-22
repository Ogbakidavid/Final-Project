import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [currentHash, setCurrentHash] = useState("");

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const scrollContainer = document.querySelector('.scrollable') || window;

        const handleScroll = () => {
            const scrollTop = scrollContainer === window
                ? window.scrollY
                : scrollContainer.scrollTop;
            setIsSticky(scrollTop > 20);
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
            setIsOpen(false);
        };

        setCurrentHash(window.location.hash);

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => setIsOpen(false), 100);
    };

    return (
        <header className={`z-50 text-white w-full transition-all duration-300 ${isSticky
                ? "text-white bg-[#131313] fixed top-0 shadow-2xl slide-in backdrop-blur-xl"
                : "absolute top-0 left-0 bg-transparent"
            }`}>
            <nav className="container mx-auto px-3.5 py-4 flex justify-end items-center">
                {isSticky && (
                    <a href="/" className="flex items-center space-x-2 mr-auto">
                        <span className="uppercase text-xl font-medium font-space">David</span>
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse inline-block"></span>
                    </a>
                )}

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-3.5 capitalize">
                    <li>
                        <a
                            href="#about"
                            className="flex gap-2 font-medium"
                            onClick={(e) => handleNavClick(e, "#about")}>
                            <span className="text-primary">01.</span> about
                        </a>
                    </li>
                    <li>
                        <a
                            href="#project"
                            className="flex gap-2 font-medium"
                            onClick={(e) => handleNavClick(e, "#project")}>
                            <span className="text-primary">02.</span> project
                        </a>
                    </li>
                    <li>
                        <a
                            href="#blog"
                            className="flex gap-2 font-medium"
                            onClick={(e) => handleNavClick(e, "#blog")}>
                            <span className="text-primary">03.</span> blog
                        </a>
                    </li>
                    <a
                        href="https://drive.google.com/file/d/1jpjWSrXgHZhPoB7L3mYsw6PAfA0attGH/view?usp=sharing"
                        target="_blank"
                    >
                        <Button className="bg-transparent border-2 font-bold border-primary" size="lg">
                            Resume
                        </Button>
                    </a>
                </ul>

                {/* Hamburger Icon */}
                <button className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 h-screen w-64 text-white bg-[#131313] z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex flex-col p-6 space-y-6">
                        <button className="self-end mb-4" onClick={toggleMenu}>
                            <X size={30} />
                        </button>

                        <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>About</a>
                        <a href="#project" onClick={(e) => handleNavClick(e, "#project")}>Project</a>
                        <a href="#blog" onClick={(e) => handleNavClick(e, "#blog")}>Blog</a>

                        <hr className="my-4 border-gray-600" />
                    </div>
                </div>

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 h-screen"
                        onClick={toggleMenu}
                    ></div>
                )}
            </nav>
        </header>
    );
}



