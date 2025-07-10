import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, XCircle, Skull } from 'lucide-react';

interface RiskScoreGaugeProps {
  score: number;
  level: 'secure' | 'caution' | 'danger' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const riskConfig = {
  secure: {
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-400/30',
    icon: Shield,
    label: 'SECURE'
  },
  caution: {
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-400/30',
    icon: AlertTriangle,
    label: 'CAUTION'
  },
  danger: {
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-400/30',
    icon: XCircle,
    label: 'DANGER'
  },
  critical: {
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    borderColor: 'border-red-400/30',
    icon: Skull,
    label: 'CRITICAL'
  }
};

export default function RiskScoreGauge({ score, level, size = 'md', animated = true }: RiskScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const config = riskConfig[level];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: {
      container: 'w-32 h-32',
      circle: 'w-28 h-28',
      text: 'text-lg',
      icon: 'w-4 h-4',
      label: 'text-xs'
    },
    md: {
      container: 'w-40 h-40',
      circle: 'w-36 h-36',
      text: 'text-2xl',
      icon: 'w-5 h-5',
      label: 'text-sm'
    },
    lg: {
      container: 'w-48 h-48',
      circle: 'w-44 h-44',
      text: 'text-3xl',
      icon: 'w-6 h-6',
      label: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      const duration = 2000;
      const steps = 60;
      const stepValue = score / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setDisplayScore(Math.min(Math.round(currentStep * stepValue), score));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className={`relative ${classes.container} mx-auto`}>
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full blur opacity-20 animate-pulse`} />
      
      {/* Main gauge container */}
      <div className={`relative ${classes.circle} ${config.bgColor} border-2 ${config.borderColor} rounded-full flex items-center justify-center`}>
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={config.textColor.replace('text-', 'stop-')} />
              <stop offset="100%" className={config.textColor.replace('text-', 'stop-')} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="text-center z-10">
          {/* Risk Score */}
          <div className={`${classes.text} font-black ${config.textColor} ${isAnimating ? 'animate-pulse' : ''}`}>
            {displayScore}
          </div>
          
          {/* Risk Level */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <IconComponent className={`${classes.icon} ${config.textColor}`} />
            <span className={`${classes.label} font-mono tracking-wider ${config.textColor}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Animated particles for high risk */}
        {(level === 'danger' || level === 'critical') && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 ${config.textColor.replace('text-', 'bg-')} rounded-full animate-ping`}
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Score breakdown */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-gray-500 font-mono">
          {score <= 30 ? 'Low Risk' : score <= 60 ? 'Medium Risk' : 'High Risk'}
        </div>
      </div>
    </div>
  );
}