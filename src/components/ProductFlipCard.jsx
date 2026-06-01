import React, { useState } from 'react';
import { FiArrowUpRight, FiRepeat } from 'react-icons/fi';

/**
 * Flip card for shipped products (hiartem-style tile). Theme-aware surface.
 * Front: header (title) + logo floating on a soft panel + category line.
 * Back: description, features, external link.
 * `invertDark`: flip monochrome (black) logos to white in dark mode so they stay visible.
 */
export default function ProductFlipCard({
  title,
  tag,
  image,
  mark,
  invertDark = false,
  description,
  features = [],
  href,
  cta = 'Read more',
}) {
  const [flipped, setFlipped] = useState(false);

  const faceBase =
    'absolute inset-0 h-full w-full overflow-hidden rounded-2xl ' +
    'border border-line-light dark:border-line-dark ' +
    'bg-gradient-to-b from-surface-light to-background-light dark:from-surface-dark dark:to-background-dark ' +
    'text-text-light dark:text-text-dark shadow-sm transition-shadow duration-500 ' +
    'group-hover:shadow-lg dark:group-hover:shadow-xl [backface-visibility:hidden]';

  return (
    <div
      className="group relative h-[400px] w-full [perspective:2000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
          flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        }`}
      >
        {/* FRONT */}
        <div className={`${faceBase} [transform:rotateY(0deg)] flex flex-col`}>
          <div className="px-5 py-4 border-b border-line-light dark:border-line-dark">
            <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
          </div>

          <div className="relative flex flex-1 items-center justify-center p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(55% 45% at 50% 45%, rgba(133,125,250,0.16) 0%, rgba(133,125,250,0) 70%)' }}
            />
            {image ? (
              <img
                src={image}
                alt={title}
                className={`relative max-h-28 w-auto max-w-[80%] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.04] ${invertDark ? 'dark:invert' : ''}`}
              />
            ) : (
              <span className="relative font-heading text-3xl font-semibold tracking-tight drop-shadow-sm">{mark || title}</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{tag}</p>
            <FiRepeat className="h-4 w-4 shrink-0 text-primary-light dark:text-primary-dark transition-transform duration-300 group-hover:-rotate-12" />
          </div>
        </div>

        {/* BACK */}
        <div className={`${faceBase} [transform:rotateY(180deg)] flex flex-col p-6`}>
          <div className="flex-1 space-y-4">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">{description}</p>
            </div>
            <div className="space-y-1.5">
              {features.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: flipped ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: flipped ? 1 : 0,
                    transitionDelay: `${i * 50 + 150}ms`,
                  }}
                >
                  <FiArrowUpRight className="h-3.5 w-3.5 text-primary-light dark:text-primary-dark" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/cta mt-5 flex items-center justify-between rounded-xl border border-line-light dark:border-line-dark bg-background-light/50 dark:bg-background-dark/40 px-3 py-2.5 text-sm font-medium transition-all hover:border-primary-light dark:hover:border-primary-dark hover:bg-primary-light/5 dark:hover:bg-primary-dark/10"
            >
              <span className="group-hover/cta:text-primary-light dark:group-hover/cta:text-primary-dark transition-colors">{cta}</span>
              <FiArrowUpRight className="h-4 w-4 text-primary-light dark:text-primary-dark transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
