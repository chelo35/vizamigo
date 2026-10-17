import React, { useState, useEffect } from 'react';

/**
 * Global in-memory blacklist of verified failed image URLs.
 * Once a URL fails once anywhere in the session, subsequent renders immediately
 * use the safe local fallback without triggering any failed network requests.
 */
export const failedImageUrls = new Set<string>();

export const LOCAL_PLACEHOLDER_FALLBACK = '/placeholder-landscape.svg';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

/**
 * SafeImage Component
 * - Prevents infinite onError loops caused by responsive srcset re-evaluations.
 * - Enforces single-attempt fallback guard via both React state and DOM dataset attribute.
 * - Immediately strips srcset and sizes attributes upon error.
 * - Defaults fallback to local zero-network static SVG asset (/placeholder-landscape.svg).
 * - Consults global failedImageUrls cache to skip known dead URLs completely.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  srcSet,
  sizes,
  fallbackSrc = LOCAL_PLACEHOLDER_FALLBACK,
  onError,
  alt = '',
  className = '',
  ...props
}) => {
  const isBlacklisted = Boolean(src && failedImageUrls.has(src));
  const [hasError, setHasError] = useState(isBlacklisted);

  useEffect(() => {
    if (src && failedImageUrls.has(src)) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;

    // Record original URL in global failure blacklist
    if (src) {
      failedImageUrls.add(src);
    }

    // Dataset guard: Stop completely if element has already undergone fallback
    if (target.dataset.fallbackApplied === 'true') {
      target.onerror = null;
      return;
    }

    target.dataset.fallbackApplied = 'true';

    // Crucial: remove responsive srcset & sizes to stop browser re-requesting dead URL
    target.removeAttribute('srcset');
    target.removeAttribute('sizes');

    // Switch to local static SVG fallback
    target.src = fallbackSrc;

    setHasError(true);

    if (onError) {
      try {
        onError(e);
      } catch (err) {
        console.warn('[SafeImage] Custom onError callback error:', err);
      }
    }
  };

  const effectiveSrc = hasError ? fallbackSrc : (src || fallbackSrc);
  const effectiveSrcSet = hasError ? undefined : srcSet;
  const effectiveSizes = hasError ? undefined : sizes;

  return (
    <img
      src={effectiveSrc}
      srcSet={effectiveSrcSet}
      sizes={effectiveSizes}
      alt={alt}
      className={className}
      onError={handleError}
      data-fallback-applied={hasError ? 'true' : undefined}
      {...props}
    />
  );
};

export default SafeImage;
