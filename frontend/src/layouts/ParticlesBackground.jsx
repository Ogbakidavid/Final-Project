import { useEffect } from "react";

export default function ParticlesBackground() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.particlesJS) {
            window.particlesJS.load('particles-js', '/particles.json', () => {
                console.log("Particles.js loaded successfully.");
            });
        } 
    }, []);
    return <div
        id="particles-js"
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"

    />
}

