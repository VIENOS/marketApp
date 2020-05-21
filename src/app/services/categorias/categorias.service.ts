import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getListaCategorias(idtienda): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"productos/categorias/"+idtienda);
    return this.http.get<any>("assets/lstcategorias.json");
  }

  getRecomendados(idtienda): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"productos/recomendados/"+idzona+"/"+idRubroTienda+"/"+idsubcategoria+"/"+idtienda);
    return this.http.get<any>("assets/recomendados.json");
  }

  
  getListaProductos(idtienda,idcategoria){
    //return this.http.get<any>(environment.urlServicios+"productos/listar/"+idzona+"/"+idRubroTienda+"/"+idsubcategoria+"/"+idtienda+"/"+idcategoria);
    return this.http.get<any>(environment.urlServicios+"productos.json");
    
  }
}
