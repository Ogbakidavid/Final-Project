import { useState, useEffect } from "react";
import API from "../services/api";
import { Button } from "@/components/ui/button";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await API.get('/blogs');
                setBlogs(data.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className="text-center text-white">Loading projects...</p>;
    }

    return (
        <section id="blog" className="py-8 px-2 sm:px-6 lg:px-8 w-full scroll-smooth">
            <h1 className="font-space text-center capitalize text-2xl md:text-4xl font-bold 
            flex flex-col gap-y-1.5 items-center pt-13">
                blogs
                <span className="h-1 w-[80px] bg-gray-950 rounded-md"></span>
            </h1>
            <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {blogs.map(({ title, content, author, tags, coverImage }, i) => (
                    <article
                        className="border-4 border-zinc-100 rounded-lg overflow-hidden 
                        bg-gray-950/80 text-white shadow-2xl font-space"
                        key={i}
                    >
                        <div className="h-60 overflow-hidden">
                            <img 
                                src={`/${coverImage}`} 
                                alt={title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-6 grid grid-cols-1 gap-2">
                            <h1 className="text-lg font-semibold">{title}</h1>
                            <p className="text-sm">{content}</p>
                            <span className="text-base italic mb-2">{author}</span>
                            <ul className="flex gap-2 flex-wrap text-xs text-zinc-700 font-medium">
                                {tags && tags.map((tag, idx) => (
                                    <Button key={idx} size="sm" className="bg-primary hover:bg-primary">#{tag}</Button>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

