
import React, { useState } from 'react';
import { Card, Button, Badge, MatchScore, StarRating } from './shared';
import { Job, Unit } from '../types';
import { MapPin, Clock, Building2, Users, ArrowRight, PlayCircle, Calendar, Star, Info } from 'lucide-react';

export const JobsBoard: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Internal Career Explorer</h2>
        <div className="flex gap-2">
          <Button variant="secondary" className="text-xs">FILTERS</Button>
          <Button variant="secondary" className="text-xs">SORT BY MATCH</Button>
        </div>
      </div>
      
      {jobs.map(job => (
        <Card key={job.id} className="group overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                {job.newGradFriendly && <Badge status="info">NEW GRAD FRIENDLY</Badge>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-[11px] text-gray-500 font-bold uppercase mb-4">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.unitName}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.shiftDetails}</span>
                <span className="flex items-center gap-1 text-accent"><Info className="w-3 h-3" /> Deadline: {job.internalDeadline}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className={`px-2 py-1 rounded text-[10px] font-bold ${req.required ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'}`}>
                    {req.name} {req.required ? '(Req)' : '(Pref)'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">ROLE-FIT</p>
                <MatchScore score={94} size="md" />
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[140px]">
                <Button className="w-full text-xs">APPLY NOW</Button>
                <Button variant="secondary" className="w-full text-xs">UNIT PROFILE</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const UnitProfile: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <div className="space-y-6 pb-20">
      <div className="relative h-48 bg-primary rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" 
          alt="Unit"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h1 className="text-4xl font-black text-white">{unit.name} • {unit.specialty}</h1>
          <p className="text-teal-50 font-bold uppercase tracking-widest">{unit.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Ratio', val: unit.metrics.nursePatientRatio, icon: Users },
          { label: 'Acuity', val: unit.metrics.avgPatientAcuity, icon: Info },
          { label: 'Satisfaction', val: unit.ratings.overall, icon: Star },
          { label: 'Turnover', val: `${unit.metrics.annualTurnover}%`, icon: Clock },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="text-center py-4 flex flex-col items-center">
              <Icon className="w-5 h-5 text-gray-400 mb-2" />
              <p className="text-lg font-black text-gray-900">{m.val}</p>
              <p className="text-[10px] font-bold uppercase text-gray-400">{m.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Unit Culture & Growth" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-black uppercase text-gray-400 mb-4">Onboarding</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Orientation</span> <span className="font-bold">{unit.culture.orientationWeeks} Weeks</span></li>
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Preceptor Program</span> <Badge status="success">Active</Badge></li>
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Day Shift Eligible</span> <span className="font-bold">{unit.culture.dayShiftEligibility}</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-gray-400 mb-4">Career Velocity</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Promotions (LY)</span> <span className="font-bold">{unit.careerGrowth.promotionsLastYear}</span></li>
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Path to ICU</span> <span className="font-bold">{unit.careerGrowth.pathToICU}</span></li>
                <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Path to Charge</span> <span className="font-bold">{unit.careerGrowth.pathToCharge}</span></li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Unit Manager">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-primary/20">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`} alt="Manager" />
            </div>
            <div>
              <p className="text-lg font-black text-gray-900">{unit.manager.name}</p>
              <p className="text-xs text-gray-500 font-bold uppercase">{unit.manager.tenureYears} Year Tenure</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic mb-6">
            "I believe in radical transparency. My goal is to help you move out of my unit when you're ready for the next level, not keep you here just for staffing."
          </p>
          <Button variant="teal-outline" className="w-full">Schedule Shadow</Button>
        </Card>
      </div>

      <Card title="Staff Reviews (Anonymous)">
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <p className="text-4xl font-black text-gray-900">{unit.ratings.overall}</p>
              <StarRating rating={unit.ratings.overall} />
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">{unit.ratings.totalReviews} REVIEWS</p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"><span>Management</span> <span className="text-gray-900">{unit.ratings.management}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"><span>Culture</span> <span className="text-gray-900">{unit.ratings.teamCulture}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"><span>Growth</span> <span className="text-gray-900">{unit.ratings.learningOpportunities}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"><span>Work-Life</span> <span className="text-gray-900">{unit.ratings.workLifeBalance}/5</span></div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <StarRating rating={4} />
                <span className="text-xs font-bold text-gray-900">"Great support for new grads"</span>
              </div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">RN • 3 Years</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Management actually cares here. Sarah (the manager) lets you shadow other units once you hit 6 months tenure. The workload is heavy but predictable.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const ShadowHub: React.FC = () => {
  const [tab, setTab] = useState<'virtual' | 'real'>('virtual');
  
  return (
    <div className="space-y-6">
      <div className="bg-primary text-white p-8 rounded-2xl shadow-xl shadow-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black mb-2">Shadow Discovery</h2>
          <p className="text-teal-100 font-medium">Try before you apply. Gain 3 real shadow credits per year.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
          <p className="text-[10px] font-black uppercase text-teal-200 mb-1">Available Credits</p>
          <p className="text-3xl font-black">2 / 3</p>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button onClick={() => setTab('virtual')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'virtual' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>VIRTUAL TOUR</button>
        <button onClick={() => setTab('real')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'real' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>REAL SHADOWING</button>
      </div>

      {tab === 'virtual' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: '4 North Tour', unit: 'Med/Surg', dur: '8 mins' },
            { title: 'ICU Day in Life', unit: 'Critical Care', dur: '12 mins' },
            { title: 'Pediatrics Overview', unit: 'Peds', dur: '6 mins' },
          ].map((v, i) => (
            <Card key={i} className="p-0 overflow-hidden group">
              <div className="relative h-40 bg-gray-200">
                <img src={`https://picsum.photos/seed/${v.title}/400/200`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-black text-gray-900">{v.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{v.unit}</span>
                  <span className="text-[10px] text-primary font-black uppercase">{v.dur}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar className="w-16 h-16 text-gray-200 mb-6" />
          <h3 className="text-xl font-black text-gray-900 mb-2">Schedule Your Real Shadow</h3>
          <p className="text-gray-500 max-w-sm mb-8 text-sm">Select a date to spend 4 hours in your target unit. We'll handle the release time with your manager.</p>
          <Button>VIEW AVAILABILITY</Button>
        </Card>
      )}
    </div>
  );
};
