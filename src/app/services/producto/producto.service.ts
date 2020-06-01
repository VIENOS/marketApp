import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  paginaofe:number=0;
  public lstProductos: Producto[] = [];

  constructor(private http: HttpClient) { }

  //lista los productos por id categoria
  getProductosPorCategoria(idCategoria:number){
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"ofertas/"+idzona+"/"+ this.pagina;
      let url = "assets/ofertas"+ this.paginaofe+".json";
      //let url = environment.urlServicios+"producto/"+idCategoria+"/"+this.paginaofe;
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lst = data as Producto[]
              const arrTemp = [ ...this.lstProductos, ...lst];
              this.lstProductos = arrTemp; 
              console.log(":: "+JSON.stringify(this.lstProductos));
              this.paginaofe = this.paginaofe+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;
  }

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
