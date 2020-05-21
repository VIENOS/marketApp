import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tienda } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  
  pagina:number=0;
  public tiendas: Tienda[] = [];
  constructor(private http: HttpClient) { }

  

  getSubCategorias(id:any,idzona:any){
    //  return this.http.get<any>(environment.urlServicios + "tiendas/subcategorias/"+idzona+"/"+id);
    return this.http.get<any>(environment.urlServicios + "subcategorias.json");
  }

  getSubCategoriasSugeridos(){
    //  return this.http.get<any>(environment.urlServicios + "tiendas/sugeridos/subcategorias);
    return this.http.get<any>(environment.urlServicios + "subcategorias.json");
  }
  

  getTiendaRecomendada1(){
    return this.http.get<any>("assets/tiendas1.json");
  }

  getTienda(idsubcategoria_sugerido){
    let promesa = new Promise( (resolve, reject) => {
    //  let url = environment.urlServicios+"tiendas/sugeridos/listar/"+idsubcategoria_sugerido+"/"+ this.pagina;
      let url = "assets/tiendas"+ this.pagina+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.pagina = this.pagina+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;
  }





}
