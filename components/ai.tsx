
import React from 'react';
import { useNudges } from '../context';
import { Card, Button } from './shared';
import { Briefcase, AlertCircle, DollarSign, Eye, Send, Target, BookOpen, Heart, UserPlus, Inbox, AlertTriangle, X } from 'lucide-react';

const iconMap: Record<string, any> = {
  Briefcase, AlertCircle, DollarSign, Eye, Send, Target, BookOpen, Heart, UserPlus, Inbox, AlertTriangle
};

export const NudgeCard: React.FC<{ nudge: any }> = ({ nudge }) => {
  const { dismissNudge } = useNudges();
  const Icon = iconMap[nudge.icon] || AlertCircle;

  const colorStyles: Record<string, string> = {
    teal: 'border-primary bg-primary/5 text-primary',
    amber: 'border-amber bg-amber/5 text-amber',
    red: 'border-accent bg-accent/5 text-accent',
    blue: 'border-blue-500 bg-blue-50 text-blue-600',
    green: 'border-success bg-success/5 text-success',
  };

  return (
    <div className={`relative border-l-4 rounded-xl p-4 shadow-sm bg-white mb-4 ${colorStyles[nudge.color] || 'border-gray-200'}`}>
      <button 
        onClick={() => dismissNudge(nudge.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex gap-4">
        <div className={`p-2 rounded-lg bg-white shadow-sm h-fit`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900 mb-1">{nudge.template}</p>
          <div className="flex gap-3 mt-2">
            {nudge.actions.map((action: any, i: number) => (
              <button key={i} className="text-xs font-black uppercase tracking-widest hover:underline">
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NudgeStack: React.FC = () => {
  const { activeNudges } = useNudges();
  if (activeNudges.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">AI Priority Insights</h2>
      </div>
      <div className="space-y-4">
        {activeNudges.slice(0, 3).map(nudge => (
          <NudgeCard key={nudge.id} nudge={nudge} />
        ))}
      </div>
    </div>
  );
};
