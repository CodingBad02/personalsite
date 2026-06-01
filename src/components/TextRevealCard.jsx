import React, { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Aceternity UI — Text Reveal Card, ported for this project (no cn/shadcn).
 * Move the cursor across the card to wipe `text` away and reveal `revealText`.
 */
export const TextRevealCard = ({ text, revealText, children, className = '' }) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(width);
    }
  }, []);

  function mouseMoveHandler(event) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={`relative mx-auto w-full max-w-[40rem] overflow-hidden bg-transparent ${className}`}
    >
      {children}

      <div className="relative flex h-40 items-center overflow-hidden">
        <motion.div
          style={{ width: '100%' }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-20 bg-[#f4f4f4] will-change-transform dark:bg-[#08090f]"
        >
          <p className="bg-gradient-to-b from-[#191818] to-[#191818]/65 bg-clip-text py-10 text-center text-base font-bold text-transparent dark:from-white dark:to-neutral-300 sm:text-[3rem]">
            {revealText}
          </p>
        </motion.div>

        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-50 h-40 w-[6px] bg-gradient-to-b from-transparent via-[#1b5def] to-transparent will-change-transform dark:via-[#7cb5ff]"
        />

        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="py-10 text-center text-base font-bold text-[#191818]/15 dark:text-white/15 sm:text-[3rem]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({ children, className = '' }) => (
  <h2 className={`mb-2 text-center text-lg text-[#191818] dark:text-white ${className}`}>{children}</h2>
);

export const TextRevealCardDescription = ({ children, className = '' }) => (
  <p className={`text-center text-sm text-[#191818]/55 dark:text-[#a9a9a9] ${className}`}>{children}</p>
);

const Stars = () => {
  const random = () => Math.random();
  const randomMove = () => random() * 4 - 2;
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          className="bg-[#191818]/40 dark:bg-white/80"
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: random(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
