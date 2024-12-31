// import React, { useState, useEffect } from 'react';
// import { useHeaderData } from '../Context/SiteContext';
// import { Phone, Mail, Menu, X } from 'lucide-react';
// import { FaFacebookF, FaInstagram } from 'react-icons/fa';

// const LazyImage = ({ src, alt, className }) => {
//   const [imageSrc, setImageSrc] = useState('/placeholder.svg');
//   const [imageRef, setImageRef] = useState();

//   useEffect(() => {
//     let observer;
//     let didCancel = false;

//     if (imageRef && imageSrc === '/placeholder.svg') {
//       if (IntersectionObserver) {
//         observer = new IntersectionObserver(
//           entries => {
//             entries.forEach(entry => {
//               if (
//                 !didCancel &&
//                 (entry.intersectionRatio > 0 || entry.isIntersecting)
//               ) {
//                 setImageSrc(src);
//                 observer.unobserve(imageRef);
//               }
//             });
//           },
//           {
//             threshold: 0.01,
//             rootMargin: '75%',
//           }
//         );
//         observer.observe(imageRef);
//       } else {
//         // Fallback for older browsers
//         setImageSrc(src);
//       }
//     }
//     return () => {
//       didCancel = true;
//       if (observer && observer.unobserve) {
//         observer.unobserve(imageRef);
//       }
//     };
//   }, [src, imageSrc, imageRef]);

//   return (
//     <img
//       ref={setImageRef}
//       src={imageSrc}
//       alt={alt}
//       className={className}
//       onError={() => setImageSrc('/placeholder.svg')}
//     />
//   );
// };

// export function Header() {
//   const headerData = useHeaderData();
//   console.log(headerData)
//   const contacts = headerData?.contacts?.[0] || {};
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="w-full">
//       {/* Barra superior verde com contatos */}
//       <div style={{ backgroundColor: '#8CC63F' }} className="w-full">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap justify-between items-center py-2">
//             <div className="flex flex-wrap items-center gap-4">
//               {contacts.phone && (
//                 <a href={`tel:${contacts.phone}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
//                   <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
//                   <span className="hidden sm:inline">{contacts.phone}</span>
//                 </a>
//               )}
//               {contacts.whatsapp && (
//                 <a href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
//                   <svg 
//                     viewBox="0 0 24 24" 
//                     className="h-3 w-3 sm:h-4 sm:w-4 text-white"
//                     fill="currentColor"
//                   >
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//                   </svg>
//                   <span className="hidden sm:inline">{contacts.whatsapp}</span>
//                 </a>
//               )}
//               {contacts.email && (
//                 <a href={`mailto:${contacts.email}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
//                   <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
//                   <span className="hidden sm:inline">{contacts.email}</span>
//                 </a>
//               )}
//             </div>
//             {contacts.social && contacts.social.length > 0 && (
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <a href={contacts.social[0]} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
//                   <FaFacebookF className="h-3 w-3 sm:h-4 sm:w-4" />
//                 </a>
//                 <a href={contacts.social[1]} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
//                   <FaInstagram className="h-3 w-3 sm:h-4 sm:w-4" />
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Menu principal */}
//       <div className="bg-white py-4">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-[80px]">
//             {/* Logo */}
//             <div className="w-45 h-12 relative">
//               {headerData.logo ? (
//                 <LazyImage
//                   src={headerData.logo}
//                   alt="Nutricare"
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
//                 </div>
//               )}
//             </div>

//             {/* Menu Desktop */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <a 
//                 href="/" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 INÍCIO
//               </a>
//               <a 
//                 href="/sobre" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 SOBRE NÓS
//               </a>
//               <a 
//                 href="/especialidades" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 ESPECIALIDADES
//               </a>
//               <a 
//                 href="/blog" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 BLOG
//               </a>
//             </nav>

//             {/* Botão Agendar */}
//             <button 
//               style={{ backgroundColor: '#8CC63F' }}
//               className="hidden md:block text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#7AB32F] transition-colors"
//             >
//               AGENDAR CONSULTA
//             </button>

//             {/* Menu Mobile */}
//             <button 
//               className="md:hidden p-2 text-[#8CC63F]"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Menu Mobile Dropdown */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white">
//           <div className="container mx-auto px-4 py-4">
//             <nav className="flex flex-col space-y-4">
//               <a 
//                 href="/" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 INÍCIO
//               </a>
//               <a 
//                 href="/sobre" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 SOBRE NÓS
//               </a>
//               <a 
//                 href="/especialidades" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 ESPECIALIDADES
//               </a>
//               <a 
//                 href="/blog" 
//                 className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
//               >
//                 BLOG
//               </a>
//               <button 
//                 style={{ backgroundColor: '#8CC63F' }}
//                 className="text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#7AB32F] transition-colors w-full"
//               >
//                 AGENDAR CONSULTA
//               </button>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


import React, { useState } from 'react';
import { useHeaderData } from '../Context/SiteContext';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export function Header() {
  const headerData = useHeaderData();
  const contacts = headerData?.contacts?.[0] || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Barra superior verde com contatos */}
      <div style={{ backgroundColor: '#8CC63F' }} className="w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center py-2">
            <div className="flex flex-wrap items-center gap-4">
              {contacts.phone && (
                <a href={`tel:${contacts.phone}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  <span className="hidden sm:inline">{contacts.phone}</span>
                </a>
              )}
              {contacts.whatsapp && (
                <a href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="hidden sm:inline">{contacts.whatsapp}</span>
                </a>
              )}
              {contacts.email && (
                <a href={`mailto:${contacts.email}`} className="flex items-center gap-1 text-white text-xs sm:text-sm hover:text-white/80">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  <span className="hidden sm:inline">{contacts.email}</span>
                </a>
              )}
            </div>
            {contacts.social && contacts.social.length > 0 && (
              <div className="flex items-center gap-2 sm:gap-4">
                <a href={contacts.social[0]} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                  <FaFacebookF className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
                <a href={contacts.social[1]} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                  <FaInstagram className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[80px]">
            {/* Logo */}
            <div className="w-45 h-12 relative">
              {headerData.logo ? (
                <img
                  src={headerData.logo}
                  alt="Nutricare"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  {/* Placeholder content if needed */}
                </div>
              )}
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                INÍCIO
              </a>
              <a 
                href="/sobre" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                SOBRE NÓS
              </a>
              <a 
                href="/especialidades" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                ESPECIALIDADES
              </a>
              <a 
                href="/blog" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                BLOG
              </a>
            </nav>

            {/* Botão Agendar */}
            <button 
              style={{ backgroundColor: '#8CC63F' }}
              className="hidden md:block text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#7AB32F] transition-colors"
            >
              AGENDAR CONSULTA
            </button>

            {/* Menu Mobile */}
            <button 
              className="md:hidden p-2 text-[#8CC63F]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                INÍCIO
              </a>
              <a 
                href="/sobre" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                SOBRE NÓS
              </a>
              <a 
                href="/especialidades" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                ESPECIALIDADES
              </a>
              <a 
                href="/blog" 
                className="text-sm font-medium text-[#8CC63F] hover:text-[#7AB32F] transition-colors"
              >
                BLOG
              </a>
              <button 
                style={{ backgroundColor: '#8CC63F' }}
                className="text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#7AB32F] transition-colors w-full"
              >
                AGENDAR CONSULTA
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

