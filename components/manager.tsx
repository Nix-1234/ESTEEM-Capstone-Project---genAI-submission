import React, { useState } from 'react';
import { Card, ProgressBar, Badge, Button, MatchScore, Accordion } from './shared';
import { Employee } from '../types';
import { AlertCircle, GraduationCap, TrendingDown, Users, Search, Mail, Eye, CheckCircle2, Filter, Download, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export const AlertCards: React.FC = () => {
  const alerts = [
    { 
      label: 'Flight Risk Alert', 
      value: 2, 
      sub: 'Employees at risk', 
      icon: AlertCircle, 
      color: 'text-accent', 
      bg: 'bg-red-50', 
      border: 'border-red-200' 
    },
    { 
      label: 'Upcoming Grads', 
      value: 4, 
      sub: 'Next 90 days', 
      icon: GraduationCap, 
      color: 'text-amber', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200' 
    },
    { 
      label: 'Backfill Forecast', 
      value: '3.5', 
      sub: 'Projected vacancies', 
      icon: TrendingDown, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {alerts.map((alert, i) => {
        const Icon = alert.icon;
        return (
          <div key={i} className={`${alert.bg} ${alert.border} border rounded-2xl p-6 flex items-start gap-4 transition-all hover:shadow-md cursor-default group`}>
            <div className={`p-3 rounded-xl bg-white shadow-sm ${alert.color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{alert.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">{alert.value}</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{alert.sub}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const InterestedCandidates: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Priority Interested Candidates</h2>
        <Badge status="danger">High Intent</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Internal Applications" className="border-t-4 border-primary">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">Sorted by Match Score</p>
          <div className="space-y-4">
            {[
              { name: 'David Miller', current: 'LPN', match: 88, shadowed: true, experience: '3 Years' },
              { name: 'Maria Santos', current: 'CNA', match: 94, shadowed: true, experience: '33 Months' },
            ].map((app, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.name}`} alt="Avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{app.name}</p>
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{app.current} • {app.experience}</span>
                      {app.shadowed && (
                        <span className="flex items-center gap-1 text-[8px] font-black bg-teal-50 text-primary px-1.5 py-0.5 rounded uppercase border border-primary/20">
                          <Eye className="w-2.5 h-2.5" /> Shadowed Unit
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right mr-2 hidden sm:block">
                     <p className="text-[8px] font-black text-gray-400 uppercase">Match</p>
                     <p className="text-xs font-black text-primary">{app.match}%</p>
                  </div>
                  <MatchScore score={app.match} size="sm" />
                  <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Shadow Activity (Interest Signals)" className="border-t-4 border-amber">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">Intent Signaling Engine</p>
          <div className="space-y-4">
            {[
              { name: 'James Wilson', role: 'RN (Emergency)', count: 2, last: '4 days ago', match: 78 },
              { name: 'Anita Patel', role: 'CNA (3 South)', count: 1, last: '1 week ago', match: 91 },
            ].map((s, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl flex items-center justify-between group hover:bg-gray-50 transition-all">
                <div>
                  <p className="text-sm font-black text-gray-900">{s.name}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{s.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-amber font-black uppercase">Shadowed {s.count}x</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{s.last}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="hidden sm:block text-right">
                      <p className="text-[8px] font-black text-gray-400 uppercase">Readiness</p>
                      <p className="text-xs font-black text-secondary">{s.match}%</p>
                   </div>
                   <Button variant="teal-outline" className="text-[10px] px-3 py-1.5 whitespace-nowrap">INVITE TO APPLY</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const TeamPipeline: React.FC<{ team: Employee[] }> = ({ team }) => {
  const [sortKey, setSortKey] = useState<'name' | 'progress'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedTeam = [...team].sort((a, b) => {
    let valA: any = a.name;
    let valB: any = b.name;

    if (sortKey === 'progress') {
      valA = a.pathway.progressPercent;
      valB = b.pathway.progressPercent;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: 'name' | 'progress') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Staff Development Pipeline</h3>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time tracking of unit internal talent</p>
        </div>
        <div className="flex gap-2 h-fit">
          <Button variant="secondary" className="text-[10px] flex items-center gap-1 font-black"><Filter className="w-3 h-3" /> FILTER</Button>
          <Button variant="secondary" className="text-[10px] flex items-center gap-1 font-black"><Download className="w-3 h-3" /> EXPORT</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th onClick={() => toggleSort('name')} className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase cursor-pointer hover:text-primary transition-colors">
                <div className="flex items-center gap-1">Employee {sortKey === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}</div>
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Pathway</th>
              <th onClick={() => toggleSort('progress')} className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase cursor-pointer hover:text-primary transition-colors">
                <div className="flex items-center gap-1">Progress {sortKey === 'progress' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}</div>
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Est. Completion</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Risk Level</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedTeam.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs border border-primary/20">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-black">{emp.currentPosition}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{emp.pathway.name}</span>
                </td>
                <td className="px-6 py-4 w-48">
                  <ProgressBar percentage={emp.pathway.progressPercent} label="" className="h-1.5" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-black text-gray-500 uppercase">{emp.pathway.estimatedCompletion}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge status={emp.riskLevel}>{emp.riskLevel.toUpperCase()}</Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-gray-400 hover:text-primary transition-all hover:scale-125">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-secondary transition-all hover:scale-125">
                      <TrendingDown className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
