import React from 'react';

type NavBtnProps = {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

const NavBtn: React.FC<NavBtnProps> = ({ icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all duration-300 ${
      active ? 'bg-[#2D5BFF] text-white' : 'text-[#F5F5F5]/40 hover:bg-white/5'
    }`}
  >
    {icon}
  </button>
);

export default NavBtn;
