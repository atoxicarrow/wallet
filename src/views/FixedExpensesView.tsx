import React from 'react';
import { AlertCircle, RefreshCcw, Trash2 } from 'lucide-react';
import type { FixedExpense, MiniWallet } from '../types';
import { formatCurrency } from '../lib/currency';

type FixedExpensesViewProps = {
  fixedExpenses: FixedExpense[];
  miniWallets: MiniWallet[];
  onNewFixedExpense: () => void;
  deleteFixed: (id: number) => void;
};

const FixedExpensesView: React.FC<FixedExpensesViewProps> = ({ fixedExpenses, miniWallets, onNewFixedExpense, deleteFixed }) => {
  return (
    <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
      <h2 className="font-black text-[#F5F5F5]/30 uppercase text-[10px] tracking-widest px-1">Fijas</h2>

      {fixedExpenses.map(fe => (
        <div key={fe.id} className="bg-[#1C1C1E] p-5 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0A0A0B] rounded-xl flex items-center justify-center text-[#2D5BFF] border border-white/5">
              <RefreshCcw size={18} />
            </div>
            <div>
              <p className="font-black text-[#F5F5F5] tracking-tight">{fe.name}</p>
              <p className="text-[9px] font-black text-[#2D5BFF] uppercase tracking-widest mt-0.5">
                Carga a: {miniWallets.find(w => w.id === fe.walletId)?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-black text-[#F5F5F5]">{formatCurrency(fe.amount)}</span>
            <button onClick={() => deleteFixed(fe.id)} className="text-[#F5F5F5]/20 hover:text-[#FF3B30] p-1 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
      <button 
        onClick={onNewFixedExpense} 
        className="w-full border-2 border-dashed border-white/5 p-5 rounded-3xl text-[#F5F5F5]/20 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
      >
        + Añadir Compromiso Mensual
      </button>
    </div>
  );
};

export default FixedExpensesView;
