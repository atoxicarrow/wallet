import React from 'react';

type SelectProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { id: number; name: string }[];
};

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-[#F5F5F5]/30 uppercase tracking-widest ml-1">{label}</label>
    <select 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-[#0A0A0B] p-4 rounded-xl text-md font-bold text-[#F5F5F5] outline-none border border-white/5 focus:border-[#2D5BFF]/40 transition-all appearance-none"
    >
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  </div>
);

export default Select;
