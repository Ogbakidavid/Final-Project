export default function Icon() {
    const Logos = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    ]
    
    return(
        <div className="relative py-12 w-full overflow-hidden h-44">
                <div className="flex animate-scroll whitespace-nowrap w-max pt-7">
                    {[...Logos, ...Logos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0 mx-8">
                            <img
                                src={logo}
                                alt={`logo ${index + 1}`}
                                width={60}
                                height={60}
                            />
                        </div>
                    ))}
                </div>
            </div>
    )
}