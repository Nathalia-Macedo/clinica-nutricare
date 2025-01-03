

// import React from 'react';
// import { useAboutData, useSiteLoading, useSiteError } from '../Context/SiteContext';

// export function About() {
//   const aboutData = useAboutData();
//   const loading = useSiteLoading();
//   const error = useSiteError();

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="animate-pulse flex flex-col md:flex-row gap-8 items-center">
//             <div className="w-full md:w-1/3">
//               <div className="rounded-full bg-gray-200 aspect-square"></div>
//             </div>
//             <div className="w-full md:w-2/3 space-y-4">
//               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               <div className="space-y-3">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 bg-red-50">
//         <div className="container mx-auto px-4 text-center text-red-600">
//           Erro ao carregar dados: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="sobre" className="py-12 md:py-16 bg-gray-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex flex-col lg:flex-row gap-8 items-center">
//           <div className="w-full lg:w-1/3 max-w-sm mx-auto">
//             <div className="rounded-full overflow-hidden aspect-square shadow-xl">
//               <img
//                 src={aboutData.image}
//                 alt="Sobre a Nutricare"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
          
//           <div className="w-full lg:w-2/3">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               {aboutData.title.replace(aboutData.highlightedName, ' ')}
//               <span style={{color:"#8CC63F"}} className="mx-1">{aboutData.highlightedName}</span>
//             </h2>
            
//             <div className="space-y-4">
//               {aboutData.description.map((paragraph, index) => (
//                 <p key={index} className="text-gray-600 leading-relaxed">
//                   {paragraph}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';
import { useAboutData, useSiteLoading, useSiteError } from '../Context/SiteContext';
import { AboutCards } from './AboutCards';

export function About() {
  const aboutData = useAboutData();
  const loading = useSiteLoading();
  const error = useSiteError();

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="rounded-full bg-gray-200 aspect-square"></div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center text-red-600">
          Erro ao carregar dados: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="sobre" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          <div className="w-full lg:w-1/3 max-w-sm mx-auto">
            <div className="rounded-full overflow-hidden aspect-square shadow-xl">
              <img
                src={aboutData.image}
                alt="Sobre a Nutricare"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {aboutData.title.split(aboutData.highlightedName)[0]}
              <span className="text-[#8CC63F] mx-1">{aboutData.highlightedName}</span>
              {aboutData.title.split(aboutData.highlightedName)[1]}
            </h2>
            
            <div className="space-y-4">
              {aboutData.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <AboutCards cards={aboutData.cards} />
      </div>
    </section>
  );
}

