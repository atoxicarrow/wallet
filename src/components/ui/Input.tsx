import React from 'react';

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ label, placeholder, type = "text", value, onChange }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-[#F5F5F5]/30 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-[#0A0A0B] p-4 rounded-2xl text-[#F5F5F5] font-bold outline-none border border-white/5 focus:border-[#2D5BFF]/40 transition-all placeholder:text-white/5" 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      required 
    />
  </div>
);

export default Input;
