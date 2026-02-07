
import React from 'react';

type NavBtnProps = {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

const NavBtn: React.FC<NavBtnProps> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`p-3 rounded-2xl transition-all ${
      active 
        ? 'bg-[#2D5BFF] text-white shadow-lg shadow-[#2D5BFF]/30' 
        : 'text-[#F5F5F5]/20 hover:text-[#F5F5F5]/40'
    }`}
  >
    {icon}
  </button>
);

export default NavBtn;
