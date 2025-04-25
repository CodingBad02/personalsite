// src/hooks/useVoting.js
import { useState, useEffect } from 'react';
import { getStoredVote, getVoteCount, handleVoteAction } from '../utils/voteUtils';

/**
 * Custom hook for handling post voting with localStorage persistence
 * 
 * @param {Object} post - The post object containing slug and initialVotes
 * @returns {Object} - Vote state and handler function
 */
const useVoting = (post) => {
  const [votes, setVotes] = useState(post?.initialVotes || 0);
  const [voted, setVoted] = useState(null); // 'up', 'down', or null

  // Load stored vote on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && post?.slug) {
      const storedVote = getStoredVote(post.slug);
      const storedCount = getVoteCount(post.slug, post.initialVotes || 0);
      
      setVoted(storedVote);
      setVotes(storedCount);
    }
  }, [post]);

  const handleVote = (type) => {
    if (!post?.slug) return;
    
    const result = handleVoteAction(post.slug, type, voted, votes);
    setVoted(result.vote);
    setVotes(result.count);
  };

  return {
    votes,
    voted,
    handleVote
  };
};

export default useVoting;