// src/utils/voteUtils.js

/**
 * Utility functions for handling post voting with localStorage persistence
 */

// Prefix for localStorage keys to avoid conflicts
const VOTE_KEY_PREFIX = 'blog_vote_';

/**
 * Get the stored vote for a post
 * @param {string} postSlug - The unique slug of the post
 * @returns {string|null} - 'up', 'down', or null if no vote
 */
export const getStoredVote = (postSlug) => {
  if (typeof window === 'undefined') return null; // Server-side check
  
  try {
    return localStorage.getItem(`${VOTE_KEY_PREFIX}${postSlug}`);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

/**
 * Store a vote for a post
 * @param {string} postSlug - The unique slug of the post
 * @param {string|null} voteType - 'up', 'down', or null to clear vote
 */
export const storeVote = (postSlug, voteType) => {
  if (typeof window === 'undefined') return; // Server-side check
  
  try {
    if (voteType === null) {
      localStorage.removeItem(`${VOTE_KEY_PREFIX}${postSlug}`);
    } else {
      localStorage.setItem(`${VOTE_KEY_PREFIX}${postSlug}`, voteType);
    }
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

/**
 * Get the current vote count for a post
 * @param {string} postSlug - The unique slug of the post
 * @param {number} initialVotes - The initial vote count from the data
 * @returns {number} - The current vote count
 */
export const getVoteCount = (postSlug, initialVotes = 0) => {
  if (typeof window === 'undefined') return initialVotes; // Server-side check
  
  try {
    const storedCount = localStorage.getItem(`${VOTE_KEY_PREFIX}${postSlug}_count`);
    return storedCount !== null ? parseInt(storedCount, 10) : initialVotes;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return initialVotes;
  }
};

/**
 * Store the vote count for a post
 * @param {string} postSlug - The unique slug of the post
 * @param {number} count - The vote count to store
 */
export const storeVoteCount = (postSlug, count) => {
  if (typeof window === 'undefined') return; // Server-side check
  
  try {
    localStorage.setItem(`${VOTE_KEY_PREFIX}${postSlug}_count`, count.toString());
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

/**
 * Handle a vote action and update storage
 * @param {string} postSlug - The unique slug of the post
 * @param {string} voteType - 'up' or 'down'
 * @param {string|null} currentVote - The current vote status ('up', 'down', or null)
 * @param {number} currentCount - The current vote count
 * @returns {Object} - The new vote status and count
 */
export const handleVoteAction = (postSlug, voteType, currentVote, currentCount) => {
  let newVote = currentVote;
  let newCount = currentCount;
  
  if (voteType === 'up') {
    if (currentVote === 'up') {
      newCount -= 1;
      newVote = null;
    } else if (currentVote === 'down') {
      newCount += 2;
      newVote = 'up';
    } else {
      newCount += 1;
      newVote = 'up';
    }
  } else if (voteType === 'down') {
    if (currentVote === 'down') {
      newCount += 1;
      newVote = null;
    } else if (currentVote === 'up') {
      newCount -= 2;
      newVote = 'down';
    } else {
      newCount -= 1;
      newVote = 'down';
    }
  }
  
  // Update localStorage
  storeVote(postSlug, newVote);
  storeVoteCount(postSlug, newCount);
  
  return { vote: newVote, count: newCount };
};