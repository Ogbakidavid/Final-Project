import { useEffect, useState } from "react";
import API from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/projects");
        setProjects(data.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading projects...</p>;
  }

  return (
    <section id="project" className="py-24 px-2 sm:px-6 lg:px-8 w-full scroll-smooth">
      <h1 className="font-space text-center capitalize text-2xl md:text-4xl font-bold 
        flex flex-col gap-y-1.5 items-center">
        my projects
        <span className="h-1 w-[80px] bg-gray-950 rounded-md"></span>
      </h1>
      <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {projects.map(({ title, subTitle, image, about, description, link }, i) => (
          <Card className="bg-gray-950/80 border-white border-4 shadow-2xl grid 
          grid-cols-1" key={i}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold uppercase 
              text-center text-white pb-2 font-space">
                {title}
              </CardTitle>
              <CardDescription className="bg-primary p-3 rounded-md max-w-sm w-full mx-auto 
              text-gray-900 text-center text-xl font-semibold font-space">
                {subTitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="mx-auto">
              <img
                src={`/${image}`}
                alt={title}
                className="max-w-[500px] max-h-[300px] w-full h-full object-cover object-center rounded-md"
                loading="lazy"
              />
            </CardContent>
            <CardHeader>
              <CardTitle className="text-2xl font-bold uppercase 
              text-center text-white pb-2 font-space max-[400px]:text-start">{about}</CardTitle>
              <CardDescription className="bg-primary text-center text-gray-900 font-space text-base 
              max-[400px]:text-start rounded-md p-3 font-medium">
                {description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center gap-4 max-[400px]:justify-start ">
              <Button className="text-white font-semibold capitalize p-4 bg-transparent 
              border-2 border-primary hover:border-transparent hover:text-gray-900 transition-all duration-200" size="lg">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2"
                >
                  view details
                  <SquareArrowOutUpRight />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
