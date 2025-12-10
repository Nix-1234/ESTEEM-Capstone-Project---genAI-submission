
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
    "location": "Downtown Campus",
    "healthSystem": "Elite Health Network",
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
        "SurgTech": 45,
        "Patient Relations": 92
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
      "real": { "total": 5, "used": 1, "remaining": 4 },
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
    "nrpModules": [
      { "id": "nrp1", "name": "Vital Signs & Patient Monitoring", "status": "eligible-to-skip", "reason": "Verified NHA CNA Competency" },
      { "id": "nrp2", "name": "Basic Patient Positioning", "status": "eligible-to-skip", "reason": "Verified NHA CNA Competency" },
      { "id": "nrp3", "name": "Pharmacology Basics", "status": "required" },
      { "id": "nrp4", "name": "Advanced Clinical Reasoning", "status": "required" }
    ]
  },
  {
    "id": "stu001",
    "name": "Jordan Lee",
    "email": "jordan.lee@university.edu",
    "role": "student",
    "currentPosition": "Nursing Student (Senior)",
    "department": "University School of Nursing",
    "unit": "None",
    "location": "Northside",
    "healthSystem": "None",
    "hireDate": "N/A",
    "tenureMonths": 0,
    "passport": {
      "competencies": [
        { "name": "Pharmacology I", "source": "University", "verified": true },
        { "name": "BLS", "source": "AHA", "verified": true, "expires": "2026-01-01" }
      ],
      "clinicalHours": 200,
      "committeeWork": [],
      "transferableSkillsPercent": { "RN": 45, "LPN": 60 }
    },
    "pathway": {
      "id": "path002",
      "name": "Student → RN",
      "steps": ["Student", "RN", "Specialty"],
      "currentStepIndex": 0,
      "progressPercent": 40,
      "milestones": [
        { "name": "Clinicals I", "status": "complete" },
        { "name": "Graduation", "status": "in-progress", "progress": 75 }
      ],
      "estimatedCompletion": "2025-05-15",
      "daysSinceLastProgress": 5
    },
    "tuitionBenefits": { "annualAllowance": 0, "usedYTD": 0, "remaining": 0, "expires": "", "eligiblePrograms": [] },
    "shadowCredits": { "real": { "total": 3, "used": 0, "remaining": 3 }, "virtual": { "unlimited": true, "completed": 0 } },
    "interests": [],
    "viewedUnits": [],
    "shadowHistory": [],
    "applications": [],
    "riskLevel": "low",
    "nrpModules": []
  }
];

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
    "location": "Downtown Campus",
    "healthSystem": "Elite Health Network",
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
    },
    "reviews": [
      {
        "id": "rev1",
        "unitId": "unit001",
        "rating": 5,
        "comment": "Sarah is an amazing manager. She really supports our growth.",
        "role": "RN",
        "date": "2024-11-20",
        "pros": ["Supportive leadership", "Great teamwork"],
        "cons": ["High acuity"]
      }
    ]
  },
  {
    "id": "unit002",
    "name": "ICU West",
    "department": "Critical Care",
    "specialty": "Cardiac ICU",
    "location": "Downtown Campus",
    "healthSystem": "Elite Health Network",
    "bedCount": 12,
    "metrics": {
      "nursePatientRatio": "2:1",
      "avgPatientAcuity": 4.8,
      "annualTurnover": 15,
      "avgTenure": 6.1
    },
    "manager": {
      "name": "Robert Taylor",
      "tenureYears": 8
    },
    "patientPopulation": ["Post-CABG", "Sepsis", "Multisystem failure"],
    "culture": {
      "orientationWeeks": 24,
      "hasPreceptorProgram": true,
      "newGradFriendly": false,
      "dayShiftEligibility": "2 years",
      "mentorshipAvailable": true
    },
    "careerGrowth": {
      "promotionsLastYear": 1,
      "pathToCharge": "3 years",
      "pathToICU": "N/A",
      "internalTransfersLastYear": 2
    },
    "ratings": {
      "overall": 3.8,
      "workLifeBalance": 2.5,
      "management": 4.0,
      "learningOpportunities": 5.0,
      "teamCulture": 3.5,
      "totalReviews": 12
    },
    "openPositions": 1,
    "shadowOptions": {
      "realAvailable": true,
      "virtualTourUrl": "/videos/icu-tour.mp4",
      "dayInLifeUrl": "/videos/icu-day.mp4"
    },
    "reviews": []
  }
];

export const jobs: Job[] = [
  {
    "id": "job001",
    "title": "RN - Medical/Surgical",
    "unitId": "unit001",
    "unitName": "4 North",
    "department": "Medical/Surgical",
    "location": "Downtown Campus",
    "healthSystem": "Elite Health Network",
    "shift": "Days",
    "shiftDetails": "7am-7pm, 3x12s",
    "openPositions": 3,
    "type": "internal",
    "newGradFriendly": true,
    "requirements": [
      { "name": "RN License", "required": true },
      { "name": "BLS", "required": true }
    ],
    "benefits": ["Sign-on bonus $5,000", "Tuition assistance"],
    "internalDeadline": "2025-01-15",
    "externalPostDate": "2025-01-20",
    "postedDate": "2025-01-01",
    "hiringManager": "Sarah Chen",
    "applicationCount": { "internal": 4, "external": 0 },
    "matchScore": 94,
    "matchReasons": ["Prior CNA experience in unit", "Active BLS verified", "Current Med/Surg department staff"]
  },
  {
    "id": "job002",
    "title": "Patient Relations Coordinator",
    "unitId": "unit001",
    "unitName": "4 North",
    "department": "Administration",
    "location": "Downtown Campus",
    "healthSystem": "Elite Health Network",
    "shift": "Mon-Fri",
    "shiftDetails": "9am-5pm",
    "openPositions": 1,
    "type": "internal",
    "isNonClinical": true,
    "isAISuggested": true,
    "newGradFriendly": true,
    "requirements": [
      { "name": "Communication Skills", "required": true },
      { "name": "Clinical Background", "required": false, "preferred": true }
    ],
    "benefits": ["Work-life balance", "Professional development"],
    "internalDeadline": "2025-02-01",
    "externalPostDate": "2025-02-10",
    "postedDate": "2025-01-10",
    "hiringManager": "David Vance",
    "applicationCount": { "internal": 2, "external": 5 },
    "matchScore": 88,
    "matchReasons": ["High 'Patient Relations' transferable skill (92%)", "Excellent internal reviews", "Detailed knowledge of unit workflow"]
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
