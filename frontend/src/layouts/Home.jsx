import Navbar from './Navbar'
import Portfolio from "/homeImage.png";
import ParticlesBackground from './ParticlesBackground';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
    const [typeText, setTypeText] = useState('');
    const texts = ['innovator', 'full stack developer', 'blockchain enthusiast'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timeout;
        const currentText = texts[currentTextIndex];
        
        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000); 
        } else if (!isDeleting && currentCharIndex < currentText.length) {
            timeout = setTimeout(() => {
                setTypeText(prev => prev + currentText[currentCharIndex]);
                setCurrentCharIndex(prev => prev + 1);
            }, 100);
        } else if (!isDeleting && currentCharIndex === currentText.length) {
            setIsPaused(true);
        } else if (isDeleting && typeText.length > 0) {
            timeout = setTimeout(() => {
                setTypeText(prev => prev.slice(0, -1));
            }, 50);
        } else if (isDeleting && typeText.length === 0) {
            setIsDeleting(false);
            setCurrentCharIndex(0);
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [currentCharIndex, currentTextIndex, isDeleting, typeText, isPaused, texts]);

    return (
        <div className='relative overflow-hidden'>
            <div className="absolute inset-0 -z-20" />
            <ParticlesBackground />
            <Navbar />
            <section className=" relative z-10 h-screen flex items-center justify-center w-full container mx-auto px-3 animate-fade-in-up">
                <div className='text-white text-center grid grid-cols-1 gap-y-3'>
                    <div className='relative mx-auto rounded-full p-[15px] border-[10px] border-primary'>
                        <img
                            src={Portfolio}
                            alt="portfolio"
                            className='rounded-full object-cover w-[400px]'
                            loading='lazy'
                        />
                    </div>
                    <h1 className='text-5xl uppercase font-space'>David Ogbaki</h1>

                    <p className='capitalize font-medium text-xl text-primary'>
                        {typeText}
                        <span className='animate-pulse'>|</span>
                    </p>

                    <div className='flex items-center justify-center gap-x-3 cursor-pointer transition-all duration-200'>
                        <a href='/' className='hover:text-primary'>
                            <Twitter />
                        </a>
                        <a href='/' className='hover:text-primary'>
                            <Linkedin />
                        </a>
                        <a href='/' className='hover:text-primary'>
                            <Github />
                        </a>
                        <a href='/' className='hover:text-primary'>
                            <Mail />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}