// src/components/WalletCard.tsx
import type { Billetera } from '../types';

// Definimos qué datos necesita este componente para funcionar
interface WalletCardProps {
  billetera: Billetera;
}

export function WalletCard({ billetera }: WalletCardProps) {
  // 1. Calculamos el porcentaje para la barra (máximo 100% para que no se salga)
  const porcentaje = Math.min(
    (billetera.monto_actual / billetera.monto_objetivo) * 100,
    100
  );

  return (
    // CONTENEDOR PRINCIPAL: Tarjeta oscura con bordes redondeados y sombra
    <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700">
      
      {/* FILA SUPERIOR: Nombre e Icono (simulado con texto por ahora) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">{billetera.nombre}</h3>
        <span className="text-2xl">💰</span>
      </div>

      {/* BARRA DE PROGRESO */}
      <div className="w-full bg-slate-900 rounded-full h-3 mb-2">
        <div 
          className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>

      {/* FILA INFERIOR: Montos */}
      <div className="flex justify-between text-sm">
        <span className="text-slate-300 font-medium">
          ${billetera.monto_actual.toLocaleString('es-CL')}
        </span>
        <span className="text-slate-500">
          Meta: ${billetera.monto_objetivo.toLocaleString('es-CL')}
        </span>
      </div>

    </div>
  );
}