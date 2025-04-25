// src/data/blogPosts.js

// Sample blog post data (replace with actual data source later, e.g., Markdown files)
const posts = [
  {
    slug: 'first-post',
    title: 'My First Blog Post',
    summary: 'This is a short summary of my very first blog post. It talks about exciting things!',
    content: 'I have always wanted to write a blog post, but I never knew where to start. Everday, we wake up to a new model or a groundbreaking research. Now is not the time to slack off. Lets keep this space active, discuss new stuff and upvote (Very Reddit Inspired, I know) what you like.',
    date: '2025-04-25',
    initialVotes: 15,
    type: 'article', // 'article' or 'byte'
    mediaType: 'image', // 'image', 'youtube', or null
    mediaUrl: '/images/blog/blogimage.png', // URL for image or YouTube video ID
    pinned: true, // Whether this post should be pinned to the top
  },
  {
    slug: 'quick-thought',
    title: '#ManjuFinds - A Hidden gem of Jesudas hidden in the depths of YT',
    summary: '#ManjuFinds is a small series where I bring to you little stuff that might interest a very small niche of people sharing similar interests as mine :)',
    content: 'Sometimes a Retro Jesudas Composition is what makes the difference between a Mid day and a great day :)',
    date: '2025-04-25',
    initialVotes: 5,
    type: 'byte', // 'article' or 'byte'
    mediaType: 'youtube',
    mediaUrl: 'x_GH5cJ5CPI',
    pinned: false
  },
];

// Function to get all posts (pinned posts first, then sorted by date descending)
export function getAllPosts() {
  return [...posts].sort((a, b) => {
    // First sort by pinned status (pinned posts come first)
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then sort by date (newest first)
    return new Date(b.date) - new Date(a.date);
  });
}

// Function to get a single post by its slug
export function getPostBySlug(slug) {
  return posts.find(post => post.slug === slug);
}

// Function to get all post slugs (for Next.js static generation)
export function getAllPostSlugs() {
  return posts.map(post => post.slug);
}