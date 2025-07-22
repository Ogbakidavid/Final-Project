import { Button } from "@/components/ui/button"

export default function Education() {
    const educationData = [
        {
            period: "Feb 2025 - july 2025",
            title: "Software Development Course at Power Learn Project (PLP)",
            view: "View",
        },
        {
            period: "April 2024 - July 2024",
            title: "Frontend Development at MicroSoft Student Chapter",
            view: "View",
            link: "https://drive.google.com/file/d/1JMWS_JJDNoIqqKKgyNQdfMTK-PJDGbfj/view?usp=sharing",
        },
        {
            period: "Sept 2023 - Dec 2023",
            title: "React & Javascript at Devtown",
            view: "View",
            link: "https://drive.google.com/file/d/1afmG2tITJjzAbI7NUBtDK-_MBy9C0VN-/view?usp=sharing",

        },
    ]
    return (
        <section className="py-13 px-2 sm:px-6 lg:px-8 w-full text-white">
            <h1 className="font-space text-center capitalize text-2xl md:text-4xl font-bold 
            flex flex-col gap-y-1.5 items-center">
                education
                <span className="h-1 w-[80px] bg-gray-950 rounded-md"></span>
            </h1>
            <div className="py-6 mt-3 mx-auto max-w-[800px]">
                {educationData.map(({ period, title, view, link }, i) => (
                    <article key={i} className="flex justify-between items-center 
                    md:max-w-[600px] mx-auto gap-1.5">
                        <div className="w-[200px]">
                            <p className="rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg
                            shadow-[inset_0_6px_10px_0_rgba(0,0,0,0.2)] box-border text-white
                            block font-space text-xs md:text-[15px] font-semibold my-[10px] h-[100px] sm:h-[70.8px]
                            mx-0 py-[15px] sm:py-[20px] px-[20px] isolate text-center">{period}
                            </p>
                        </div>
                        <div className="w-[300px]">
                            <p className="rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg
                            shadow-[inset_0_6px_10px_0_rgba(0,0,0,0.2)] box-border text-white
                            block font-space text-xs md:text-[15px] font-semibold h-[100px] sm:h-[70.8px] 
                            my-[10px] mx-0 py-[12px] sm:py-[20px] px-[20px] isolate sm:text-center">
                                {title}
                            </p>
                        </div>
                        <div>
                            <Button className="text-white bg-gray-950/80 hover:bg-gray-950 font-semibold">
                                <a 
                                href={link}
                                target="_blank"
                                >
                                    {view}
                                </a>
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}