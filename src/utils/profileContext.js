// src/utils/profileContext.js
// Deterministic profile context assembled once at module load.
// Used as grounding for the "Ask Sun" assistant (src/pages/api/ask.js).
import experienceData from '../data/experience';
import projectsData from '../data/projects';
import skillsData from '../data/skills';
import publicationsData from '../data/publications';

// Authoritative, hand-written summary — the source of truth for positioning.
// Overrides anything stale in the data files.
export const BIO = `Manjunathan Radhakrishnan is an AI Solutions Architect who builds AI products people actually use, with a mission of making businesses AI-native.
He is currently AI Research Architect at Antz AI (since July 2025), where he shipped Budhi AI (a second-memory app, 1000+ downloads) and Planr AI (a manufacturing decision-intelligence platform).
He is a customer-facing architect specializing in production Agentic AI, RAG/search systems, and workflow automation, and has delivered measurable ROI for 17+ enterprise clients across E-commerce, Insurance, Healthcare, Mortgage, and Operations.
Highlights: 1000+ app downloads, 92%+ RAG retrieval precision, 17+ enterprise/Fortune 500 clients, APAC winner of the GKE Turns 10 Hackathon (2025), Smart India Hackathon 2022 winner, two-time MADHACK winner (2023, 2024), and an IEEE-published researcher.
Education: B.E. Electronics & Communication, SSN College of Engineering (2019-2023), CGPA 9.02/10.
Based in Hyderabad, India; open to remote collaboration. Reach him at manjunathan.ai02@gmail.com.`;

function buildExperience() {
  return experienceData
    .map((e) => `- ${e.position} @ ${e.company} (${e.date}): ${e.description.join(' ')}`)
    .join('\n');
}

function buildProjects() {
  return projectsData
    .map((p) => `- ${p.title}: ${p.description} [${p.technologies.join(', ')}]`)
    .join('\n');
}

function buildSkills() {
  return Object.values(skillsData)
    .map((cat) => `- ${cat.name}: ${cat.skills.map((s) => s.name).join(', ')}`)
    .join('\n');
}

function buildPublications() {
  return publicationsData
    .map((p) => `- "${p.title}" — ${p.conference} (${p.date}).`)
    .join('\n');
}

export const PROFILE_CONTEXT = `## Bio
${BIO}

## Experience
${buildExperience()}

## Projects
${buildProjects()}

## Skills
${buildSkills()}

## Publications
${buildPublications()}`;

export default PROFILE_CONTEXT;
