
import { Employee, Unit, Job, Nudge, Department, Pathway } from './types';

export const employees: Employee[] = [
  {
    "id": "emp001",
    "name": "Maria Santos",
    "email": "maria.santos@hospital.org",
    "role": "employee",
    "currentPosition": "CNA",
    "department": "Medical/Surgical",
    "unit": "4 North",
    "hireDate": "2022-03-15",
    "tenureMonths": 33,
    "passport": {
      "competencies": [
        { "name": "Vital Signs Assessment", "source": "NHA CNA", "verified": true },
        { "name": "Patient Positioning", "source": "NHA CNA", "verified": true },
        { "name": "Medication Admin Basics", "source": "Clinical Hours", "verified": true },
        { "name": "BLS", "source": "AHA", "verified": true, "expires": "2025-06-01" },
        { "name": "Phlebotomy", "source": "NHA", "verified": true }
      ],
      "clinicalHours": 480,
      "committeeWork": ["Quality Improvement", "Safety Committee"],
      "transferableSkillsPercent": {
        "LPN": 85,
        "MA": 70,
        "SurgTech": 45
      }
    },
    "pathway": {
      "id": "path001",
      "name": "CNA → RN",
      "steps": ["CNA", "LPN", "RN", "BSN"],
      "currentStepIndex": 2,
      "progressPercent": 67,
      "milestones": [
        { "name": "CNA Certification", "status": "complete", "date": "2022-03-01" },
        { "name": "Nursing School Enrollment", "status": "complete", "date": "2023-08-15" },
        { "name": "Clinical Hours (480/500)", "status": "in-progress", "progress": 96 },
        { "name": "NCLEX Prep Course", "status": "complete", "date": "2024-09-01" },
        { "name": "Preceptor Assignment", "status": "pending" },
        { "name": "NCLEX Examination", "status": "pending" }
      ],
      "estimatedCompletion": "2025-06-01",
      "daysSinceLastProgress": 12
    },
    "tuitionBenefits": {
      "annualAllowance": 12000,
      "usedYTD": 3600,
      "remaining": 8400,
      "expires": "2025-12-31",
      "eligiblePrograms": ["RN-to-BSN Bridge", "NCLEX Prep", "Certification Exams"]
    },
    "shadowCredits": {
      "real": { "total": 3, "used": 1, "remaining": 2 },
      "virtual": { "unlimited": true, "completed": 4 }
    },
    "interests": ["ICU", "Emergency", "4 North"],
    "viewedUnits": [
      { "unitId": "unit001", "views": 6, "lastViewed": "2024-12-08" },
      { "unitId": "unit003", "views": 3, "lastViewed": "2024-12-05" }
    ],
    "shadowHistory": [
      { "unitId": "unit001", "type": "real", "date": "2024-11-15", "hours": 4 },
      { "unitId": "unit003", "type": "virtual", "date": "2024-12-01", "minutes": 15 }
    ],
    "applications": [
      { "jobId": "job001", "status": "interview", "appliedDate": "2024-12-01" }
    ],
    "riskLevel": "low",
    "nrpStatus": {
      "enrolled": true,
      "modulesCompleted": 8,
      "modulesTotal": 12,
      "skippedModules": ["Vital Signs Basics", "Patient Positioning"],
      "skipReason": "Prior NHA competency verified"
    }
  }
];

// Added pathways data to fix export error
export const pathways: Pathway[] = [
  {
    id: 'path001',
    name: 'CNA → RN',
    typicalDuration: '3-4 Years',
    steps: [
      { role: 'CNA', label: 'Certified Nursing Assistant' },
      { role: 'LPN', label: 'Licensed Practical Nurse' },
      { role: 'RN', label: 'Registered Nurse' },
      { role: 'BSN', label: 'Bachelor of Science in Nursing' },
    ],
  },
];

export const units: Unit[] = [
  {
    "id": "unit001",
    "name": "4 North",
    "department": "Medical/Surgical",
    "specialty": "General Medicine",
    "bedCount": 32,
    "metrics": {
      "nursePatientRatio": "4:1",
      "avgPatientAcuity": 3.2,
      "annualTurnover": 8,
      "avgTenure": 4.3
    },
    "manager": {
      "name": "Sarah Chen",
      "tenureYears": 5
    },
    "patientPopulation": [
      "Post-surgical recovery",
      "Cardiac monitoring",
      "Diabetes management",
      "Pneumonia/respiratory"
    ],
    "culture": {
      "orientationWeeks": 12,
      "hasPreceptorProgram": true,
      "newGradFriendly": true,
      "dayShiftEligibility": "6 months",
      "mentorshipAvailable": true
    },
    "careerGrowth": {
      "promotionsLastYear": 3,
      "pathToCharge": "18 months",
      "pathToICU": "18 months",
      "internalTransfersLastYear": 5
    },
    "ratings": {
      "overall": 4.2,
      "workLifeBalance": 4.0,
      "management": 4.5,
      "learningOpportunities": 4.3,
      "teamCulture": 4.1,
      "totalReviews": 23
    },
    "openPositions": 3,
    "shadowOptions": {
      "realAvailable": true,
      "virtualTourUrl": "/videos/4north-tour.mp4",
      "dayInLifeUrl": "/videos/4north-day.mp4"
    }
  }
];

export const jobs: Job[] = [
  {
    "id": "job001",
    "title": "RN - Medical/Surgical",
    "unitId": "unit001",
    "unitName": "4 North",
    "department": "Medical/Surgical",
    "shift": "Days",
    "shiftDetails": "7am-7pm, 3x12s",
    "openPositions": 3,
    "type": "internal",
    "newGradFriendly": true,
    "requirements": [
      { "name": "RN License", "required": true },
      { "name": "BLS", "required": true },
      { "name": "ACLS", "required": false, "preferred": true },
      { "name": "1+ year experience", "required": false, "preferred": true }
    ],
    "benefits": ["Sign-on bonus $5,000", "Tuition assistance", "Relocation support"],
    "internalDeadline": "2025-01-15",
    "externalPostDate": "2025-01-20",
    "postedDate": "2025-01-01",
    "hiringManager": "Sarah Chen",
    "applicationCount": {
      "internal": 4,
      "external": 0
    },
    "matchScore": 94
  }
];

export const nudges: Nudge[] = [
  {
    "id": "nudge001",
    "type": "job-match",
    "template": "New: RN - Medical/Surgical matches 94% of your profile. Internal deadline: 5 days.",
    "priority": "high",
    "actions": [
      { "label": "View Job", "route": "explore" }
    ],
    "icon": "Briefcase",
    "color": "teal"
  },
  {
    "id": "nudge002",
    "type": "pathway-stagnant",
    "template": "You haven't logged pathway progress in 12 days. Need help with Clinical Hours?",
    "priority": "medium",
    "actions": [
      { "label": "Update Progress", "route": "passport" }
    ],
    "icon": "AlertCircle",
    "color": "amber"
  },
  {
    "id": "nudge003",
    "type": "tuition-expiring",
    "template": "$8,400 in tuition benefits expires Dec 31. Apply for spring semester now.",
    "priority": "high",
    "actions": [
      { "label": "Apply Now", "route": "support" }
    ],
    "icon": "DollarSign",
    "color": "red"
  }
];

export const departments: Department[] = [
  {
    "id": "dept001",
    "name": "Medical/Surgical",
    "staffCount": 120,
    "internalMobilityRate": 38,
    "turnoverRate": 12,
    "activePathwayEnrollments": 34,
    "costAvoided": 480000,
    "benchmark": { "mobility": 30, "turnover": 14 }
  }
];
