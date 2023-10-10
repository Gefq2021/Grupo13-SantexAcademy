import { Product } from './product';
import { User } from './user';

export interface Alquiler {
  products: [Product];
  precioFinal: number; 
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  solicitadoPor: User;
  verificadoPor:User;
  id: number;
  comentario:string;
}
