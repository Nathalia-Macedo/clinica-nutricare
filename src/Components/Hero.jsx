// import React, { useEffect, useRef, useState } from 'react';
// import { useSlidesData, useSiteLoading, useSiteError } from '../Context/SiteContext';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Pagination, Autoplay } from 'swiper/modules';
// import slide1 from '../Assets/Slide1.jpg';
// import slide2 from '../Assets/Slide 2.jpg';

// // Local images array
// const localImages = [
//   slide1,
//   slide2
// ];

// const HighQualityImage = ({ src, alt, className }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     if (!src) return;

//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       setIsLoaded(true);
//       if (imgRef.current) {
//         imgRef.current.style.opacity = 1;
//       }
//     };
//   }, [src]);

//   return (
//     <div className="relative w-full h-full">
//       {!isLoaded && (
//         <div className="absolute inset-0 bg-gray-200 animate-pulse" />
//       )}
//       <img
//         ref={imgRef}
//         src={src}
//         alt={alt}
//         className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
//         style={{
//           transform: 'translateZ(0)',
//           backfaceVisibility: 'hidden',
//           perspective: 1000,
//           WebkitFontSmoothing: 'antialiased',
//           imageRendering: 'crisp-edges'
//         }}
//       />
//     </div>
//   );
// };

// export function Hero() {
//   const slides = useSlidesData();
//   const loading = useSiteLoading();
//   const error = useSiteError();
//   const swiperRef = useRef(null);

//   // Combine local and API slides
//   const combinedSlides = slides?.map((slide, index) => ({
//     ...slide,
//     image: index < localImages.length ? localImages[index] : slide.image
//   })) || [];

//   if (loading) {
//     return (
//       <div className="w-full h-[calc(100vh-116px)] bg-gray-100 animate-pulse flex items-center justify-center">
//         <div className="text-gray-500">Carregando...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-[calc(100vh-116px)] bg-red-50 flex items-center justify-center">
//         <div className="text-red-500">Erro ao carregar os slides: {error}</div>
//       </div>
//     );
//   }

//   if (!combinedSlides || combinedSlides.length === 0) {
//     return (
//       <div className="w-full h-[calc(100vh-116px)] bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-500">Nenhum slide disponível.</div>
//       </div>
//     );
//   }

//   return (
//     <section className="relative w-full h-[calc(100vh-116px)] overflow-hidden">
//       <Swiper
//         ref={swiperRef}
//         modules={[Pagination, Autoplay]}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//           renderBullet: (index, className) => {
//             return `<span class="${className}" style="background-color: #8CC63F;"></span>`;
//           },
//         }}
//         className="w-full h-full !absolute inset-0"
//         watchSlidesProgress={true}
//         preloadImages={true}
//         updateOnImagesReady={true}
//       >
//         {combinedSlides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-full">
//               {/* Background Image with Overlay */}
//               <div className="absolute inset-0">
//                 <HighQualityImage
//                   src={slide.image || 'https://via.placeholder.com/1920x1080'}
//                   alt={slide.title}
//                   className="w-full h-full object-cover"
//                 />
//                 {index === 0 && (
//                   <div 
//                     className="absolute inset-0" 
//                     style={{ 
//                       background: 'linear-gradient(90deg, rgba(140, 198, 63, 0.9) 0%, rgba(140, 198, 63, 0.8) 100%)'
//                     }}
//                   />
//                 )}
//               </div>

//               {/* Content */}
//               <div style={{height:"85vh"}} className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                 <div className="flex flex-col max-w-2xl">
//                   {index === 0 ? (
//                     <>
//                       <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
//                         {slide.title}
//                       </h1>
//                       <p className="text-sm md:text-base text-white mb-4">
//                         {slide.description}
//                       </p>
//                       {slide.buttonText && (
//                         <a
//                           href={slide.buttonLink || '#'}
//                           className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-[#8CC63F] bg-white hover:bg-gray-50 transition-colors w-32"
//                         >
//                           {slide.buttonText}
//                         </a>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
//                         {slide.title}
//                       </h1>
//                       <p className="text-base md:text-lg text-white mb-6">
//                         {slide.description}
//                       </p>
//                       {slide.buttonText && (
//                         <a
//                           href={slide.buttonLink || '#'}
//                           className="inline-flex items-center justify-center px-5 py-1.5 border border-transparent text-sm font-medium rounded-full text-[#8CC63F] bg-white hover:bg-gray-50 transition-colors w-40"
//                         >
//                           {slide.buttonText}
//                         </a>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import { useSlidesData, useSiteLoading, useSiteError } from '../Context/SiteContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';


const HighQualityImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      if (imgRef.current) {
        imgRef.current.style.opacity = 1;
      }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitFontSmoothing: 'antialiased',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
};

export function Hero() {
  const slides = useSlidesData();
  const loading = useSiteLoading();
  const error = useSiteError();
  const swiperRef = useRef(null);

  // Combine local and API slides
  const combinedSlides = slides;

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-116px)] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-116px)] bg-red-50 flex items-center justify-center">
        <div className="text-red-500">Erro ao carregar os slides: {error}</div>
      </div>
    );
  }

  if (!combinedSlides || combinedSlides.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-116px)] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Nenhum slide disponível.</div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[calc(100vh-116px)] overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: #8CC63F;"></span>`;
          },
        }}
        className="w-full h-full !absolute inset-0"
        watchSlidesProgress={true}
        preloadImages={true}
        updateOnImagesReady={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <HighQualityImage
                  src={slide.image || 'https://via.placeholder.com/1920x1080'}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: 'linear-gradient(90deg, rgba(140, 198, 63, 0.9) 0%, rgba(140, 198, 63, 0.8) 100%)'
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{height:"85vh"}} className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="flex flex-col max-w-2xl">
                  {index === 0 ? (
                    <>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                        {slide.title}
                      </h1>
                      <p className="text-sm md:text-base text-white mb-4">
                        {slide.description}
                      </p>
                      {slide.buttonText && (
                        <a
                          href={slide.buttonLink || '#'}
                          className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-[#8CC63F] bg-white hover:bg-gray-50 transition-colors w-32"
                        >
                          {slide.buttonText}
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-lg text-white mb-6">
                        {slide.description}
                      </p>
                      {slide.buttonText && (
                        <a
                          href={slide.buttonLink || '#'}
                          className="inline-flex items-center justify-center px-5 py-1.5 border border-transparent text-sm font-medium rounded-full text-[#8CC63F] bg-white hover:bg-gray-50 transition-colors w-40"
                        >
                          {slide.buttonText}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

