// src/data/blogPosts.js

// Sample blog post data (replace with actual data source later, e.g., Markdown files)
const posts = [
  {
    "slug": "v-commerce-studio-gke-hackathon",
    "title": "V-Commerce Studio: Building the Future of E-commerce with Google Cloud",
    "summary": "How a random call turned into an hackathon project, V-Commerce Studio, built entirely on Google's native AI tools for the #GKETurns10 Hackathon.",
    "content": "Blog Post for Entering into the Hackathon: On a random Thursday afternoon, I got a call from Rakesh Elango, who invited me to team up for the #GKETurns10 Hackathon. What started as that simple call evolved into V-Commerce Studio.\n\nThrilled to share what we built for the Hackathon, hosted by Devpost! We (Poujhit MU, Mary Shermila, Ambarish K.C.) envisioned V-Commerce Studio as an AI-powered blueprint for the future of e-commerce (a glorified Shopify, if you may), drawing inspiration from the hyper-personalization of B2C platforms like Amazon and Myntra. We brought this vision to life by orchestrating a unified system entirely within the Google Cloud ecosystem, showcasing the power of its native tools.\n\nWe leveraged a suite of Google's cutting-edge AI to build a truly intelligent platform and managed to deploy it onto Google Kubernetes Engine. Showcasing a couple of features, which we built well under a week here.\n\n- A RAG-driven chat assistant uses Vertex AI and Gemini to provide full product context and handle complex user queries.\n- To boost engagement, we built a proactive engagement and upsell agent with the Agent Development Kit (ADK) that uses Gemini to intelligently \"nudge\" users toward a purchase. How many of y'all have got that one notification from Zomato to place an order? Yes, this is exactly how that works.\n- We also integrated immersive features like virtual try-on using Nano Banana (This one is way too good).\n- And an admin-only ad (Yes, RBAC too) generation tool powered by Veo 3.\n\nWhile concepts like ADK, MCP, A2A seemed really abstract to implement in production scale at first, we are grateful to the team at Google Cloud for providing comprehensive documentation across their services and products, which was immensely helpful to us.\n\nHad a lot of fun building this along with the team!",
    "date": "2025-09-22",
    "initialVotes": 125,
    "type": "article",
    "mediaType": "image",
    "mediaUrl": "/images/blog/Vcommerce-Logo.png",
    "pinned": true
  },
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