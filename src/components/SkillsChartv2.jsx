import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../utils/theme-context';
import skillsData from '../data/skills';

// Main Skills Radar Chart Component
const SkillsRadarChart = memo(({ gridLevels = 6, animationDuration = 1200 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillPoints, setSkillPoints] = useState([]);
  const [size, setSize] = useState({ width: 900, height: 900 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef(null);
  const imageCache = useRef({});

  // Preload logos
  useEffect(() => {
    Object.values(skillsData).forEach(domain => {
      domain.skills.forEach(skill => {
        if (skill.logo && !imageCache.current[skill.name]) {
          const img = new Image();
          img.src = skill.logo;
          img.onerror = () => {
            img.src = 'https://via.placeholder.com/40';
          };
          imageCache.current[skill.name] = img;
        }
      });
    });
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        const width = container.clientWidth;
        setSize({ width, height: Math.min(width, 900) });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation effect
  useEffect(() => {
    if (inView && animationProgress < 1) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        setAnimationProgress(progress);
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [inView, animationDuration]);

  // Draw radar chart
  useEffect(() => {
    if (!inView || !canvasRef.current || !skillsData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = size;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;

    // High-DPI setup
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, width, height);

    const domains = Object.keys(skillsData);
    const domainCount = domains.length;
    const domainAngles = domains.reduce((acc, domain, i) => {
      acc[domain] = (i * 2 * Math.PI / domainCount) - Math.PI / 2;
      return acc;
    }, {});

    // Draw grid and labels
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let level = 1; level <= gridLevels; level++) {
      const levelRadius = (radius * level) / (gridLevels - 1);
      ctx.beginPath();
      domains.forEach((domain, i) => {
        const angle = domainAngles[domain];
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      if (level < gridLevels) {
        ctx.stroke();
        
        ctx.font = '11px Arial';
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        ctx.textAlign = 'center';
        const percentage = ((level / (gridLevels - 1)) * 100).toFixed(0);
        if (percentage <= 100) {
          ctx.fillText(`${percentage}%`, centerX, centerY - levelRadius + 15);
        }
      }
    }

    // Draw domain axes
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    domains.forEach(domain => {
      const angle = domainAngles[domain];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      ctx.stroke();
    });

    // Draw domain labels
    ctx.font = 'bold 14px Arial';
    domains.forEach(domain => {
      const angle = domainAngles[domain];
      const labelRadius = radius + 40;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      const label = skillsData[domain].name;
      const metrics = ctx.measureText(label);

      ctx.fillStyle = theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect?.(x - metrics.width / 2 - 8, y - 10, metrics.width + 16, 20, 5) ||
        ctx.rect(x - metrics.width / 2 - 8, y - 10, metrics.width + 16, 20);
      ctx.fill();

      ctx.fillStyle = theme === 'dark' ? '#e2e8f0' : '#1e293b';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y);
    });

    // Draw skills web and collect points
    const points = [];
    domains.forEach(domain => {
      const skills = skillsData[domain].skills || [];
      const angle = domainAngles[domain];
      const sectionAngle = (2 * Math.PI) / domainCount;
      const domainPoints = skills.map((skill, i) => {
        const skillAngle = angle - sectionAngle / 2 + ((i + 1) * sectionAngle / (skills.length + 1));
        const skillRadius = Math.min(
          (radius * Math.min(skill.proficiency || 0, 100) * animationProgress) / 100,
          radius
        );
        const x = centerX + skillRadius * Math.cos(skillAngle);
        const y = centerY + skillRadius * Math.sin(skillAngle);
        return { x, y, ...skill, domain, angle: skillAngle, radius: skillRadius };
      });

      // Draw domain connections
      if (domainPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(domainPoints[0].x, domainPoints[0].y);
        domainPoints.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
        const gradient = ctx.createLinearGradient(
          centerX + radius * Math.cos(angle - sectionAngle / 2),
          centerY + radius * Math.sin(angle - sectionAngle / 2),
          centerX + radius * Math.cos(angle + sectionAngle / 2),
          centerY + radius * Math.sin(angle + sectionAngle / 2)
        );
        gradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.4)');
        gradient.addColorStop(1, theme === 'dark' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(219, 39, 119, 0.4)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw skill points
      domainPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 4);
        gradient.addColorStop(0, theme === 'dark' ? '#a78bfa' : '#9f67fa');
        gradient.addColorStop(1, theme === 'dark' ? '#8b5cf6' : '#7c3aed');
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add hover glow
        if (hoveredSkill?.name === point.name) {
          const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 25);
          glowGradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.4)');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 25, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
      points.push(...domainPoints);
    });

    setSkillPoints(points);

    // Draw inner gradient web
    ctx.beginPath();
    let firstPoint = true;
    domains.forEach(domain => {
      const skills = skillsData[domain].skills || [];
      if (skills.length === 0) return;

      skills.forEach((skill, i) => {
        const angle = domainAngles[domain];
        const sectionAngle = (2 * Math.PI) / domainCount;
        const skillAngle = angle - sectionAngle / 2 + ((i + 1) * sectionAngle / (skills.length + 1));
        const skillRadius = Math.min(
          (radius * Math.min(skill.proficiency || 0, 100) * animationProgress) / 100,
          radius
        );
        const x = centerX + skillRadius * Math.cos(skillAngle);
        const y = centerY + skillRadius * Math.sin(skillAngle);
        
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      });
    });
    ctx.closePath();

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.25)');
    gradient.addColorStop(1, theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = theme === 'dark' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [size, theme, hoveredSkill, inView, animationProgress, gridLevels]);

  // Mouse and keyboard handlers
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const found = skillPoints.find(point => Math.hypot(point.x - x, point.y - y) < 15);
    setHoveredSkill(found || null);
    canvasRef.current.style.cursor = found ? 'pointer' : 'default';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && skillPoints.length) {
      e.preventDefault();
      const currentIndex = hoveredSkill ? skillPoints.findIndex(p => p.name === hoveredSkill.name) : -1;
      const nextIndex = (currentIndex + 1) % skillPoints.length;
      setHoveredSkill(skillPoints[nextIndex]);
    }
  };

  return (
    <div className="space-y-12">
      <motion.div
        ref={ref}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        role="img"
        aria-label="Radar chart displaying skills proficiency"
      >
        <canvas
          ref={canvasRef}
          width={size.width}
          height={size.height}
          onMouseMove={handleMouseMove}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="w-full focus:outline-none"
        />

        {skillPoints.map((point) => {
          const logoUrl = point.logo || 'https://via.placeholder.com/40';
          return (
            <motion.div
              key={`${point.domain}-${point.name}`}
              className="absolute pointer-events-none"
              style={{
                left: point.x,
                top: point.y,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: hoveredSkill?.name === point.name ? 10 : 1,
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: hoveredSkill?.name === point.name ? 1 : 0.7,
                opacity: hoveredSkill?.name === point.name ? 1 : 0.3
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={logoUrl}
                alt={point.name}
                className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 p-1 shadow-lg border-2 border-purple-500 transition-all duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/40';
                }}
              />
            </motion.div>
          );
        })}

        {/* New Skill Card */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              key={hoveredSkill.name}
              className="absolute bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg"
              style={{
                left: hoveredSkill.x + 30, // Offset to the right of the logo
                top: hoveredSkill.y - 60,  // Positioned above the logo
                zIndex: 20,               // Ensure it appears above other elements
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                {hoveredSkill.name}
              </h3>
              <div className="mt-2">
                <div className="bg-gray-200 dark:bg-slate-700 h-2 rounded-full">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${hoveredSkill.proficiency}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Proficiency: {hoveredSkill.proficiency}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Individual Domain Radar Charts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8 gradient-text">Skills by Domain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.keys(skillsData).map(domainKey => (
            <DomainSkillChart 
              key={domainKey} 
              domain={skillsData[domainKey]} 
              domainKey={domainKey} 
              animationDuration={animationDuration}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// Individual Domain Radar Chart Component
const DomainSkillChart = memo(({ domain, domainKey, animationDuration = 1200 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillPoints, setSkillPoints] = useState([]);
  const [size, setSize] = useState({ width: 350, height: 350 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef(null);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        const width = container.clientWidth;
        setSize({ width, height: width });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation effect
  useEffect(() => {
    if (inView && animationProgress < 1) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        setAnimationProgress(progress);
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [inView, animationDuration]);

  // Draw individual domain radar chart
  useEffect(() => {
    if (!inView || !canvasRef.current || !domain.skills) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = size;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    // High-DPI setup
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, width, height);

    const skills = domain.skills;
    const skillCount = skills.length;
    const skillAngles = skills.reduce((acc, skill, i) => {
      acc[skill.name] = (i * 2 * Math.PI / skillCount) - Math.PI / 2;
      return acc;
    }, {});

    // Draw grid circles
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius * level) / 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw percentage labels
      if (level < 5) {
        ctx.font = '10px Arial';
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        ctx.textAlign = 'center';
        const percentage = ((level / 4) * 100).toFixed(0);
        ctx.fillText(`${percentage}%`, centerX, centerY - levelRadius + 12);
      }
    }

    // Draw skill axes
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    skills.forEach((skill) => {
      const angle = skillAngles[skill.name];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      ctx.stroke();
    });

    // Draw skill labels
    ctx.font = '11px Arial';
    skills.forEach((skill) => {
      const angle = skillAngles[skill.name];
      const labelRadius = radius + 20;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      
      // Background for label
      const metrics = ctx.measureText(skill.name);
      ctx.fillStyle = theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect?.(x - metrics.width / 2 - 4, y - 8, metrics.width + 8, 16, 4) ||
        ctx.rect(x - metrics.width / 2 - 4, y - 8, metrics.width + 8, 16);
      ctx.fill();
      
      // Label text
      ctx.fillStyle = theme === 'dark' ? '#e2e8f0' : '#1e293b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, x, y);
    });

    // Draw skill points and collect them
    const points = [];
    skills.forEach((skill) => {
      const angle = skillAngles[skill.name];
      const skillRadius = Math.min(
        (radius * Math.min(skill.proficiency || 0, 100) * animationProgress) / 100,
        radius
      );
      const x = centerX + skillRadius * Math.cos(angle);
      const y = centerY + skillRadius * Math.sin(angle);
      
      // Draw point
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
      gradient.addColorStop(0, theme === 'dark' ? '#a78bfa' : '#9f67fa');
      gradient.addColorStop(1, theme === 'dark' ? '#8b5cf6' : '#7c3aed');
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add hover glow if hovered
      if (hoveredSkill?.name === skill.name) {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        glowGradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.4)');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      points.push({ x, y, ...skill, domain: domainKey });
    });
    
    setSkillPoints(points);

    // Draw skill web (polygon connecting all points)
    if (points.length > 2) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.25)');
      gradient.addColorStop(1, theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Stroke with gradient
      ctx.strokeStyle = theme === 'dark' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [size, theme, hoveredSkill, inView, animationProgress, domain, domainKey]);

  // Mouse handler
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const found = skillPoints.find(point => Math.hypot(point.x - x, point.y - y) < 15);
    setHoveredSkill(found || null);
    canvasRef.current.style.cursor = found ? 'pointer' : 'default';
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm rounded-xl p-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-xl font-bold text-center mb-4 gradient-text">{domain.name}</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size.width}
          height={size.height}
          onMouseMove={handleMouseMove}
          className="w-full focus:outline-none"
        />
        
        {/* Skill proficiency tooltip */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              key={hoveredSkill.name}
              className="absolute bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg text-xs z-10"
              style={{
                left: hoveredSkill.x + 10,
                top: hoveredSkill.y - 30,
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-medium">{hoveredSkill.proficiency}%</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

SkillsRadarChart.displayName = 'SkillsRadarChart';
DomainSkillChart.displayName = 'DomainSkillChart';

export default SkillsRadarChart;