import { Product } from './product';
import { User } from './user';

export interface Alquiler {
  Products: [Product];
  precioFinal: number; 
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  solicitadoPor: number;
  solicitante:User
  verificadoPor:number;
  verificador:User
  id: number;
  comentario:string;
  verified: number;
}
