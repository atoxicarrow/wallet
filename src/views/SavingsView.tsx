import React from 'react';
import { PlusCircle, Target } from 'lucide-react';
import type { SavingsGoal } from '../types';
import { formatCurrency } from '../lib/currency';

type SavingsViewProps = {
  savingsGoals: SavingsGoal[];
  onNewGoal: () => void;
  onAddSavings: (goalId: number, goalName: string) => void;
};

const SavingsView: React.FC<SavingsViewProps> = ({ savingsGoals, onNewGoal, onAddSavings }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <h2 className="font-black text-[#F5F5F5]/30 uppercase text-[10px] tracking-widest">Objetivos</h2>
        <button onClick={onNewGoal} className="text-[#2D5BFF]">
          <PlusCircle size={22} />
        </button>
      </div>
      {savingsGoals.map(goal => {
        const percent = Math.min((goal.current / goal.target) * 100, 100);
        const isComplete = percent >= 100;
        return (
          <div key={goal.id} className="bg-[#1C1C1E] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-[#F5F5F5] text-xl tracking-tight">{goal.name}</h3>
                <p className="text-[10px] text-[#34C759] font-black uppercase mt-1">Meta: {formatCurrency(goal.target)}</p>
              </div>
              <div className={`p-3 rounded-2xl ${isComplete ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#2D5BFF]/10 text-[#2D5BFF]'}`}>
                <Target size={24} />
              </div>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-black text-[#F5F5F5]">{formatCurrency(goal.current)}</span>
              <span className="text-sm font-bold text-[#F5F5F5]/30 mb-1">/ {percent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-[#0A0A0B] rounded-full overflow-hidden mb-6 border border-white/5">
              <div className="h-full bg-[#34C759] transition-all duration-1000" style={{ width: `${percent}%` }}></div>
            </div>
            <button 
              onClick={() => onAddSavings(goal.id, goal.name)}
              className="w-full bg-[#2D5BFF] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#2D5BFF]/20"
            >
              Inyectar Capital
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SavingsView;
