import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../lib/currency';

type HeaderProps = {
  totalBalance: number;
  onIncomeClick: () => void;
  onExpenseClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ totalBalance, onIncomeClick, onExpenseClick }) => {
  const isNegative = totalBalance < 0;

  return (
    <div className="sticky top-0 z-30 bg-[#1C1C1E] p-6 rounded-b-[2.5rem] shadow-2xl border-b border-white/5">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#F5F5F5]/40 text-xs font-bold uppercase tracking-widest">Saldo Comando</span>
        <div className="flex items-center gap-2 bg-[#2D5BFF]/10 px-3 py-1 rounded-full border border-[#2D5BFF]/20">
          <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#2D5BFF] uppercase tracking-wider">Sistema Activo</span>
        </div>
      </div>
      <h1 className={`text-5xl font-black mb-8 tracking-tighter ${isNegative ? 'text-[#FF3B30]' : 'text-[#2D5BFF]'}`}>
        {formatCurrency(totalBalance)}
      </h1>
      
      <div className="flex gap-4">
        <button 
          onClick={onIncomeClick}
          className="flex-1 bg-[#34C759] text-[#0A0A0B] py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg shadow-[#34C759]/20"
        >
          <Plus size={20} strokeWidth={3} /> INGRESO
        </button>
        <button 
          onClick={onExpenseClick}
          className="flex-1 bg-[#1C1C1E] border border-white/10 text-[#F5F5F5] py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 hover:bg-white/5"
        >
          <Minus size={20} strokeWidth={3} /> GASTO
        </button>
      </div>
    </div>
  );
};

export default Header;
