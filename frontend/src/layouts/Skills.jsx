import { Button } from "@/components/ui/button"

export default function Skills() {
    const skillItems = [
        {
            icon: "users.svg",
            title: "UX Research",
            description: "Design Thinking & User Mapping Flow",
        },
        {
            icon: "pencil-ruler.svg",
            title: "Tools",
            description: "Git & Github, PNPM & NPM, Vs Code, Cursor/Lovable, Netlify/Render",
        },
        {
            icon: "laptop-minimal.svg",
            title: "Frontend",
            description: "React, Next.JS, Javascript(ES6+), Tailwindcss & ShadCN UI",
        },
        {
            icon: "database.svg",
            title: "Backend",
            description: "NodeJS/Express, MongoDB, Supabase, nodemon, Postman",
        }
    ]
    
    return (
        <section className="py-8 font-space">
            <h1 className="font-space text-center capitalize text-2xl md:text-4xl font-bold 
                flex flex-col gap-y-1.5 items-center">
                skills
                <span className="h-1 w-[100px] bg-gray-950 rounded-md"></span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start py-18 px-4 sm:gap-8">
                {skillItems.map(({ icon, title, description }, i) => (
                    <article key={i} className="flex flex-col justify-center items-center gap-3">
                        <div className="text-white bg-gray-950/80 rounded-full w-[150px] h-[150px]
                        flex justify-center items-center">
                            <img
                                src={`/${icon}`}
                                alt={title}
                                className="object-cover w-[50px] h-[50px]"
                            />
                        </div>
                        <div className="flex flex-col text-center gap-3">
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <p className="text-base text-zinc-100 pb-9 max-sm:max-w-[300px]">{description}</p>
                        </div>
                    </article>
                ))}
            </div>
            <ul className="flex justify-center items-center gap-4 max-lg:flex-wrap">
                <Button className="text-lg font-space capitalize bg-gray-900/80 font-semibold hover:bg-gray-900">problem solving</Button>
                <Button className="text-lg font-space capitalize bg-gray-900/80 font-semibold hover:bg-gray-900">collaboration</Button>
                <Button className="text-lg font-space capitalize bg-gray-900/80 font-semibold hover:bg-gray-900">communication</Button>
                <Button className="text-lg font-space capitalize bg-gray-900/80 font-semibold hover:bg-gray-900">critical thinking</Button>
            </ul>
        </section>
    )
}