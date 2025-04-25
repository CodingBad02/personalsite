import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiChevronDown, FiInstagram } from 'react-icons/fi';
import { useTheme } from '../utils/theme-context';

// Define Particle class outside of useEffect
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = '#7C3AED'; // Primary color
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > this.canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY = -this.speedY;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const Hero = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles
    function initParticles() {
      particles = [];
      const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 10000), 100);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas));
      }
    }
    
    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 150;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.4})`; // Primary color with opacity
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary-light dark:text-primary-dark font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 relative">
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.span 
                    key="alter-ego"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="gradient-text block py-2"
                  >
                    CodingBad02
                  </motion.span>
                ) : (
                  <motion.span 
                    key="real-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    Manjunathan<br />
                    <span className="gradient-text">Radhakrishnan</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
              Machine Learning Engineer & Researcher
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Building intelligent systems and developing cutting-edge ML solutions 
              for real-world applications. Currently focused on agentic architectures 
              and large language models.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
            
            <div className="flex mt-10 space-x-6 justify-center">
              <a 
                href="https://github.com/CodingBad02" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/manjunathan-r-06396b1b7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/koffeewith.ai?igsh=MXF4bTk2MnB5Mzd3cA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:manjunathan.ai02@gmail.com" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="Email"
              >
                <FiMail className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <FiChevronDown className="h-6 w-6 text-primary-light dark:text-primary-dark" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;