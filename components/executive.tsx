
import React from 'react';
import { Card, Badge, ProgressBar } from './shared';
import { Department } from '../types';
import { TrendingUp, DollarSign, Target, Award, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ROIDashboard: React.FC = () => {
  const metrics = [
    { label: 'Turnover Avoided', val: '$1.4M', change: '+12%', icon: DollarSign, color: 'text-success' },
    { label: 'Mobility Rate', val: '38%', change: '+5%', icon: TrendingUp, color: 'text-primary' },
    { label: 'Internal Hire Cost', val: '$4.2k', change: '-60%', icon: Target, color: 'text-amber' },
    { label: 'Pathway Success', val: '82%', change: '+8%', icon: Award, color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <Card key={i}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-success flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {m.change}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400">{m.label}</p>
            <p className="text-2xl font-black text-gray-900">{m.val}</p>
          </Card>
        );
      })}
    </div>
  );
};

export const DepartmentComparison: React.FC<{ depts: Department[] }> = ({ depts }) => {
  const chartData = depts.map(d => ({ name: d.name, mobility: d.internalMobilityRate }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-0 overflow-hidden" title="Enterprise Talent Pool Performance">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Department</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Mobility</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Turnover</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Enrollments</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {depts.map((d) => (
                <tr key={d.id}>
                  <td className="px-6 py-4"><p className="text-sm font-black text-gray-900">{d.name}</p></td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-black ${d.internalMobilityRate >= d.benchmark.mobility ? 'text-success' : 'text-amber'}`}>
                      {d.internalMobilityRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-600">{d.turnoverRate}%</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-600">{d.activePathwayEnrollments}</td>
                  <td className="px-6 py-4 text-sm font-black text-primary">${(d.costAvoided / 1000).toFixed(0)}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Mobility Comparison">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 9, fontWeight: 700 }} />
              <Tooltip />
              <Bar dataKey="mobility" fill="#0D4F4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
