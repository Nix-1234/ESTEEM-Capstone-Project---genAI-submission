import React, { useState } from 'react';
import { UserProvider, NudgeProvider, useUser } from './context';
import { Navbar, Sidebar, BottomNav } from './components/layout';
import { NudgeStack } from './components/ai';
import { CompetencyInventory, PathwayProgress } from './components/passport';
import { JobsBoard, UnitProfile, ShadowHub } from './components/explore';
import { TuitionTracker, LearningHub } from './components/support';
import { InterestedCandidates, TeamPipeline, AlertCards } from './components/manager';
import { ROIDashboard, DepartmentComparison, BudgetRecommendation } from './components/executive';
import { employees, units, jobs, departments } from './data';

const ViewContainer: React.FC = () => {
  const { role } = useUser();
  const [activeTab, setActiveTab] = useState(
    role === 'employee' || role === 'student' ? 'home' : role === 'manager' ? 'dashboard' : 'roi'
  );

  // Use student data if role is student
  const currentUser = role === 'student' ? employees[1] : employees[0];
  const unit = units[0];

  const renderContent = () => {
    if (role === 'employee' || role === 'student') {
      switch (activeTab) {
        case 'home':
          return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <NudgeStack />
              <PathwayProgress employee={currentUser} />
            </div>
          );
        case 'passport':
          return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CompetencyInventory employee={currentUser} />
              <PathwayProgress employee={currentUser} />
            </div>
          );
        case 'explore':
          return (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <JobsBoard jobs={jobs} role={role} />
                <UnitProfile unit={unit} />
                <ShadowHub credits={currentUser.shadowCredits.real.remaining} />
             </div>
          );
        case 'support':
          return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {role === 'employee' && <TuitionTracker employee={currentUser} />}
              <LearningHub />
            </div>
          );
      }
    }

    if (role === 'manager') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AlertCards />
              <InterestedCandidates />
              <TeamPipeline team={employees} />
            </div>
          );
        case 'team':
          return <TeamPipeline team={employees} />;
        case 'candidates':
          return <InterestedCandidates />;
      }
    }

    if (role === 'executive') {
       return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <ROIDashboard />
             <DepartmentComparison depts={departments} />
             <BudgetRecommendation />
          </div>
       );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
        <div className="mb-8">
           <h1 className="text-4xl font-black text-gray-900 capitalize tracking-tighter">{activeTab.replace('-', ' ')}</h1>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Ascend Hub • {role.toUpperCase()} CONSOLE</p>
        </div>
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <NudgeProvider>
        <div className="min-h-screen font-['Inter'] selection:bg-primary selection:text-white">
          <Navbar />
          <ViewContainer />
        </div>
      </NudgeProvider>
    </UserProvider>
  );
};

export default App;
