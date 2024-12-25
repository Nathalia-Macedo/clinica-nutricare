import { useSiteData } from "../../src/Context/SiteContext";

export function About() {
  const { about } = useSiteData();

  return (
    <section id="sobre" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3">
            <div className="rounded-full overflow-hidden aspect-square">
              <img
                src={about.image}
                alt="Sobre a Nutricare"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl mb-6">
              {about.title.replace(about.highlightedName, '')}
              <span className="text-[#8CC63F]">{about.highlightedName}</span>
            </h2>
            
            <div className="space-y-4">
              {about.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

