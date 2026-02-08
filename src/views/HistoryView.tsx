import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import type { Transaction } from '../types';
import { formatCurrency } from '../lib/currency';

type HistoryViewProps = {
  transactions: Transaction[];
};

const HistoryView: React.FC<HistoryViewProps> = ({ transactions }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h2 className="font-black text-[#F5F5F5]/30 uppercase text-[10px] tracking-widest px-1">Historial</h2>
      <div className="space-y-2">
        {transactions.map(tx => (
          <div key={tx.id} className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl ${
                tx.type === 'income' ? 'bg-[#34C759]/10 text-[#34C759]' : 
                tx.type === 'to_savings' ? 'bg-[#2D5BFF]/10 text-[#2D5BFF]' : 'bg-[#FF3B30]/10 text-[#FF3B30]'
              }`}>
                {tx.type === 'income' ? <TrendingUp size={18} /> : tx.type === 'to_savings' ? <PiggyBank size={18} /> : <TrendingDown size={18} />}
              </div>
              <div>
                <p className="font-bold text-sm text-[#F5F5F5] leading-tight">{tx.description}</p>
                <p className="text-[10px] text-[#F5F5F5]/30 font-bold uppercase tracking-tighter mt-1">
                  {tx.date} • {tx.type === 'to_savings' ? 'RESERVA' : 'OPERACIÓN'}
                </p>
              </div>
            </div>
            <p className={`font-black text-md ${tx.type === 'income' ? 'text-[#34C759]' : 'text-[#F5F5F5]'}`}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
