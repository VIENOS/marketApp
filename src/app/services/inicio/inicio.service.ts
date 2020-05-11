import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria, Producto } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { }

  getLista(){
    //return this.http.get<Categoria[]>(environment.urlServicios+"categoria");
    return this.http.get<Categoria[]>("assets/categoria.json");
    
  }
  
  getFiltroProducto(termino:string){
    //return this.http.get<any>(environment.urlServicios+"categoria");
    return this.http.get<Categoria[]>("assets/categoria.json");
  }


  getInicio(){
    //return this.http.get<any>(environment.urlServicios+"categoria");
    return this.http.get<any>("assets/inicio.json");
  }

  getRecomendados(): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"lstcategorias");
    return this.http.get<any>("assets/recomendadosini.json");
  }
}
