
import React from 'react';
import { useUser } from '../context';
import { UserRole } from '../types';
import { Home, UserCircle, Search, Compass, ShieldPlus, Bell, TrendingUp, LayoutDashboard, Users, UsersRound, GraduationCap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole } = useUser();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg">
            <TrendingUp className="text-primary w-5 h-5" />
          </div>
          <span className="font-black text-lg hidden sm:block">Ascend Hub</span>
        </div>

        <div className="bg-secondary/40 rounded-full p-1 border border-white/10 hidden lg:flex">
          {(['student', 'employee', 'manager', 'executive'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                role === r ? 'bg-white text-primary shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-primary"></span>
          </button>
          <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
            <UserCircle className="w-6 h-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Sidebar: React.FC<{ activeTab: string; setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  const { role } = useUser();
  
  const studentItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'passport', label: 'My Passport', icon: GraduationCap },
    { id: 'explore', label: 'Explore Units', icon: Compass },
    { id: 'support', label: 'Student Support', icon: ShieldPlus },
  ];

  const employeeItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'passport', label: 'My Passport', icon: UserCircle },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'support', label: 'My Support', icon: ShieldPlus },
  ];

  const managerItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'candidates', label: 'Candidates', icon: UsersRound },
  ];

  const executiveItems = [
    { id: 'roi', label: 'ROI Dashboard', icon: TrendingUp },
    { id: 'depts', label: 'Departments', icon: LayoutDashboard },
  ];

  const items = role === 'student' ? studentItems : 
                role === 'employee' ? employeeItems : 
                role === 'manager' ? managerItems : executiveItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] hidden md:block sticky top-16">
      <div className="p-4 flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary text-white font-bold shadow-sm shadow-primary/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export const BottomNav: React.FC<{ activeTab: string; setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  const { role } = useUser();
  if (role !== 'employee' && role !== 'student') return null;

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'passport', label: 'Passport', icon: UserCircle },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'support', label: 'Support', icon: ShieldPlus },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-2 z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] ${isActive ? 'text-primary' : 'text-gray-400'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
