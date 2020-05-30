import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  getProducto(idproducto:number): Observable<any>{
    return this.http.get<any>(environment.urlServicios+"productos/detalleProducto/"+idproducto);
    //return this.http.get<any>("assets/productoOne.json");
  }

  getListProductos(): Observable<any>{
    return this.http.get<any>("assets/producto.json");
  }

  getListTipoPagos(): Observable<any>{
    return this.http.get<any>("assets/tipopago.json");
  }

  getFiltroProducto(termino:string,idtienda:any){
    return this.http.get<any>(environment.urlServicios+"productos/searchTienda/"+idtienda+"/"+termino);
    //return this.http.get<any>("assets/producto.json");
  }




}
