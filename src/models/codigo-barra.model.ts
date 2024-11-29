export interface CodigoBarra {
    productoId: number;
    codigo: string;
    activo: boolean;
    fechaAlta?: string;
    fechaModificacion?: string | null;
  }
  