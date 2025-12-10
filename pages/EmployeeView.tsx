
import React from 'react';
import { Sidebar } from '../components/layout';
import { PathwayVisualization, InternalJobsBoard, UnitProfile, TuitionBenefits, AINudge } from '../components/employee-components';
import { employees, pathways, jobs, units } from '../data';

const EmployeeView: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('pathway');
  const employee = employees[0];
  const pathway = pathways[0];
  const unit = units[0];

  const renderContent = () => {
    switch (activeTab) {
      case 'pathway':
        return <PathwayVisualization employee={employee} pathway={pathway} />;
      case 'jobs':
        return <InternalJobsBoard jobs={jobs} />;
      case 'unit':
        return <UnitProfile unit={unit} />;
      case 'tuition':
        return <TuitionBenefits employee={employee} />;
      default:
        return <PathwayVisualization employee={employee} pathway={pathway} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
        <AINudge employee={employee} />
        {renderContent()}
      </main>
    </div>
  );
};

export default EmployeeView;
