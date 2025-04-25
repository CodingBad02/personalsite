// src/components/blog/VoteCounter.js
import React, { useEffect, useState } from 'react';

/**
 * A component to display vote counts with a subtle animation when the count changes
 */
const VoteCounter = ({ count, size = 'small' }) => {
  const [prevCount, setPrevCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Detect changes in vote count to trigger animation
  useEffect(() => {
    if (count !== prevCount) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevCount(count);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count, prevCount]);

  // Determine animation class based on vote direction
  const getAnimationClass = () => {
    if (!isAnimating) return '';
    return count > prevCount ? 'text-orange-500 animate-bounce' : 'text-blue-500 animate-pulse';
  };

  // Determine size class
  const sizeClass = size === 'small' ? 'text-sm' : 'text-lg';

  return (
    <span className={`font-bold ${sizeClass} my-1 dark:text-gray-200 transition-colors duration-300 ${getAnimationClass()}`}>
      {count}
    </span>
  );
};

export default VoteCounter;