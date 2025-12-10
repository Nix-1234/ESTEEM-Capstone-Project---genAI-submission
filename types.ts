
export type UserRole = 'employee' | 'manager' | 'executive';

export interface Competency {
  name: string;
  source: string;
  verified: boolean;
  expires?: string;
}

export interface Milestone {
  name: string;
  status: 'complete' | 'in-progress' | 'pending';
  date?: string;
  progress?: number;
}

export interface Application {
  jobId: string;
  status: 'applied' | 'interview' | 'decision' | 'under-review';
  appliedDate: string;
}

export interface ShadowHistory {
  unitId: string;
  type: 'real' | 'virtual';
  date: string;
  hours?: number;
  minutes?: number;
}

// Added PathwayStep and Pathway interfaces to fix import errors
export interface PathwayStep {
  role: string;
  label: string;
}

export interface Pathway {
  id: string;
  name: string;
  typicalDuration: string;
  steps: PathwayStep[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  currentPosition: string;
  department: string;
  unit: string;
  hireDate: string;
  tenureMonths: number;
  passport: {
    competencies: Competency[];
    clinicalHours: number;
    committeeWork: string[];
    transferableSkillsPercent: Record<string, number>;
  };
  pathway: {
    id: string;
    name: string;
    steps: string[];
    currentStepIndex: number;
    progressPercent: number;
    milestones: Milestone[];
    estimatedCompletion: string;
    daysSinceLastProgress: number;
  };
  tuitionBenefits: {
    annualAllowance: number;
    usedYTD: number;
    remaining: number;
    expires: string;
    eligiblePrograms: string[];
  };
  shadowCredits: {
    real: { total: number; used: number; remaining: number };
    virtual: { unlimited: boolean; completed: number };
  };
  interests: string[];
  viewedUnits: { unitId: string; views: number; lastViewed: string }[];
  shadowHistory: ShadowHistory[];
  applications: Application[];
  riskLevel: 'low' | 'medium' | 'high';
  nrpStatus?: {
    enrolled: boolean;
    modulesCompleted: number;
    modulesTotal: number;
    skippedModules: string[];
    skipReason: string;
  };
}

export interface Unit {
  id: string;
  name: string;
  department: string;
  specialty: string;
  bedCount: number;
  metrics: {
    nursePatientRatio: string;
    avgPatientAcuity: number;
    annualTurnover: number;
    avgTenure: number;
  };
  manager: {
    name: string;
    tenureYears: number;
  };
  patientPopulation: string[];
  culture: {
    orientationWeeks: number;
    hasPreceptorProgram: boolean;
    newGradFriendly: boolean;
    dayShiftEligibility: string;
    mentorshipAvailable: boolean;
  };
  careerGrowth: {
    promotionsLastYear: number;
    pathToCharge: string;
    pathToICU: string;
    internalTransfersLastYear: number;
  };
  ratings: {
    overall: number;
    workLifeBalance: number;
    management: number;
    learningOpportunities: number;
    teamCulture: number;
    totalReviews: number;
  };
  openPositions: number;
  shadowOptions: {
    realAvailable: boolean;
    virtualTourUrl: string;
    dayInLifeUrl: string;
  };
}

export interface Job {
  id: string;
  title: string;
  unitId: string;
  unitName: string;
  department: string;
  shift: string;
  shiftDetails: string;
  openPositions: number;
  type: 'internal' | 'external';
  newGradFriendly: boolean;
  requirements: { name: string; required: boolean; preferred?: boolean }[];
  benefits: string[];
  internalDeadline: string;
  externalPostDate: string;
  postedDate: string;
  hiringManager: string;
  applicationCount: {
    internal: number;
    external: number;
  };
  // Added matchScore property
  matchScore?: number;
}

export interface NudgeAction {
  label: string;
  route?: string;
  action?: string;
}

export interface Nudge {
  id: string;
  type: string;
  template: string;
  priority: 'low' | 'medium' | 'high';
  actions: NudgeAction[];
  icon: string;
  color: string;
  audience?: 'employee' | 'manager' | 'executive';
}

export interface Department {
  id: string;
  name: string;
  staffCount: number;
  internalMobilityRate: number;
  turnoverRate: number;
  activePathwayEnrollments: number;
  costAvoided: number;
  benchmark: {
    mobility: number;
    turnover: number;
  };
}
