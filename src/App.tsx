import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { 
  LayoutGrid,
  Clock,
  RefreshCcw,
  PiggyBank,
} from 'lucide-react';

import type { 
  MiniWallet, 
  SavingsGoal, 
  FixedExpense, 
  Transaction, 
  ActiveView, 
  ModalType 
} from './types';

import { 
  initialMiniWallets, 
  initialSavingsGoals, 
  initialFixedExpenses, 
  initialTransactions 
} from './lib/initialData';

import Header from './components/Header';
import TransactionModal from './components/TransactionModal';
import { WalletsView, SavingsView, HistoryView, FixedExpensesView } from './views';
import NavBtn from './components/ui/NavBtn';

export default function App() {
  const [miniWallets, setMiniWallets] = useLocalStorage<MiniWallet[]>('miniWallets', initialMiniWallets);
  const [savingsGoals, setSavingsGoals] = useLocalStorage<SavingsGoal[]>('savingsGoals', initialSavingsGoals);
  const [fixedExpenses, setFixedExpenses] = useLocalStorage<FixedExpense[]>('fixedExpenses', initialFixedExpenses);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeView, setActiveView] = useState<ActiveView>('wallets');
  const [showModal, setShowModal] = useState<ModalType>(null);
  
  const [formData, setFormData] = useState({ amount: '', description: '', walletId: 1, goalId: 1 });
  const [walletForm, setWalletForm] = useState({ name: '', allocated: '' });
  const [goalForm, setGoalForm] = useState({ name: '', target: '' });
  const [fixedForm, setFixedForm] = useState({ name: '', amount: '', walletId: 1 });

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthKey = `${currentMonth}-${currentYear}`;
    const hasProcessedFixed = transactions.some(t => t.isFixed && t.monthKey === monthKey);

    if (!hasProcessedFixed && fixedExpenses.length > 0) {
      const newAutoTxs = fixedExpenses.map(fe => ({
        id: Date.now() + Math.random(),
        type: 'expense' as const,
        amount: fe.amount,
        description: `[AUTO] ${fe.name}`,
        walletId: fe.walletId,
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        isFixed: true,
        monthKey: monthKey
      }));

      setTransactions(prev => [...newAutoTxs, ...prev]);
      setMiniWallets(prevWallets => prevWallets.map(w => {
        const totalFixedForThisWallet = fixedExpenses
          .filter(fe => fe.walletId === w.id)
          .reduce((acc, curr) => acc + curr.amount, 0);
        return { ...w, spent: w.spent + totalFixedForThisWallet };
      }));
    }
  }, [fixedExpenses, transactions]);

  useEffect(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savings = transactions.filter(t => t.type === 'to_savings').reduce((acc, t) => acc + t.amount, 0);
    setTotalBalance(income - expenses - savings);
  }, [transactions]);

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    const amount = parseFloat(formData.amount);
    const type = showModal;

    const newTx: Transaction = {
      id: Date.now(),
      type: type === 'add_savings' ? 'to_savings' : type as 'income' | 'expense',
      amount,
      description: formData.description,
      walletId: type === 'expense' ? parseInt(String(formData.walletId)) : null,
      goalId: type === 'add_savings' ? parseInt(String(formData.goalId)) : null,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
    };

    setTransactions([newTx, ...transactions]);

    if (type === 'expense') {
      setMiniWallets(miniWallets.map(w => 
        w.id === parseInt(String(formData.walletId)) ? { ...w, spent: w.spent + amount } : w
      ));
    }

    if (type === 'add_savings') {
      setSavingsGoals(savingsGoals.map(g => 
        g.id === parseInt(String(formData.goalId)) ? { ...g, current: g.current + amount } : g
      ));
    }

    setFormData({ amount: '', description: '', walletId: miniWallets[0]?.id || 1, goalId: savingsGoals[0]?.id || 1 });
    setShowModal(null);
  };

  const handleNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: SavingsGoal = {
      id: Date.now(),
      name: goalForm.name,
      target: parseFloat(goalForm.target),
      current: 0
    };
    setSavingsGoals([...savingsGoals, goal]);
    setGoalForm({ name: '', target: '' });
    setShowModal(null);
  };

  const handleNewWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const wallet: MiniWallet = {
      id: Date.now(),
      name: walletForm.name,
      allocated: parseFloat(walletForm.allocated),
      spent: 0,
      color: 'bg-[#2D5BFF]'
    };
    setMiniWallets([...miniWallets, wallet]);
    setWalletForm({ name: '', allocated: '' });
    setShowModal(null);
  };

  const handleNewFixedExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fixedForm.name || !fixedForm.amount) return;
    const newFixed: FixedExpense = {
      id: Date.now(),
      name: fixedForm.name,
      amount: parseFloat(fixedForm.amount),
      walletId: parseInt(String(fixedForm.walletId)),
    };
    setFixedExpenses([...fixedExpenses, newFixed]);
    setFixedForm({ name: '', amount: '', walletId: miniWallets[0]?.id || 1 });
    setShowModal(null);
  };

  const deleteFixed = (id: number) => {
    setFixedExpenses(fixedExpenses.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F5] font-sans pb-28 selection:bg-[#2D5BFF] selection:text-white pt-8">
      <Header 
        totalBalance={totalBalance} 
        onIncomeClick={() => setShowModal('income')} 
        onExpenseClick={() => setShowModal('expense')} 
      />

      <main className="px-6 mt-6">
        {activeView === 'wallets' && <WalletsView miniWallets={miniWallets} onNewWallet={() => setShowModal('new_wallet')} />}
        {activeView === 'savings' && <SavingsView savingsGoals={savingsGoals} onNewGoal={() => setShowModal('new_goal')} onAddSavings={(goalId, goalName) => { setFormData({...formData, goalId, description: `Aporte a ${goalName}`}); setShowModal('add_savings'); }} />}
        {activeView === 'history' && <HistoryView transactions={transactions} />}
        {activeView === 'fixed' && <FixedExpensesView fixedExpenses={fixedExpenses} miniWallets={miniWallets} onNewFixedExpense={() => setShowModal('new_fixed')} deleteFixed={deleteFixed} />}
      </main>

      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleTransaction={handleTransaction}
        handleNewGoal={handleNewGoal}
        handleNewWallet={handleNewWallet}
        handleNewFixedExpense={handleNewFixedExpense}
        formData={formData}
        setFormData={setFormData}
        walletForm={walletForm}
        setWalletForm={setWalletForm}
        goalForm={goalForm}
        setGoalForm={setGoalForm}
        fixedForm={fixedForm}
        setFixedForm={setFixedForm}
        miniWallets={miniWallets}
        savingsGoals={savingsGoals}
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E]/90 backdrop-blur-2xl border-t border-white/5 px-8 py-5 flex justify-around items-center z-40">
        <NavBtn icon={<LayoutGrid size={24} />} active={activeView === 'wallets'} onClick={() => setActiveView('wallets')} />
        <NavBtn icon={<PiggyBank size={24} />} active={activeView === 'savings'} onClick={() => setActiveView('savings')} />
        <NavBtn icon={<RefreshCcw size={24} />} active={activeView === 'fixed'} onClick={() => setActiveView('fixed')} />
        <NavBtn icon={<Clock size={24} />} active={activeView === 'history'} onClick={() => setActiveView('history')} />
      </nav>
    </div>
  );
}
