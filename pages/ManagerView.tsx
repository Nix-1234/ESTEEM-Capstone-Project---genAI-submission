
import React from 'react';
import { AlertCards, TeamPipelineTable } from '../components/manager-components';
import { employees } from '../data';

const ManagerView: React.FC = () => {
  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Unit Pipeline Dashboard</h1>
        <p className="text-gray-500">Managing 4 North • Sarah Chen</p>
      </div>
      
      <AlertCards />
      
      <div className="mb-8">
        <TeamPipelineTable team={employees} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Retention Prediction</h3>
          <p className="text-sm text-gray-500 mb-6">Based on pathway engagement and satisfaction scores.</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Unit Retention Health</span>
              <span className="text-sm font-bold text-success">EXCELLENT</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-success rounded-full w-[88%]"></div>
            </div>
            <p className="text-xs text-gray-400">92% of staff on active pathways remain in the unit for 2+ years.</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Development Insights</h3>
          <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm font-bold">4</div>
            <p className="text-sm text-teal-900">Staff members are eligible for <b>Preceptor Training</b> this month. Promoting them would increase your backfill readiness by 15%.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManagerView;
