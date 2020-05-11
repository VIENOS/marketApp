import { Injectable } from '@angular/core';
import { Tienda } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubroTiendasService {


  public paginax:number=0;
  public tiendas: Tienda[] = [];
  constructor(private http: HttpClient) { }

  getTienda(idrubro:any){
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"tiendas"+ this.pagina;
      let url = "assets/tiendas"+ this.paginax+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.paginax = this.paginax+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;
  }


  getTiendaSearch(idrubro:any,termsearch:any){
    console.log("COMENZAMOS A BUSCAR")
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"tiendas"+ this.pagina;
      let url = "assets/tiendas"+ this.paginax+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.paginax = this.paginax+1;
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
