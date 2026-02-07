import React from 'react';

type InputProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-[#F5F5F5]/30 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-[#0A0A0B] p-4 rounded-xl text-md font-bold text-[#F5F5F5] outline-none border border-white/5 focus:border-[#2D5BFF]/40 transition-all placeholder:text-white/10" 
      required 
    />
  </div>
);

export default Input;
