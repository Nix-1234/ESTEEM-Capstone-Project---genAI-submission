import React from 'react';
import { Card, Badge, ProgressBar, Button } from './shared';
import { Department } from '../types';
import { TrendingUp, DollarSign, Target, Award, ArrowUpRight, Lightbulb, TrendingDown, Users, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ROIDashboard: React.FC = () => {
  const metrics = [
    { label: 'Turnover Avoided', val: '$1.4M', change: '+12%', sub: 'vs Last Year', icon: DollarSign, color: 'text-success' },
    { label: 'Internal Mobility', val: '38%', change: '+5%', sub: 'Target: 40%', icon: TrendingUp, color: 'text-primary' },
    { label: 'Internal Hire Cost', val: '$4.2k', change: '-60%', sub: 'vs External ($12k)', icon: Target, color: 'text-amber' },
    { label: 'Pathway Success', val: '82%', change: '+8%', sub: 'Completion Rate', icon: Award, color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <Card key={i} className="hover:scale-[1.05] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black flex items-center gap-0.5 ${m.change.startsWith('+') ? 'text-success' : 'text-accent'}`}>
                {m.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />} {m.change}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{m.label}</p>
            <p className="text-3xl font-black text-gray-900 mb-1">{m.val}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{m.sub}</p>
          </Card>
        );
      })}
    </div>
  );
};

export const DepartmentComparison: React.FC<{ depts: Department[] }> = ({ depts }) => {
  const chartData = depts.map(d => ({ name: d.name, mobility: d.internalMobilityRate }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 p-0 overflow-hidden" title="Departmental Analysis & Benchmarking">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Staff</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobility Rate</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Turnover Rate</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {depts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-900">{d.name}</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase">{d.activePathwayEnrollments} Active Pathways</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-600">{d.staffCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-xs font-black ${d.internalMobilityRate >= d.benchmark.mobility ? 'text-success' : 'text-amber'}`}>
                        {d.internalMobilityRate}%
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Target: {d.benchmark.mobility}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-xs font-black ${d.turnoverRate <= d.benchmark.turnover ? 'text-success' : 'text-accent'}`}>
                        {d.turnoverRate}%
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">Max: {d.benchmark.turnover}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-primary">${(d.costAvoided / 1000).toFixed(0)}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Mobility Comparison Index">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 9, fontWeight: 700, fill: '#6B7280' }} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="mobility" fill="#0D4F4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
           <p className="text-[10px] text-gray-500 font-black uppercase text-center leading-tight mb-2">Internal Talent Pool Health</p>
           <ProgressBar percentage={88} color="bg-primary" className="h-2" />
        </div>
      </Card>
    </div>
  );
};

export const BudgetRecommendation: React.FC = () => {
  return (
    <Card className="bg-primary text-white border-none p-10 overflow-hidden relative shadow-2xl shadow-primary/30 group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6 text-teal-200">
            <Lightbulb className="w-6 h-6 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">Executive Strategy Recommendation</span>
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">Reallocate $250k Recruitment Spend to Internal Pathways</h2>
          <p className="text-teal-50/80 mb-8 text-lg max-w-3xl leading-relaxed font-medium">
            Our enterprise predictive model indicates that internal candidates from the <b>CNA → RN</b> pathway have <b>40% higher retention rates</b> after 12 months than external hires. Reallocating budget to expand NCLEX Prep Sponsorship by 50 slots will yield a projected <b>$1.2M in annual cost avoidance</b>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-white text-primary border-none hover:bg-teal-50 px-8 py-3 font-black tracking-tight flex items-center gap-2">
              VIEW ROI ANALYSIS <ChevronRight className="w-4 h-4" />
            </Button>
            <Button className="bg-accent hover:bg-red-700 border-none px-8 py-3 font-black tracking-tight">APPROVE REALLOCATION</Button>
          </div>
        </div>
        <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-teal-100 font-black uppercase tracking-widest">Current External Spend</span>
              <span className="text-2xl font-black">$1.8M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-teal-100 font-black uppercase tracking-widest">Projected Savings</span>
              <span className="text-2xl font-black text-success">$480k</span>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] text-teal-200 uppercase font-black mb-3">Model Confidence Score</p>
              <div className="relative h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-success w-[94%] transition-all duration-1000 ease-out"></div>
              </div>
              <p className="text-right text-[10px] font-black text-success mt-2 tracking-widest uppercase">94% CONFIDENCE</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
