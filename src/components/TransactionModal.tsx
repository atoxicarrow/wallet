import React from 'react';
import { X } from 'lucide-react';
import Input from './ui/Input';
import Select from './ui/Select';
import { ModalType, MiniWallet, SavingsGoal } from '../types';

type TransactionModalProps = {
  showModal: ModalType;
  setShowModal: (modal: ModalType) => void;
  handleTransaction: (e: React.FormEvent) => void;
  handleNewGoal: (e: React.FormEvent) => void;
  handleNewWallet: (e: React.FormEvent) => void;
  formData: any;
  setFormData: (data: any) => void;
  walletForm: any;
  setWalletForm: (data: any) => void;
  goalForm: any;
  setGoalForm: (data: any) => void;
  miniWallets: MiniWallet[];
  savingsGoals: SavingsGoal[];
};

const TransactionModal: React.FC<TransactionModalProps> = ({ 
  showModal, setShowModal, handleTransaction, handleNewGoal, handleNewWallet, 
  formData, setFormData, walletForm, setWalletForm, goalForm, setGoalForm, 
  miniWallets, savingsGoals 
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0A0A0B]/80 backdrop-blur-md p-4">
      <div className="bg-[#1C1C1E] w-full max-w-md rounded-[3rem] p-10 shadow-2xl border border-white/10 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black tracking-tighter text-[#F5F5F5]">
            {showModal === 'new_goal' ? 'NUEVA META' : showModal === 'add_savings' ? 'AHORRAR' : 'REGISTRAR'}
          </h3>
          <button onClick={() => setShowModal(null)} className="p-3 bg-[#0A0A0B] rounded-2xl text-[#F5F5F5]/40 border border-white/5 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={
          showModal === 'new_goal' ? handleNewGoal : 
          showModal === 'new_wallet' ? handleNewWallet :
          handleTransaction
        } className="space-y-6">
          
          {showModal === 'new_goal' ? (
            <>
              <Input label="NOMBRE DE META" placeholder="Ej. GPU 5090" value={goalForm.name} onChange={v => setGoalForm({...goalForm, name: v})} />
              <Input label="OBJETIVO FINAL ($)" placeholder="0.00" type="number" value={goalForm.target} onChange={v => setGoalForm({...goalForm, target: v})} />
            </>
          ) : showModal === 'new_wallet' ? (
            <>
              <Input label="NOMBRE CATEGORÍA" placeholder="Ej. Educación" value={walletForm.name} onChange={v => setWalletForm({...walletForm, name: v})} />
              <Input label="PRESUPUESTO ASIGNADO ($)" placeholder="0.00" type="number" value={walletForm.allocated} onChange={v => setWalletForm({...walletForm, allocated: v})} />
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#F5F5F5]/30 uppercase tracking-widest ml-1">MONTO OPERACIÓN ($)</label>
                <input 
                  type="number" autoFocus placeholder="0.00" 
                  className="w-full bg-[#0A0A0B] p-6 rounded-[1.5rem] text-4xl font-black text-[#2D5BFF] outline-none border border-white/5 focus:border-[#2D5BFF]/40 transition-all placeholder:text-white/5" 
                  value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required 
                />
              </div>
              <Input label="DESCRIPCIÓN" placeholder="Detalle del movimiento" value={formData.description} onChange={v => setFormData({...formData, description: v})} />
              
              {showModal === 'expense' && (
                <Select label="ASIGNAR A MINI-WALLET" value={formData.walletId} onChange={v => setFormData({...formData, walletId: v})} options={miniWallets} />
              )}
              
              {showModal === 'add_savings' && (
                <Select label="SELECCIONAR META" value={formData.goalId} onChange={v => setFormData({...formData, goalId: v})} options={savingsGoals} />
              )}
            </>
          )}
          
          <button type="submit" className="w-full bg-[#2D5BFF] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#2D5BFF]/30 active:scale-95 transition-all mt-4">
            EJECUTAR ACCIÓN
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
