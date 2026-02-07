import React from 'react';

type SelectProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { id: number | string; name: string }[];
};

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-[#F5F5F5]/30 uppercase tracking-widest ml-1">{label}</label>
    <select 
      className="w-full bg-[#0A0A0B] p-4 rounded-2xl text-[#F5F5F5] font-bold outline-none border border-white/5 focus:border-[#2D5BFF]/40 transition-all appearance-none" 
      value={value} 
      onChange={e => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
    </select>
  </div>
);

export default Select;
