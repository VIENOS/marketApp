import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getListaCategorias(idsubcategoria): Observable<any>{
    
    return this.http.get<any>(environment.urlServicios+"productos/subcategorias/"+idsubcategoria);
   // return this.http.get<any>("assets/lstcategorias.json");
  }

  getRecomendados(idtienda): Observable<any>{
    http://reportes.elvisalcantara.com/index.php/deliveriando/productos/recomendados/1
    return this.http.get<any>(environment.urlServicios+"productos/recomendados/"+idtienda);
    //return this.http.get<any>("assets/recomendados.json");
  }

  
  getListaProductos(idtienda,idcategoria){
    return this.http.get<any>(environment.urlServicios+"productos/listar/"+idtienda+"/"+idcategoria);
   // return this.http.get<any>(environment.urlServicios+"productos.json");
    
  }
}
