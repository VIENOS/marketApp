import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tienda } from 'src/app/interfaces/interfaces';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  pagina: number = 0;
  public tiendas: any[] = [];
  constructor(private http: HttpClient) { }



  getSubCategorias(id: any, idzona: any) {
    return this.http.get<any>(environment.urlServicios + "tienda/subcategorias/" + id);
    //return this.http.get<any>(environment.urlServicios + "subcategorias.json");
  }

  getSubCategoriasSugeridos() {
    return this.http.get<any>(environment.urlServicios + "tienda/subcategoriasLista");
    // return this.http.get<any>(environment.urlServicios + "subcategorias.json");
  }


  getTiendaRecomendada1() {
    return this.http.get<any>("assets/tiendas1.json");
  }

  getTienda(idsubcategoria_sugerido) {
    let promesa = new Promise((resolve, reject) => {
      let url = environment.urlServicios + "tienda/tiendasSugeridos/" + idsubcategoria_sugerido + "/" + this.pagina;
      // let url = "assets/tiendas"+ this.pagina+".json";
      this.http.get(url).subscribe(
        (data: any) => {
          if (!data.msg) {
            console.log(data)
            let lsttiendas = data as any;
            this.tiendas.push(...lsttiendas);
            console.log(this.tiendas)
            this.pagina = this.pagina + 1;
            resolve();
          } else {
            resolve();
          }

        },
        error => {
          resolve();
        }
      );
    });
    return promesa;
  }



  /*getValidarTiendaTraerCoordenadas(request): Observable<any>{
    return this.http.post<any>(
      environment.urlServicios+'carrito/coordenadasTienda',
     // "assets/coordenadas.json" ,
      JSON.stringify(request),).pipe(map((response: any) => response),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      }
     )
    );
}*/

  getTraerCoordenadasTienda() {
    return this.http.get<any>(environment.urlServicios + "carrito/coordenadasTienda");
  }


}
