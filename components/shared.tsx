
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className} transition-all hover:shadow-md`}>
    {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
    {children}
  </div>
);

interface ProgressBarProps {
  percentage: number;
  color?: string;
  className?: string;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  color = 'bg-primary', 
  className = '',
  label
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="text-xs font-bold text-gray-900">{Math.round(percentage)}%</span>
      </div>
    )}
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-500`} 
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  </div>
);

interface BadgeProps {
  status: 'complete' | 'in-progress' | 'pending' | 'success' | 'warning' | 'danger' | 'info' | 'low' | 'medium' | 'high' | 'suggested';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children, className = '' }) => {
  const styles = {
    complete: 'bg-green-100 text-green-700',
    success: 'bg-green-100 text-green-700',
    'in-progress': 'bg-amber-100 text-amber-700',
    warning: 'bg-amber-100 text-amber-700',
    pending: 'bg-gray-100 text-gray-500',
    info: 'bg-blue-100 text-blue-700',
    danger: 'bg-red-100 text-red-700',
    low: 'bg-green-50 text-green-600',
    medium: 'bg-amber-50 text-amber-600',
    high: 'bg-red-50 text-red-600',
    suggested: 'bg-purple-100 text-purple-700 border border-purple-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]} ${className}`}>
      {children}
    </span>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'teal-outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  const variants = {
    primary: 'bg-[#0D4F4F] text-white hover:bg-[#1A6B6B] focus:ring-[#0D4F4F]',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-[#E85D4C] text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
    'teal-outline': 'border-2 border-[#0D4F4F] text-[#0D4F4F] hover:bg-[#0D4F4F] hover:text-white',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const MatchScore: React.FC<{ score: number, size?: 'sm' | 'md' | 'lg' }> = ({ score, size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };
  
  return (
    <div className={`relative flex items-center justify-center rounded-full border-4 border-gray-100 ${sizes[size]}`}>
      <svg className="absolute w-full h-full -rotate-90">
        <circle
          cx="50%" cy="50%" r="42%"
          className="fill-none stroke-primary"
          strokeWidth="8"
          strokeDasharray="264"
          strokeDashoffset={264 - (264 * score) / 100}
          strokeLinecap="round"
        />
      </svg>
      <span className="font-black text-primary">{score}%</span>
    </div>
  );
};

export const StarRating: React.FC<{ rating: number, total?: number }> = ({ rating, total }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-amber text-amber' : 'fill-gray-100 text-gray-200'}`}
        />
      ))}
      {total !== undefined && <span className="text-xs text-gray-400 ml-1">({total})</span>}
    </div>
  );
};

export const Accordion: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: React.ReactNode }> = ({ title, children, defaultOpen = false, icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <span className="font-bold text-gray-900 uppercase tracking-tight text-sm">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
