// src/data/skills.js

const skillsData = {
  "Programming": {
    name: "Programming",
    skills: [
      { name: "Python", proficiency: 95, logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
      { name: "C/C++", proficiency: 88, logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" },
      { name: "JavaScript", proficiency: 92, logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" },
      { name: "TypeScript", proficiency: 85, logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
      { name: "Go", proficiency: 75, logo: "https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png" },
      { name: "Rust", proficiency: 65, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg" },
      { name: "Java", proficiency: 82, logo: "https://www.svgrepo.com/show/184143/java.svg" },
      { name: "SQL", proficiency: 90, logo: "https://www.svgrepo.com/show/331760/sql-database-generic.svg" }
    ]
  },
  "ML & DL": {
    name: "ML & DL",
    skills: [
      { name: "PyTorch", proficiency: 88, logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png" },
      { name: "TensorFlow", proficiency: 85, logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
      { name: "Scikit-Learn", proficiency: 92, logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Computer Vision", proficiency: 78, logo: "https://www.svgrepo.com/show/354945/openvision.svg" },
      { name: "NLP", proficiency: 82, logo: "https://www.svgrepo.com/show/373705/nlp.svg" },
      { name: "MLOps", proficiency: 75, logo: "https://www.svgrepo.com/show/373486/ai-brain-circuit-2.svg" },
      { name: "Data Science", proficiency: 85, logo: "https://www.svgrepo.com/show/354945/openvision.svg" }
    ]
  },
  "Web & DevOps": {
    name: "Web & DevOps",
    skills: [
      { name: "React", proficiency: 90, logo: "https://react.dev/favicon.ico" },
      { name: "Node.js", proficiency: 85, logo: "https://nodejs.org/static/images/favicons/favicon.png" },
      { name: "Docker", proficiency: 88, logo: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
      { name: "Kubernetes", proficiency: 75, logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
      { name: "CI/CD", proficiency: 82, logo: "https://www.svgrepo.com/show/373557/cicd.svg" },
      { name: "AWS", proficiency: 78, logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Next.js", proficiency: 85, logo: "https://assets.vercel.com/image/upload/v1662090959/nextjs/Icon_dark_background.png" }
    ]
  },
  "Hardware": {
    name: "Hardware",
    skills: [
      { name: "FPGA", proficiency: 70, logo: "https://www.svgrepo.com/show/373607/chip.svg" },
      { name: "Verilog", proficiency: 72, logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Verilog_IEEE_1364-2005_logo.svg" },
      { name: "Arduino", proficiency: 85, logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg" },
      { name: "Raspberry Pi", proficiency: 88, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Raspberry_Pi_Logo.svg" },
      { name: "PCB Design", proficiency: 65, logo: "https://www.svgrepo.com/show/373453/pcb.svg" },
      { name: "Embedded Systems", proficiency: 75, logo: "https://www.svgrepo.com/show/373607/chip.svg" }
    ]
  },
  "Data & Storage": {
    name: "Data & Storage",
    skills: [
      { name: "PostgreSQL", proficiency: 88, logo: "https://www.postgresql.org/media/img/about/press/elephant.png" },
      { name: "MongoDB", proficiency: 82, logo: "https://www.svgrepo.com/show/331488/mongodb.svg" },
      { name: "Redis", proficiency: 78, logo: "https://redis.com/wp-content/themes/wpx/assets/images/logo-redis.svg" },
      { name: "Elasticsearch", proficiency: 75, logo: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg" },
      { name: "Neo4j", proficiency: 70, logo: "https://www.vectorlogo.zone/logos/neo4j/neo4j-icon.svg" },
      { name: "DynamoDB", proficiency: 72, logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" }
    ]
  },
  "Cloud": {
    name: "Cloud",
    skills: [
      { name: "AWS", proficiency: 85, logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "GCP", proficiency: 78, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
      { name: "Azure", proficiency: 75, logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
      { name: "Serverless", proficiency: 82, logo: "https://www.svgrepo.com/show/373557/cicd.svg" },
      { name: "Microservices", proficiency: 85, logo: "https://www.svgrepo.com/show/373486/ai-brain-circuit-2.svg" },
      { name: "Cloud Security", proficiency: 78, logo: "https://www.svgrepo.com/show/373486/ai-brain-circuit-2.svg" }
    ]
  }
};

export default skillsData;