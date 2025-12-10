# PRD: Ascend Career Hub Platform (Final)

## 1. Product Overview
**Ascend Career Hub** is a workforce development platform designed specifically for the healthcare sector. It addresses the "Internal Mobility Friction" problem—where clinical and non-clinical staff leave healthcare systems not for lack of local opportunity, but because finding and pursuing those opportunities is too difficult.

The product serves four primary user personas:
- **Students**: Exploring future health systems and specialties.
- **Employees**: Navigating their personal career pathways (e.g., CNA to RN).
- **Managers**: Identifying high-intent candidates and managing their team's development pipeline.
- **Executives**: Measuring ROI, turnover avoidance, and mobility rates to optimize recruitment budgets.

Currently, the product exists as a high-fidelity interactive prototype featuring live role-switching, a functional "AI Nudge" engine, and detailed visualizations for career progression and ROI analytics.

---

## 2. Core Features & Status

| Feature | Description | Status | Dependency |
|---------|-------------|--------|------------|
| **My Passport** | Competency inventory, transferable skills map, and pathway progress. | Implemented | Conventional |
| **NRP Customization** | Personalized Nurse Residency Program module skipping based on verified skills. | Implemented | AI-Driven |
| **Explore Hub** | Internal job board, Unit Transparency Profiles, and "Rate My Unit" reviews. | Implemented | Conventional |
| **Shadow Hub** | Virtual tours and in-person shadow credit management. | Implemented | Conventional |
| **AI Nudge Engine** | Proactive alerts for job matches, expiring benefits, and milestone reminders. | Implemented | AI-Driven |
| **Manager Dashboard** | Priority pipelines, intent signals (shadowing), and flight risk alerts. | Implemented | AI-Driven |
| **ROI Dashboard** | Metrics on turnover avoided, mobility rates, and budget recommendations. | Implemented | Conventional |
| **Non-Clinical Suggestions** | Suggesting career pivots (e.g., Patient Relations) based on clinical soft skills. | Implemented | AI-Driven |

---

## 3. AI Specification (Final)

### Tasks & Intelligence
The platform uses an **AI Intelligence Layer** (Connective Tissue) to link fragmented data points into actionable insights.
- **Intent Recognition**: Analyzes unit view counts and shadowing history to flag "High Intent" candidates to managers.
- **Transferable Skills Mapping**: Calculates match percentages between current competencies and target roles (e.g., CNA skills mapping to LPN or Admin roles).
- **Behavioral Nudges**: Evaluates rules (Loss Aversion, Scarcity, Goal Gradient) to trigger proactive UI cards.
- **NRP Personalization**: Recommends module exemptions by comparing verified competencies against curriculum requirements.

### Model / Tools
- **Client-Side Simulation**: A client-side "Rule Engine" evaluates the `nudges.json` triggers against the `employees.json` state.
- **Heuristic Algorithms**: Match scores are calculated via heuristic comparisons of user competencies and job requirements.

### Constraints & Guardrails
- **Privacy**: Staff reviews are strictly anonymous. Managers see "Intent Signals" but cannot see private shadow notes until an application is submitted.
- **Frequency**: Maximum of 3 nudges visible at once to prevent alert fatigue.

---

## 4. Technical Architecture
- **Frontend**: React.js 19 with Tailwind CSS for high-performance styling.
- **Icons**: Lucide React for consistent UI semantics.
- **Charts**: Recharts for executive-level data visualization.
- **Data Layer**: Static JSON structures (`data.ts`) simulating a robust backend schema.
- **State Management**: React Context (`UserContext`, `NudgeContext`) for role-based views and global AI state.

---

## 5. Prompting & Iteration Summary
The development followed a "Vibe Coding" approach, starting with high-level architectural umbrellas and refining into specific behavioral components.
- **Key Prompt 1**: "Build a healthcare workforce platform with three umbrellas: Passport, Explore, Support." (Established the core UX).
- **Key Prompt 2**: "AI is the connective tissue, not a feature. Create a Nudge Engine." (Shifted the product from passive to proactive).
- **Key Prompt 3**: "Managers hoard talent. Solve this by showing them high-intent internal candidates first." (Defined the competitive advantage).
- **Key Prompt 4**: "Clean up the UI with Expandable Tabs and Accordions." (Optimized for high-density information management).

---

## 6. UX & Limitations
### Intended Journey
Users start in **My Passport** to verify who they are, then move to **Explore** to see where they can go, using **Support** to fund the journey. The AI acts as a "GPS," nudging them whenever they veer off course or miss an opportunity.

### Known Limitations
- **Data Persistence**: As a prototype, data resets on page refresh.
- **Complexity**: The "Manager Tenure" and "Unit Acuity" metrics are currently mocked and would require deep EHR integration in a production environment.

---

## 7. Future Roadmap
- **Production Backend**: Integration with HRIS (Workday/Oracle) and EHR (Epic/Cerner) for real-time competency verification.
- **Generative Mentorship**: AI-powered mentor matching that connects users based on "shared struggles" identified in their pathway history.
- **Skill-Gap Learning**: Automated enrollment in CEU courses when a user views a job for which they are "90% ready."
