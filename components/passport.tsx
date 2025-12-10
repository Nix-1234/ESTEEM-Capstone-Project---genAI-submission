
import React from 'react';
import { Card, ProgressBar, Badge, MatchScore } from './shared';
import { Employee } from '../types';
import { CheckCircle2, Award, ArrowRightLeft, Target, Clock, Sparkles } from 'lucide-react';

export const CompetencyInventory: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <Card title="Competency Inventory">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employee.passport.competencies.map((comp, i) => (
          <div key={i} className="p-3 border border-gray-100 rounded-xl bg-gray-50 flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{comp.name}</p>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">{comp.source}</p>
              {comp.expires && <p className="text-[10px] text-accent font-bold mt-1">Expires: {comp.expires}</p>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const PathwayProgress: React.FC<{ employee: Employee }> = ({ employee }) => {
  const steps = employee.pathway.steps;
  const currentIndex = employee.pathway.currentStepIndex;

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{employee.pathway.name}</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Personalized Career Pathway</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-gray-400 block mb-1">COMPLETION STATUS</span>
            <Badge status="in-progress">{employee.pathway.progressPercent}% Complete</Badge>
          </div>
        </div>

        <div className="relative py-12 px-4">
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2"></div>
          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={idx} className="flex flex-col items-center gap-3 bg-white px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${
                    isPast ? 'bg-success border-success text-white' :
                    isCurrent ? 'bg-white border-primary text-primary scale-125 shadow-lg' :
                    'bg-white border-gray-200 text-gray-300'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-black">{idx + 1}</span>}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tight ${isCurrent ? 'text-primary' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Current Milestones">
          <div className="space-y-4">
            {employee.pathway.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 border border-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  m.status === 'complete' ? 'bg-green-50 text-success' : 'bg-amber-50 text-amber'
                }`}>
                  {m.status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">{m.name}</p>
                  {m.progress !== undefined && <ProgressBar percentage={m.progress} className="mt-2 h-1.5" color="bg-amber" />}
                </div>
                <Badge status={m.status}>{m.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Transferable Skills Map">
          <div className="space-y-6">
            {Object.entries(employee.passport.transferableSkillsPercent).map(([role, percent]) => (
              <div key={role}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black uppercase text-gray-600">{role} Ready</span>
                  <span className="text-xs font-bold text-primary">{percent}%</span>
                </div>
                <ProgressBar percentage={percent} />
              </div>
            ))}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-primary">AI INSIGHT</p>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Your Phlebotomy certification and 480 Clinical Hours give you a strong head start on the LPN role. You've already mastered 85% of core entry competencies.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
