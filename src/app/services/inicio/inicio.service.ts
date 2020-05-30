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
    return this.http.get<Categoria[]>(environment.urlServicios+"categoria.json");
    
  }
  

  getInicio(){
    //return this.http.get<any>(environment.urlServicios+"categoria");
    return this.http.get<any>("assets/inicio.json");
  }




  ///*********************URL REALES***********************
  getZonas(){
    return this.http.get<any>(environment.urlServicios+"inicio/zonas");
   // return this.http.get<any>(environment.urlServicios+"zonas.json");
  }

  getTiendaRecomendada(idzona:any){
     return this.http.get<any>(environment.urlServicios+"inicio/tiendasrecomendadas/"+idzona);
   // return this.http.get<any>(environment.urlServicios+"tiendasrecomendadas.json");
  }

  getSearchTiendas(term:string,idzona:any){
    return this.http.get<any>(environment.urlServicios+"tienda/searchGeneral/"+idzona+"/"+term);
   // return this.http.get<any>("assets/inicio.json");
  }


}
