
import React from 'react';
import { Card, ProgressBar, Badge, Button, MatchScore } from './shared';
import { Employee } from '../types';
import { AlertCircle, GraduationCap, TrendingDown, Users, Search, Mail, Eye, CheckCircle2 } from 'lucide-react';

export const InterestedCandidates: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Priority Pipeline</h2>
        <Badge status="danger">New Interest</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Internal Applications" className="border-t-4 border-primary">
          <div className="space-y-4">
            {[
              { name: 'David Miller', current: 'LPN', match: 88, shadowed: true },
              { name: 'Maria Santos', current: 'CNA', match: 94, shadowed: true },
            ].map((app, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.name}`} alt="Avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{app.name}</p>
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{app.current}</span>
                      {app.shadowed && <span className="flex items-center gap-1 text-[8px] font-black bg-teal-50 text-primary px-1.5 py-0.5 rounded uppercase border border-primary/20"><Eye className="w-2 h-2" /> Shadowed Unit</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MatchScore score={app.match} size="sm" />
                  <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Shadow Activity (Intent Signals)" className="border-t-4 border-amber">
          <div className="space-y-4">
            {[
              { name: 'James Wilson', role: 'RN (Emergency)', count: 2, last: '4 days ago' },
              { name: 'Anita Patel', role: 'CNA (3 South)', count: 1, last: '1 week ago' },
            ].map((s, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-gray-900">{s.name}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{s.role}</p>
                  <p className="text-[10px] text-amber font-bold uppercase mt-1">Shadowed {s.count}x • Last: {s.last}</p>
                </div>
                <Button variant="teal-outline" className="text-[10px] px-3 py-1.5">INVITE TO APPLY</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const TeamPipeline: React.FC<{ team: Employee[] }> = ({ team }) => {
  return (
    <Card className="p-0 overflow-hidden" title="Staff Development Hub">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Pathway</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Progress</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Est. Finish</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {team.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">{emp.currentPosition}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-600 uppercase">{emp.pathway.name}</span>
                </td>
                <td className="px-6 py-4 w-48">
                  <ProgressBar percentage={emp.pathway.progressPercent} className="h-2" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-500 uppercase">{emp.pathway.estimatedCompletion}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge status={emp.riskLevel}>{emp.riskLevel}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
