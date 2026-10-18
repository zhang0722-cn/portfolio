import type { ImgHTMLAttributes } from 'react';

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & { sizes: string };

export default function ResponsiveImage({ src = '', sizes, ...props }: ResponsiveImageProps) {
  const base = src.replace(/\.jpe?g$/i, '');

  return (
    <picture>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={[640, 960, 1440].map((width) => `${base}-${width}.webp ${width}w`).join(', ')}
      />
      <img src={src} sizes={sizes} {...props} />
    </picture>
  );
}
