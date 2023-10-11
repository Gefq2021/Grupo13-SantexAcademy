import { Product } from './product';
import { User } from './user';

export interface Alquiler {
  id: number;
  Products: [Product];
  precioFinal: number; 
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  solicitadoPor: number;
  solicitante:User
  verificadoPor:number;
  verificador:User
  comentario:string;
  verified: number;
}
