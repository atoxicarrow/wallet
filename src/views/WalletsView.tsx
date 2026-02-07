import React from 'react';
import { PlusCircle } from 'lucide-react';
import { MiniWallet } from '../types';

type WalletsViewProps = {
  miniWallets: MiniWallet[];
  onNewWallet: () => void;
};

const WalletsView: React.FC<WalletsViewProps> = ({ miniWallets, onNewWallet }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center px-1 mb-2">
        <h2 className="font-black text-[#F5F5F5]/30 uppercase text-[10px] tracking-widest">Mini-Wallets</h2>
        <button onClick={onNewWallet} className="text-[#2D5BFF] hover:opacity-80">
          <PlusCircle size={22} />
        </button>
      </div>
      {miniWallets.map(wallet => {
        const remaining = wallet.allocated - wallet.spent;
        const percent = Math.min((wallet.spent / wallet.allocated) * 100, 100);
        const isDanger = percent >= 90;

        return (
          <div key={wallet.id} className="bg-[#1C1C1E] p-5 rounded-3xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#F5F5F5] text-sm flex items-center gap-3">
                <div className={`w-1.5 h-6 rounded-full ${isDanger ? 'bg-[#FF3B30]' : 'bg-[#2D5BFF]'}`}></div>
                {wallet.name}
              </span>
              <div className="text-right">
                <p className={`text-lg font-black ${isDanger ? 'text-[#FF3B30]' : 'text-[#F5F5F5]'}`}>
                  ${remaining.toLocaleString()}
                </p>
                <p className="text-[9px] text-[#F5F5F5]/30 uppercase font-bold tracking-tighter">Disponible</p>
              </div>
            </div>
            <div className="w-full h-1 bg-[#0A0A0B] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isDanger ? 'bg-[#FF3B30]' : 'bg-[#2D5BFF]'}`} 
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WalletsView;
