
import React from 'react';
import { Card, ProgressBar, Badge, Button } from './shared';
import { Employee } from '../types';
import { AlertCircle, GraduationCap, TrendingDown, ChevronDown, Filter, Download, Mail } from 'lucide-react';

export const AlertCards: React.FC = () => {
  const alerts = [
    { label: 'Flight Risk Alert', value: 2, sub: 'Employees at risk', icon: AlertCircle, color: 'text-accent', bg: 'bg-red-50', border: 'border-red-100' },
    { label: 'Upcoming Grads', value: 4, sub: 'Next 90 days', icon: GraduationCap, color: 'text-amber', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Backfill Forecast', value: '3.5', sub: 'Projected vacancies', icon: TrendingDown, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {alerts.map((alert, i) => {
        const Icon = alert.icon;
        return (
          <div key={i} className={`${alert.bg} ${alert.border} border rounded-2xl p-6 flex items-start gap-4 transition-transform hover:scale-[1.02]`}>
            <div className={`p-3 rounded-xl bg-white shadow-sm ${alert.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{alert.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">{alert.value}</span>
                <span className="text-xs text-gray-400 font-medium">{alert.sub}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TeamPipelineTable: React.FC<{ team: Employee[] }> = ({ team }) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Team Career Pipeline</h3>
          <p className="text-sm text-gray-500">Tracking development and promotion readiness</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="text-xs flex items-center gap-1"><Filter className="w-3 h-3" /> Filter</Button>
          <Button variant="secondary" className="text-xs flex items-center gap-1"><Download className="w-3 h-3" /> Export</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Pathway</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Progress</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Est. Completion</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Risk Level</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {team.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                      {/* Fixed: Use currentPosition instead of currentRole */}
                      <p className="text-[10px] text-gray-500">{emp.currentPosition}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">{emp.pathway.name}</span>
                </td>
                <td className="px-6 py-4 w-48">
                  <ProgressBar percentage={emp.pathway.progressPercent} label="" className="w-full" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{emp.pathway.estimatedCompletion}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge status={emp.riskLevel}>{emp.riskLevel.toUpperCase()}</Badge>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
        <Button variant="ghost" className="text-xs">View Full Team Analytics</Button>
      </div>
    </Card>
  );
};
