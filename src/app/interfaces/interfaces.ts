export interface Categoria {
  id: number;
  nombre: string;
  producto: Producto[];
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  oferta:number;
}

export interface Categorias {
  id: number;
  nombre: string;
}


export interface Tienda {
  id: number;
  nombre: string;
  direccion: string;
  imagen: string;
  imagenlogo:string;
  horario:Horario[];

}

export interface Horario{
  d:any;
  o:any;
  t:any;
}



export class ProductoCont {
  producto:Producto;
  cantidad: number;
 }


 export class Datos {
  nombre:any;
  email: any;
  celular:any
  fechanacimiento:any;
 }