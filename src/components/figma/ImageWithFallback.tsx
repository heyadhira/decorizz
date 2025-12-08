import React, { useEffect, useRef, useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { src, alt, className = "", style, loading, decoding, ...rest } = props;

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const onLoad = () => setLoaded(true);
    el.addEventListener("load", onLoad);

    return () => {
      el.removeEventListener("load", onLoad);
    };
  }, [src]);

  // If image failed → Show fallback box
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={style}
      >
        <img
          src={ERROR_IMG_SRC}
          alt="Failed to load"
          className="w-10 h-10 opacity-70"
          data-original-url={src}
        />
      </div>
    );
  }

  // Render main image
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={style}
      loading={loading ?? "lazy"}
      decoding={decoding ?? "async"}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
