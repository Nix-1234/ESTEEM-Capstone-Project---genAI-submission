
import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, MatchScore, StarRating, Accordion } from './shared';
import { Job, Unit, UserRole } from '../types';
import { MapPin, Clock, Building2, Users, PlayCircle, Calendar, Star, Info, Sparkles, Filter, ChevronRight, X } from 'lucide-react';
import { units as initialUnits } from '../data';

export const JobsBoard: React.FC<{ jobs: Job[], role: UserRole }> = ({ jobs, role }) => {
  const [filterType, setFilterType] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [systemFilter, setSystemFilter] = useState('all');

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const typeMatch = filterType === 'all' || (filterType === 'clinical' && !j.isNonClinical) || (filterType === 'non-clinical' && j.isNonClinical);
      const systemMatch = systemFilter === 'all' || j.healthSystem === systemFilter;
      const specialtyMatch = specialtyFilter === 'all' || j.department === specialtyFilter;
      return typeMatch && systemMatch && specialtyMatch;
    });
  }, [jobs, filterType, systemFilter, specialtyFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-black text-gray-900">Internal Career Explorer</h2>
        <div className="flex flex-wrap gap-2">
          {role === 'student' && (
            <select 
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none"
              onChange={(e) => setSystemFilter(e.target.value)}
            >
              <option value="all">ALL HEALTH SYSTEMS</option>
              <option value="Elite Health Network">ELITE HEALTH NETWORK</option>
            </select>
          )}
          <select 
            className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none"
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="all">ALL SPECIALTIES</option>
            <option value="Medical/Surgical">MED/SURG</option>
            <option value="Administration">ADMIN</option>
          </select>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setFilterType('all')} className={`px-3 py-1 rounded-md text-[10px] font-black ${filterType === 'all' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>ALL</button>
            <button onClick={() => setFilterType('clinical')} className={`px-3 py-1 rounded-md text-[10px] font-black ${filterType === 'clinical' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>CLINICAL</button>
            <button onClick={() => setFilterType('non-clinical')} className={`px-3 py-1 rounded-md text-[10px] font-black ${filterType === 'non-clinical' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>NON-CLINICAL</button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length === 0 && <div className="text-center py-10 text-gray-400 font-bold">No jobs matching these filters.</div>}
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="group overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
            {job.isAISuggested && <Badge status="suggested">AI Suggested</Badge>}
            {job.isNonClinical && <Badge status="info">Non-Clinical</Badge>}
            {job.newGradFriendly && <Badge status="success">New Grad Friendly</Badge>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-[11px] text-gray-500 font-bold uppercase mb-4">
            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.unitName}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.healthSystem}</span>
            <span className="flex items-center gap-1 text-accent"><Clock className="w-3 h-3" /> {job.shiftDetails}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, i) => (
              <span key={i} className={`px-2 py-1 rounded text-[10px] font-bold ${req.required ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'}`}>
                {req.name} {req.required ? '(Req)' : '(Pref)'}
              </span>
            ))}
          </div>
          
          {showDetails && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
              <h4 className="text-xs font-black text-primary uppercase mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Why you're a great fit
              </h4>
              <ul className="space-y-2">
                {job.matchReasons.map((reason, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5" /> {reason}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-black text-gray-400 uppercase mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((b, i) => <Badge key={i} status="low">{b}</Badge>)}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase text-gray-400 mb-2">ROLE-FIT</p>
            <MatchScore score={job.matchScore} size="md" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[140px]">
            <Button className="w-full text-xs">APPLY NOW</Button>
            <Button 
              variant="secondary" 
              className="w-full text-xs"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'HIDE FIT' : 'SHOW FIT'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const UnitProfile: React.FC<{ unit: Unit }> = ({ unit }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <div className="relative h-48 bg-primary rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" 
          alt="Unit"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-white">{unit.name} • {unit.specialty}</h1>
              <p className="text-teal-50 font-bold uppercase tracking-widest">{unit.healthSystem}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center">
              <p className="text-[10px] font-black text-teal-100 uppercase mb-1">Overall Rating</p>
              <div className="flex items-center gap-1 text-white font-black">
                <Star className="w-4 h-4 fill-white" /> {unit.ratings.overall}/5
              </div>
            </div>
          </div>
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
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${unit.manager.name}`} alt="Manager" />
            </div>
            <div>
              <p className="text-lg font-black text-gray-900">{unit.manager.name}</p>
              <p className="text-xs text-gray-500 font-bold uppercase">{unit.manager.tenureYears} Year Tenure</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic mb-6">
            "I believe in radical transparency. My goal is to help you move out of my unit when you're ready for the next level, not keep you here just for staffing."
          </p>
          <Button variant="teal-outline" className="w-full">Schedule Career Chat</Button>
        </Card>
      </div>

      <Accordion title="Staff Reviews & Rate My Unit" icon={<Star className="w-5 h-5" />}>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <p className="text-5xl font-black text-gray-900">{unit.ratings.overall}</p>
              <StarRating rating={unit.ratings.overall} />
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">{unit.ratings.totalReviews} REVIEWS</p>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase"><span>Management</span> <span className="text-gray-900">{unit.ratings.management}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase"><span>Culture</span> <span className="text-gray-900">{unit.ratings.teamCulture}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase"><span>Growth</span> <span className="text-gray-900">{unit.ratings.learningOpportunities}/5</span></div>
              <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase"><span>Work-Life</span> <span className="text-gray-900">{unit.ratings.workLifeBalance}/5</span></div>
            </div>
            <Button onClick={() => setShowReviewModal(true)}>RATE THIS UNIT</Button>
          </div>
          
          <div className="space-y-4">
            {unit.reviews.map(review => (
              <div key={review.id} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2 items-center">
                    <StarRating rating={review.rating} />
                    <span className="text-xs font-bold text-gray-900">{review.role}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-black text-success uppercase mb-1">PROS</p>
                    <div className="flex flex-wrap gap-1">
                      {review.pros.map((p, i) => <span key={i} className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">{p}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-accent uppercase mb-1">CONS</p>
                    <div className="flex flex-wrap gap-1">
                      {review.cons.map((p, i) => <span key={i} className="text-[9px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-100">{p}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Accordion>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Rate {unit.name}</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Overall Satisfaction</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-8 h-8 text-gray-200 hover:text-amber cursor-pointer" />)}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Share your experience (Anonymous)</label>
                <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" rows={4} placeholder="What should others know about working here?"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" className="flex-1" onClick={() => setShowReviewModal(false)}>CANCEL</Button>
                <Button className="flex-1">SUBMIT REVIEW</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export const ShadowHub: React.FC<{ credits: number }> = ({ credits }) => {
  const [tab, setTab] = useState<'virtual' | 'real'>('virtual');
  
  return (
    <div className="space-y-6">
      <div className="bg-primary text-white p-8 rounded-2xl shadow-xl shadow-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black mb-2">Shadow Discovery</h2>
          <p className="text-teal-100 font-medium">Try before you apply. Students and internal staff gain in-person insights.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
          <p className="text-[10px] font-black uppercase text-teal-200 mb-1">Real Shadow Credits</p>
          <p className="text-3xl font-black">{credits} / 5</p>
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
          <h3 className="text-xl font-black text-gray-900 mb-2">Schedule Your In-Person Shadow</h3>
          <p className="text-gray-500 max-w-sm mb-8 text-sm">Select a date to spend 4 hours in your target unit. This is a dedicated learning opportunity to see the team and culture firsthand.</p>
          <Button disabled={credits === 0}>
            {credits > 0 ? 'VIEW UNIT AVAILABILITY' : 'NO CREDITS REMAINING'}
          </Button>
          {credits > 0 && <p className="mt-4 text-[10px] font-bold text-gray-400">Scheduling uses 1 credit.</p>}
        </Card>
      )}
    </div>
  );
};

const CheckCircle2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
