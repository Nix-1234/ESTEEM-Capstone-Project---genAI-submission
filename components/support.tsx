
import React from 'react';
import { Card, ProgressBar, Button, Badge } from './shared';
import { Employee } from '../types';
import { DollarSign, GraduationCap, BookOpen, UserRoundCheck, ShieldCheck, ChevronRight } from 'lucide-react';

export const TuitionTracker: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { annualAllowance, usedYTD, remaining } = employee.tuitionBenefits;
  const percent = (usedYTD / annualAllowance) * 100;

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary text-white rounded-lg">
          <DollarSign className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black text-gray-900">Tuition Benefit Wallet</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Current Spending</p>
              <h3 className="text-3xl font-black text-gray-900">${usedYTD.toLocaleString()}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-gray-400">Annual Allowance</p>
              <p className="text-lg font-bold text-gray-600">${annualAllowance.toLocaleString()}</p>
            </div>
          </div>
          <ProgressBar percentage={percent} className="h-3" />
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-4">Expires: <span className="text-accent">{employee.tuitionBenefits.expires}</span></p>
        </div>
        
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm text-center">
          <p className="text-[10px] font-black uppercase text-primary mb-1">AVAILABLE NOW</p>
          <p className="text-4xl font-black text-primary">${remaining.toLocaleString()}</p>
          <Button className="mt-4 text-xs w-full">USE BENEFITS</Button>
        </div>
      </div>
    </Card>
  );
};

export const LearningHub: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Recommended Programs">
        <div className="space-y-3">
          {[
            { name: 'RN-to-BSN Bridge', type: 'Degree', provider: 'State University' },
            { name: 'Critical Care Specialty', type: 'Certification', provider: 'AACN' },
            { name: 'Phlebotomy Refresher', type: 'CEU', provider: 'Internal' },
          ].map((p, i) => (
            <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div>
                <p className="text-sm font-black text-gray-900 group-hover:text-primary">{p.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{p.type} • {p.provider}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </div>
      </Card>
      
      <Card title="Mentor Matching">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
               <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar" />
            ))}
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">3 Potential Mentors</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Ready to help your RN transition</p>
          </div>
        </div>
        <Button variant="secondary" className="w-full text-xs">FIND MY MATCH</Button>
      </Card>
    </div>
  );
};
