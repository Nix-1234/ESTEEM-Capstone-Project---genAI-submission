
import React from 'react';
import { Card, ProgressBar, Badge, Button } from './shared';
import { Employee, Pathway, Job, Unit } from '../types';
// Fixed: Added Users to the lucide-react imports
import { CheckCircle2, Circle, Clock, Building2, MapPin, Briefcase, Award, TrendingUp, Sparkles, ChevronRight, X, Users } from 'lucide-react';

export const PathwayVisualization: React.FC<{ employee: Employee; pathway: Pathway }> = ({ employee, pathway }) => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{pathway.name} Pathway</h2>
            <p className="text-gray-500">Typical Duration: {pathway.typicalDuration}</p>
          </div>
          {/* Fixed: Use currentStepIndex and steps.length from employee.pathway */}
          <Badge status="in-progress">Step {employee.pathway.currentStepIndex + 1} of {employee.pathway.steps.length}</Badge>
        </div>

        <div className="mb-8">
          <ProgressBar 
            percentage={employee.pathway.progressPercent} 
            label="Overall Progress" 
            className="mb-2"
          />
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <Clock className="w-4 h-4" /> 
            Estimated Completion: <span className="font-semibold text-gray-700">{employee.pathway.estimatedCompletion}</span>
          </p>
        </div>

        <div className="relative pt-10 pb-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
          <div className="flex justify-between relative">
            {pathway.steps.map((step, idx) => {
              // Fixed: Access currentStepIndex from employee.pathway
              const isCompleted = idx < employee.pathway.currentStepIndex;
              const isCurrent = idx === employee.pathway.currentStepIndex;
              
              return (
                <div key={idx} className="flex flex-col items-center gap-3 relative z-10 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                    isCurrent ? 'bg-primary border-primary text-white scale-110 shadow-md' : 
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span>{idx + 1}</span>}
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-primary' : 'text-gray-900'}`}>{step.role}</p>
                    <p className="text-[10px] text-gray-500 max-w-[80px]">{step.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card title="Current Milestones">
        <div className="space-y-4">
          {/* Fixed: Access milestones from employee.pathway */}
          {employee.pathway.milestones.map((ms, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg">
              <div className="mt-1">
                {ms.status === 'complete' ? <CheckCircle2 className="text-green-500 w-5 h-5" /> :
                 ms.status === 'in-progress' ? <Circle className="text-amber-500 w-5 h-5" /> :
                 <Circle className="text-gray-300 w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className={`font-semibold ${ms.status === 'complete' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{ms.name}</span>
                  <Badge status={ms.status}>{ms.status.toUpperCase()}</Badge>
                </div>
                {/* Fixed: Use progress directly from Milestone */}
                {ms.status === 'in-progress' && ms.progress !== undefined && (
                  <div className="mt-2">
                    <ProgressBar percentage={ms.progress} className="mb-1" color="bg-amber-500" />
                    <span className="text-xs text-gray-500">{ms.progress}% of {ms.name.toLowerCase()} achieved</span>
                  </div>
                )}
                {ms.date && <span className="text-xs text-gray-500">Date: {ms.date}</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const InternalJobsBoard: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-sm">Filter</Button>
          <Button variant="ghost" className="text-sm">Sort</Button>
        </div>
      </div>
      {jobs.map(job => (
        <Card key={job.id} className="p-0 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                {job.newGradFriendly && <Badge status="info">New Grad Friendly</Badge>}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                {/* Fixed: Use unitName from Job */}
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.unitName}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.department}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.shift} Shift</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Fixed: Use req.name since requirements is an object array */}
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{req.name}</span>
                ))}
              </div>
            </div>
            {/* Fixed: Use matchScore from Job (added to interface) */}
            <div className="md:w-48 flex flex-col items-center justify-center bg-teal-50 rounded-xl p-4 border border-teal-100">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Match Score</span>
              <span className="text-3xl font-bold text-primary">{job.matchScore ?? 0}%</span>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: `${job.matchScore ?? 0}%` }}></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
            <span className="text-xs text-gray-500">Internal Deadline: <span className="font-semibold">{job.internalDeadline}</span></span>
            <div className="flex gap-2">
              <Button variant="secondary" className="text-sm">Unit Profile</Button>
              <Button className="text-sm">Express Interest</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const UnitProfile: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Unit: {unit.name}</h2>
              <p className="text-gray-500">{unit.specialty} • {unit.department}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{unit.metrics.nursePatientRatio}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase">Nurse-to-Patient Ratio</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl font-bold text-gray-900">{unit.bedCount}</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Beds</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl font-bold text-gray-900">{unit.metrics.avgPatientAcuity}</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Avg Acuity</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              {/* Fixed: Use ratings.overall instead of non-existent staffSatisfaction */}
              <div className="text-xl font-bold text-primary">{unit.ratings.overall}</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl font-bold text-accent">{unit.metrics.annualTurnover}%</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Turnover</div>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Patient Population</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {unit.patientPopulation.map((pop, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> {pop}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Unit Leadership">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              <img src={`https://picsum.photos/seed/${unit.manager.name}/100/100`} alt={unit.manager.name} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{unit.manager.name}</p>
              <p className="text-sm text-gray-500">Unit Manager</p>
              {/* Fixed: Use tenureYears from Unit.manager */}
              <p className="text-xs text-gray-400">Tenure: {unit.manager.tenureYears} years</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="text-sm font-semibold text-primary mb-1">Career Growth Focus</p>
              <p className="text-xs text-teal-800">"I prioritize internal development. Last year, 3 members of our team advanced to ICU and Specialty roles."</p>
            </div>
            <Button variant="secondary" className="w-full text-sm">Schedule Coffee Chat</Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Orientation & Culture">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Standard Orientation</span>
              {/* Fixed: Use culture.orientationWeeks */}
              <span className="text-sm font-bold text-gray-900">{unit.culture.orientationWeeks} Weeks</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Dedicated Preceptor</span>
              <Badge status="success">YES</Badge>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">New Grad Friendly</span>
              <Badge status="success">YES</Badge>
            </div>
          </div>
        </Card>

        <Card title="Growth Opportunities">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Path to ICU / Specialty</span>
              <span className="text-sm font-bold text-gray-900">{unit.careerGrowth.pathToICU}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Promotions (Last 12 mo)</span>
              <span className="text-sm font-bold text-gray-900">{unit.careerGrowth.promotionsLastYear}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Day Shift Eligibility</span>
              {/* Fixed: Access dayShiftEligibility from Unit.culture */}
              <span className="text-sm font-bold text-gray-900">~{unit.culture.dayShiftEligibility}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const TuitionBenefits: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { annualAllowance, usedYTD, remaining } = employee.tuitionBenefits;
  const usagePercent = (usedYTD / annualAllowance) * 100;

  return (
    <div className="space-y-6">
      <Card title="Tuition Benefits Tracker">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase">Usage Status</p>
                <h3 className="text-3xl font-bold text-gray-900">${usedYTD.toLocaleString()} <span className="text-lg font-normal text-gray-400">/ ${annualAllowance.toLocaleString()}</span></h3>
              </div>
              <Badge status="info">Refreshes Jan 1</Badge>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div className="h-full bg-primary" style={{ width: `${usagePercent}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">You have <span className="font-bold text-gray-900">${remaining.toLocaleString()}</span> remaining in your annual benefit.</p>
          </div>
          <div className="bg-primary/5 rounded-2xl p-6 flex flex-col justify-center items-center border border-primary/10">
            <Award className="w-10 h-10 text-primary mb-2" />
            <p className="text-center text-sm font-bold text-primary leading-tight">Elite Partner Network Access</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Eligible Programs">
          <div className="space-y-3">
            {['BSN Completion Program', 'MSN Leadership Track', 'Nurse Educator Certification', 'Critical Care Internship'].map((prog, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                <span className="text-sm font-medium text-gray-700">{prog}</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary" />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Direct Billing Partners">
          <div className="grid grid-cols-2 gap-4">
            {['State University', 'Health Sciences Inst.', 'Elite Nursing College', 'Tech Medical Center'].map((p, i) => (
              <div key={i} className="p-3 border border-gray-100 rounded-xl flex items-center gap-2 bg-gray-50">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-gray-600">{p}</span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6 text-sm">Apply for New Benefit</Button>
        </Card>
      </div>
    </div>
  );
};

export const AINudge: React.FC<{ employee: Employee }> = ({ employee }) => {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  return (
    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 relative">
      <div className="bg-amber-100 p-2 rounded-lg h-fit">
        <Sparkles className="text-amber-500 w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-amber-900">Recommended for You: NCLEX Prep Sponsorship</p>
        <p className="text-sm text-amber-800 mb-2">Since you've completed 96% of your Clinical Hours, you're now eligible for the hospital-sponsored NCLEX prep course. Taking this now increases your first-time pass rate by 22%!</p>
        <div className="flex gap-4">
          <button className="text-sm font-bold text-amber-900 hover:underline">Learn More</button>
          <button className="text-sm font-bold text-amber-900 hover:underline">Apply Now</button>
        </div>
      </div>
      <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-amber-500 hover:text-amber-700">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
