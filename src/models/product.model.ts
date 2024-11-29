import { CodigoBarra } from './codigo-barra.model';  

export interface ProductData {
    id: number;
    nombre: string;         
    precio: number;         
    cantidadEnStock: number;  
    activo: boolean;        
    codigosBarra?: CodigoBarra[];
    fechaAlta?: string;   
    fechaModificacion?: string | null; 
  }
