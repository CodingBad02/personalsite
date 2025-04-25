// src/components/blog/VoteButton.js
import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

/**
 * Reusable vote button component with loading state
 */
const VoteButton = ({ type, voted, onClick, size = 'small' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Determine which icon to use based on vote type
  const Icon = type === 'up' ? ArrowUpIcon : ArrowDownIcon;
  
  // Determine color based on vote status
  const getColorClass = () => {
    if (isProcessing) return 'text-gray-300';
    if (voted === type) return type === 'up' ? 'text-orange-500' : 'text-blue-500';
    return 'text-gray-400 hover:text-' + (type === 'up' ? 'orange' : 'blue') + '-500';
  };

  // Handle click with processing state
  const handleClick = () => {
    setIsProcessing(true);
    
    // Process vote with a small delay to show loading state
    setTimeout(() => {
      onClick(type);
      setIsProcessing(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1 rounded ${getColorClass()} ${isProcessing ? 'animate-pulse' : ''}`}
      aria-label={type === 'up' ? 'Upvote' : 'Downvote'}
      disabled={isProcessing}
    >
      <Icon className={size === 'small' ? 'h-5 w-5' : 'h-6 w-6'} />
    </button>
  );
};

export default VoteButton;