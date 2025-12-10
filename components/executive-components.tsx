
import React from 'react';
import { Card, ProgressBar, Badge, Button } from './shared';
import { Department } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
// Fixed: Added Award to the lucide-react imports
import { DollarSign, ArrowUpRight, Target, Users, TrendingUp, Lightbulb, ChevronRight, Award } from 'lucide-react';

export const MetricsCards: React.FC = () => {
  const metrics = [
    { label: 'Turnover Avoided', value: '$1.4M', sub: '+12% vs LY', icon: DollarSign, color: 'text-success' },
    { label: 'Internal Mobility', value: '38%', sub: 'Target: 40%', icon: TrendingUp, color: 'text-primary' },
    { label: 'Internal Hire Cost', value: '$4.2k', sub: 'vs $12k External', icon: Target, color: 'text-amber' },
    { label: 'Pathway Completion', value: '82%', sub: '+5% this qtr', icon: Award, color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <Card key={i} className="flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <Badge status="info">YTD</Badge>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{m.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{m.value}</h3>
              <p className="text-xs font-semibold text-success mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {m.sub}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export const DepartmentTable: React.FC<{ depts: Department[] }> = ({ depts }) => {
  const data = depts.map(d => ({
    name: d.name,
    mobility: d.internalMobilityRate,
    turnover: d.turnoverRate,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 p-0 overflow-hidden" title="Departmental Performance">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Internal Mobility</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Turnover Rate</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Active Pathways</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cost Avoided</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {depts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{d.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${d.internalMobilityRate >= d.benchmark.mobility ? 'text-success' : 'text-amber'}`}>
                        {d.internalMobilityRate}%
                      </span>
                      <span className="text-[10px] text-gray-400">vs {d.benchmark.mobility}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${d.turnoverRate <= d.benchmark.turnover ? 'text-success' : 'text-accent'}`}>
                        {d.turnoverRate}%
                      </span>
                      <span className="text-[10px] text-gray-400">vs {d.benchmark.turnover}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{d.activePathwayEnrollments}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary">${(d.costAvoided / 1000).toFixed(0)}k</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Mobility Comparison">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="mobility" fill="#0D4F4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-gray-400 mt-4 text-center italic">Mobility rate represents staff advancing to higher clinical roles.</p>
      </Card>
    </div>
  );
};

export const BudgetRecommendation: React.FC = () => {
  return (
    <Card className="bg-primary text-white border-none p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4 text-teal-200">
            <Lightbulb className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Q3 Optimization Insight</span>
          </div>
          <h2 className="text-3xl font-black mb-4">Reallocate $250k from External Recruitment</h2>
          <p className="text-teal-50/80 mb-6 text-lg max-w-2xl">
            Our data shows that internal candidates from the <b>CNA → RN</b> pathway have 40% higher retention rates after 12 months. Expanding the NCLEX Prep Sponsorship by 50 slots will yield a projected $1.2M in annual savings.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-white text-primary border-none hover:bg-teal-50">View ROI Analysis</Button>
            <Button className="bg-accent hover:bg-red-700 border-none">Approve Reallocation</Button>
          </div>
        </div>
        <div className="w-full md:w-64 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-teal-100">Current Spend</span>
              <span className="text-lg font-bold">$1.8M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-teal-100">Target Savings</span>
              <span className="text-lg font-bold text-success">$480k</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] text-teal-200 uppercase font-semibold mb-2">Confidence Level</p>
              <ProgressBar percentage={94} color="bg-success" className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
