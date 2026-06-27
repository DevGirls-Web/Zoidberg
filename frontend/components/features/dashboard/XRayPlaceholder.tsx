interface XRayPlaceholderProps {
  imageUrl?: string;
  alt?: string;
  showOverlay?: boolean;
}

export function XRayPlaceholder({ 
  imageUrl, 
  alt = "Radiographie pulmonaire",
  showOverlay = false 
}: XRayPlaceholderProps) {
  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {showOverlay && (
        <div
          className="absolute inset-0 mix-blend-multiply rounded-[16px]"
          style={{ background: "linear-gradient(44deg, rgba(244,114,182,0) 0%, rgba(244,114,182,0.15) 60%, rgba(244,114,182,0) 100%)" }}
        />
      )}
    </div>
  );
}