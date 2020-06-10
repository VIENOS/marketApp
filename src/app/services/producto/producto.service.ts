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
  public lstProductos: any[] = [];

  constructor(private http: HttpClient) { }

  //lista los productos por id categoria
  getProductosPorCategoria(idCategoria:number){
    let promesa = new Promise( (resolve, reject) => {
      //console.log("entrando a getProductosPorCategoria:: "+JSON.stringify(this.lstProductos));
      //let url = environment.urlServicios+"ofertas/"+idzona+"/"+ this.pagina;
      //let url = "assets/ofertas"+ this.paginaofe+".json";
      let url = environment.urlServicios+"productos/producto/"+idCategoria+"/"+this.paginaofe;
      console.log(":::URL:::::" + url);
      
      this.http.get(url).subscribe( 
          data => { 
              console.log(data);
              let lst = data as any[];
              const arrTemp = [ ...this.lstProductos, ...lst];
              this.lstProductos = arrTemp; 
              console.log("saliendo de getProductosPorCategoria:: "+JSON.stringify(this.lstProductos));
              this.paginaofe = this.paginaofe+1;
            resolve(this.lstProductos);
          } ,
          error=>{
            reject();
          }
          );
    });
    return promesa;
  }

  getProducto(idproducto:number): Observable<any>{
    let url = environment.urlServicios+"productos/detalleProducto/"+idproducto;
    console.log("detalle producto: " + "idProducto: " + idproducto + " URL: " + url);
    return this.http.get<any>(url);
    //return this.http.get<any>("assets/productoOne.json");
  }

  getListProductos(): Observable<any>{
    return this.http.get<any>("assets/producto.json");
  }

  getListTipoPagos(): Observable<any>{
    return this.http.get<any>("assets/tipopago.json");
  }

  getFiltroProducto(termino:string,idcategoria:any){
    return this.http.get<any>(environment.urlServicios+"productos/search/"+idcategoria+"/"+termino);
    //return this.http.get<any>("assets/producto.json");
  }




}
