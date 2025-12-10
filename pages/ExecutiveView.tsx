
import React from 'react';
import { MetricsCards, DepartmentTable, BudgetRecommendation } from '../components/executive-components';
import { departments } from '../data';

const ExecutiveView: React.FC = () => {
  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Executive ROI Dashboard</h1>
          <p className="text-gray-500">Health System Workforce Analytics</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Facilities</option>
            <option>Central Hospital</option>
            <option>East Side Medical</option>
          </select>
          <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-50">Generate Report</button>
        </div>
      </div>

      <MetricsCards />
      <DepartmentTable depts={departments} />
      <BudgetRecommendation />
    </main>
  );
};

export default ExecutiveView;
