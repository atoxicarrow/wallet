
export interface MiniWallet {
  id: number;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  current: number;
}

export interface FixedExpense {
  id: number;
  name: string;
  amount: number;
  walletId: number;
}

export interface Transaction {
  id: number | string;
  type: 'income' | 'expense' | 'to_savings';
  amount: number;
  description: string;
  date: string;
  walletId?: number | null;
  goalId?: number | null;
  isFixed?: boolean;
  monthKey?: string;
}

export type ActiveView = 'wallets' | 'history' | 'fixed' | 'savings';

export type ModalType = 'income' | 'expense' | 'add_savings' | 'new_goal' | 'new_wallet' | 'new_fixed' | null;
