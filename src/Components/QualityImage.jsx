import React, { useEffect, useRef, useState } from "react";

const HighQualityImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    // Renderiza a imagem no <canvas> para maior controle de qualidade
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      if (imgRef.current) {
        imgRef.current.style.opacity = 1;
      }
      // Renderiza no canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder enquanto a imagem carrega */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Canvas para renderização de alta qualidade */}
      <canvas
        ref={canvasRef}
        width={1920} // Altere conforme o tamanho esperado
        height={1080} // Altere conforme o tamanho esperado
        className={`${className} absolute inset-0 w-full h-full`}
        style={{
          objectFit: "cover",
        }}
      />

      {/* Tag <img> com otimizações adicionais */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        srcSet={`${src}?w=480 480w, ${src}?w=768 768w, ${src}?w=1080 1080w`}
        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1080px"
        loading="lazy"
        decoding="async"
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          objectFit: "cover",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
          WebkitFontSmoothing: "antialiased",
          imageRendering: "auto",
        }}
      />
    </div>
  );
};

export default HighQualityImage;
