import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../utils/theme-context';
import skillsData from '../data/skills';

const SkillsRadarChart = memo(({ gridLevels = 6, animationDuration = 1200 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillPoints, setSkillPoints] = useState([]);
  const [size, setSize] = useState({ width: 700, height: 700 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        const width = container.clientWidth;
        setSize({ width, height: Math.min(width, 700) });
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

  // Draw the radar chart
  useEffect(() => {
    if (!inView || !canvasRef.current || !skillsData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = size;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.65;

    // Set canvas dimensions for high-DPI displays
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

    // Draw background grid
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
        // Ensure skill radius doesn't exceed the maximum radius
        const skillRadius = Math.min(
          (radius * Math.min(skill.proficiency || 0, 100) * animationProgress) / 100,
          radius
        );
        const x = centerX + skillRadius * Math.cos(skillAngle);
        const y = centerY + skillRadius * Math.sin(skillAngle);
        return { x, y, ...skill, domain, angle: skillAngle, radius: skillRadius };
      });

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

      domainPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 4);
        gradient.addColorStop(0, theme === 'dark' ? '#a78bfa' : '#9f67fa');
        gradient.addColorStop(1, theme === 'dark' ? '#8b5cf6' : '#7c3aed');
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (hoveredSkill?.name === point.name) {
          const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 25);
          glowGradient.addColorStop(0, theme === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.4)');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 25, 0, 2 * Math.PI);
          ctx.fill();

          const tooltipWidth = 200;
          const tooltipHeight = 90;
          let tooltipX = point.x + 20;
          let tooltipY = point.y - tooltipHeight - 10;
          
          if (tooltipX + tooltipWidth > width) tooltipX = point.x - tooltipWidth - 20;
          if (tooltipY < 0) tooltipY = point.y + 20;
          if (tooltipY + tooltipHeight > height) tooltipY = point.y - tooltipHeight - 20;

          const tooltipGradient = ctx.createLinearGradient(tooltipX, tooltipY, tooltipX + tooltipWidth, tooltipY + tooltipHeight);
          tooltipGradient.addColorStop(0, theme === 'dark' ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)');
          tooltipGradient.addColorStop(1, theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)');
          
          ctx.fillStyle = tooltipGradient;
          ctx.beginPath();
          ctx.roundRect?.(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8) ||
            ctx.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
          ctx.fill();

          ctx.strokeStyle = theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          const textGradient = ctx.createLinearGradient(tooltipX, tooltipY, tooltipX + tooltipWidth, tooltipY);
          textGradient.addColorStop(0, theme === 'dark' ? '#a78bfa' : '#7c3aed');
          textGradient.addColorStop(1, theme === 'dark' ? '#8b5cf6' : '#6d28d9');
          
          ctx.fillStyle = textGradient;
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(point.name, tooltipX + 15, tooltipY + 25);

          ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#475569';
          ctx.font = '12px Arial';
          ctx.fillText(point.domain, tooltipX + 15, tooltipY + 45);

          const barWidth = 140;
          const barHeight = 6;
          const barX = tooltipX + 15;
          const barY = tooltipY + 65;

          ctx.fillStyle = theme === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)';
          ctx.beginPath();
          ctx.roundRect?.(barX, barY, barWidth, barHeight, 3) ||
            ctx.rect(barX, barY, barWidth, barHeight);
          ctx.fill();

          const progressGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
          progressGradient.addColorStop(0, theme === 'dark' ? '#a78bfa' : '#7c3aed');
          progressGradient.addColorStop(1, theme === 'dark' ? '#8b5cf6' : '#6d28d9');
          
          ctx.fillStyle = progressGradient;
          ctx.beginPath();
          ctx.roundRect?.(barX, barY, (barWidth * point.proficiency) / 100, barHeight, 3) ||
            ctx.rect(barX, barY, (barWidth * point.proficiency) / 100, barHeight);
          ctx.fill();

          ctx.fillStyle = theme === 'dark' ? '#e2e8f0' : '#1e293b';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'right';
          ctx.fillText(`${point.proficiency}%`, tooltipX + tooltipWidth - 15, barY + 6);
        }
      });
      points.push(...domainPoints);
    });

    setSkillPoints(points);

    // Draw inner gradient web connecting all skills
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

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const found = skillPoints.find(point => Math.hypot(point.x - x, point.y - y) < 10);
    setHoveredSkill(found || null);
    canvasRef.current.style.cursor = found ? 'pointer' : 'default';
  };

  // Handle keyboard navigation (basic)
  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && skillPoints.length) {
      e.preventDefault();
      const currentIndex = hoveredSkill ? skillPoints.findIndex(p => p.name === hoveredSkill.name) : -1;
      const nextIndex = (currentIndex + 1) % skillPoints.length;
      setHoveredSkill(skillPoints[nextIndex]);
    }
  };

  return (
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
    </motion.div>
  );
});

SkillsRadarChart.displayName = 'SkillsRadarChart';

export default SkillsRadarChart;