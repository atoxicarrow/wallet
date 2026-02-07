
import { MiniWallet, SavingsGoal, FixedExpense, Transaction } from '../types';

export const initialMiniWallets: MiniWallet[] = [
  { id: 1, name: 'Alimentación', allocated: 200, spent: 0, color: 'bg-[#2D5BFF]' },
  { id: 2, name: 'Telecomunicaciones', allocated: 150, spent: 0, color: 'bg-[#2D5BFF]' },
  { id: 3, name: 'Hardware & Ocio', allocated: 50, spent: 0, color: 'bg-[#2D5BFF]' },
  { id: 4, name: 'Transporte', allocated: 60, spent: 0, color: 'bg-[#2D5BFF]' },
];

export const initialSavingsGoals: SavingsGoal[] = [
  { id: 1, name: 'RTX 5090 Upgrade', target: 1200, current: 450 },
  { id: 2, name: 'Fondo Emergencia', target: 800, current: 100 },
];

export const initialFixedExpenses: FixedExpense[] = [
  { id: 1, name: 'Suscripción Dev', amount: 15, walletId: 3 },
  { id: 2, name: 'Plan Internet', amount: 35, walletId: 2 },
];

export const initialTransactions: Transaction[] = [
  { id: 1, type: 'income', amount: 2500, description: 'Sueldo Ingeniería', date: '01 feb' },
];
