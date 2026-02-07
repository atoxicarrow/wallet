export type TipoTransaccion = 'Ingreso' | 'Egreso';

export interface Billetera{
    if_saldo: number;
    nombre: string;
    monto_objetivo: number;
    monto_actual: number;
}

export interface Transaccion{
    id_transacciones: number;
    id_saldo: number;
    monto: number;
    tipo: TipoTransaccion;
    descripcion: string;
    fecha: string;
}