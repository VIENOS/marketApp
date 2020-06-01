import { Component, OnInit, ɵConsole } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { Categoria, Producto } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProductoPage } from '../producto/producto.page';
import { CategoriasPage } from '../categorias/categorias.page';
import { RubroTiendasPage } from '../rubro-tiendas/rubro-tiendas.page';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CarritoPage } from '../carrito/carrito.page';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Storage } from '@ionic/storage';
import { LlamadaService } from 'src/app/services/llamada/llamada.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public lstCategoria: Categoria[]=[];
  public lstProductos: Producto[]=[];
  public inicio : any;
  public rubro:any;
  public lstzonas:any;
  public zona:any;
  public lstTiendaRecomendad:any;
  public listTiendas:any;
  public activeSearch:any;
  public error:any;
  public slideOpts={
    slidesPerView: 4.0,
    freeMode:true
  };;

  
  constructor(private _service_producto:ProductoService,private storage:Storage,public _service:LlamadaService,
    public _service_tienda:TiendaService,private _service_inicio:InicioService,private router:Router,
     public viewCtrl: ModalController,private popoverCrrl:PopoverController,private _service_categoria:CategoriasService,
     public service_carrito:CarritoService) {
  
      this.service_carrito.longCarrito();
      this.activeSearch=false;
      }

  ngOnInit() {
   //this.loadList();+
   this.getInicio();

   console.log(new Date());
   this.listzonas();
  }

  listzonas(){
    this._service_inicio.getZonas().subscribe(
        res=>{
           this.lstzonas = res;
           console.log("zonas"+JSON.stringify(res));
           this.zona = this.lstzonas[0]; 
           console.log("zona"+JSON.stringify(this.zona));
           this.getTiendaRecomendada(this.zona.id);
           this.saveOfertasZona();
        }
    );
  }

  getTiendaRecomendada(idzona:any){
    this._service_inicio.getTiendaRecomendada(idzona).subscribe(
        res=>{
           this.lstTiendaRecomendad = res;
           
        }
    );
  }
  
  cambioZona(item:any){
    this.zona =item;
    console.log("zona elegida"+JSON.stringify(this.zona));
    this.getTiendaRecomendada(this.zona.id);
    this.saveOfertasZona();
  }


  find(ev:any){
    let valor = ev.target.value;
    console.log(valor);
    if(valor===undefined || valor === null || valor === ""){
      this.cancelFind();
    }else{
    this._service_inicio.getSearchTiendas(valor,this.zona.id).subscribe(
      res=>{
        this.activeSearch=true;
         this.listTiendas = res;
         console.log(res);
      },
      erro=>{
         
      }
     );
    }
  }


  getInicio(){
    this._service_inicio.getInicio().subscribe(
      res=>{
           this.lstCategoria= res;
           //this.inicio= res;
           console.log(res);
     }   
    );
  }



 

/*  find(ev: any) {
   let valor = ev.target.value;
    console.log(valor);
    if(valor===undefined || valor === null || valor === ""){
      this.cancelFind();
    }else{
      this._service_producto.getFiltroProducto(valor).subscribe(
        res=>{
            this.lstCategoria = res as Categoria[];

            let busqueda = valor;
            let expresion = new RegExp(`${busqueda}.*`, "i");
            let mascotasFiltradas = this.lstCategoria.filter(entidad => expresion.test(entidad.nombre));
            this.lstCategoria =  mascotasFiltradas;
            console.log(res);
            
        },
        error=>{
  
        }
      );
    }
 
  }*/

  cancelFind(){
    this.activeSearch=false;
    
    //this.loadList();
  }



  openRubro(i:any){
    console.log("ROBRU = "+i)
    this.abrirModalRubro(i);
  }


  async abrirModalRubro(ids){
    const myModal = await this.viewCtrl.create({
      component:RubroTiendasPage,
      componentProps:{id:ids,idzona:this.zona.id}});
    await myModal.present();
  }
  


  openPorCategoria(categoria:any){
      //this.router.navigate(["/categorias/",categoria.id]);
      this.abrirModalCategorias(categoria.id);
  }

  async abrirModalCategorias(ids){
    const myModal = await this.viewCtrl.create({
      component:CategoriasPage,
      componentProps:{id:ids}});
    await myModal.present();
  }

  openTienda(producto:any){

    console.log("PRODUCTO = "+producto.id)
    this.abrirModal(producto.id);
  }


  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:TiendaDetallePage,
      componentProps:{id:ids}});
    await myModal.present();
  }
  

  imagenclick(){
    console.log("asds")
  }

  

  openCarrito(){
    this.abrirModalCarrito();
  }

  
  async abrirModalCarrito(){
    const myModal = await this.viewCtrl.create({
      component:CarritoPage
      });
    await myModal.present();
  }


  saveOfertasZona(){     
    this._service.lstofertas = [];
    this._service.paginaofe = 0;
    this._service.zonaId=this.zona.id;
    this._service.getOfertas(this.zona.id);
  }


}
