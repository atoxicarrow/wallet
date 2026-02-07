import { useState } from 'react'
import type { Billetera } from './types' // Importas la interfaz que creamos
import { WalletCard } from '../components/WalletCard';

function App() {
  // Aquí le dices a React: "misBilleteras es una lista (array) de Billeteras"
  const [misBilleteras, setMisBilleteras] = useState<Billetera[]>([]);

  return (
    <div>
      <h1>Mis Gastos de Vacaciones</h1>
      {/* Aquí iría la lógica para mostrar tus barras de progreso */}
    </div>
  )
}


// Dentro de tu JSX:
<WalletCard 
  billetera={{ 
    id_saldo: 1, 
    nombre: "Comida Playera", 
    monto_actual: 15000, 
    monto_objetivo: 50000 
  }} 
/>