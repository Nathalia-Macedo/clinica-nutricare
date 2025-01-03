import React from 'react';

function Card({ title, icon, description, backgroundColor, iconColor, titleColor, descriptionColor }) {
  return (
    <div
      className="rounded-2xl p-6 h-full flex flex-col transition-transform hover:scale-105"
      style={{ backgroundColor: backgroundColor || '#000000' }}
    >
      {/* Icon Container */}
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 relative">
          <img
            src={icon}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: iconColor ? `brightness(0) saturate(100%) ${iconColor}` : 'invert(1)' }}
          />
        </div>
      </div>
      
      {/* Title */}
      <h3 
        className="text-xl md:text-2xl font-bold mb-4 text-center"
        style={{ color: titleColor || '#8CC63F' }}
      >
        {title}
      </h3>
      
      {/* Description */}
      <p 
        className="text-base text-center flex-grow"
        style={{ color: descriptionColor || '#FFFFFF' }}
      >
        {description}
      </p>
    </div>
  );
}

export function AboutCards({ cards }) {
  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#8CC63F] mb-12">
        Por que ter acompanhamento nutricional?
      </h2>
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      
      {/* Schedule Button */}
      <div className="mt-12 text-center">
        <button style={{backgroundColor:"#8CC63F"}}
          className="text-white px-8 py-3 rounded-full text-lg font-medium 
                   hover:bg-[#7AB32F] transition-colors duration-300 uppercase"
        >
          Agendar Consulta
        </button>
      </div>
    </section>
  );
}

