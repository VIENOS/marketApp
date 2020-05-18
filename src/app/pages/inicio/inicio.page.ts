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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public recomendados:any;
  public lstCategoria: Categoria[]=[];
  public lstProductos: Producto[]=[];
  public inicio : any;
  public rubro:any;
  public lstzonas:any;
  public zona:any;
  public lstTiendaRecomendad:any;
  public slideOpts={
    slidesPerView: 4.0,
    freeMode:true
  };;

  
  constructor(public _service_tienda:TiendaService,private _service_inicio:InicioService,private router:Router, public viewCtrl: ModalController,private popoverCrrl:PopoverController,private _service_categoria:CategoriasService,public service_carrito:CarritoService) { }

  ngOnInit() {
   //this.loadList();+
   this.getInicio();
   this.recomendadosList();
   this.listzonas();
   this.getTiendaRecomendada();
   console.log(new Date());
  }


  getTiendaRecomendada(){
    this._service_tienda.getTiendaRecomendada().subscribe(
        res=>{
           this.lstTiendaRecomendad = res;
           this._service_tienda.getTiendaRecomendada1().subscribe(
            res=>{
              this.lstTiendaRecomendad.push( ...res); 
            }
        );
        }
    );
  }
  
  listzonas(){
    this._service_tienda.getZonas().subscribe(
        res=>{
          console.log("zonas"+res);
           this.lstzonas = res;
           this.zona = this.listzonas.length>0 ? this.listzonas[0]:undefined; 
        }
    );
  }

  getInicio(){
    this._service_inicio.getInicio().subscribe(
      res=>{
           this.inicio= res;
           console.log(res);
     }   
    );
  }


  recomendadosList(){
    this._service_inicio.getRecomendados().subscribe(
      res=>{
         this.recomendados = res;
     }   
    );
  }

  loadList(){
    this._service_inicio.getLista().subscribe(
      res=>{
         this.lstCategoria = res;
         this.lstProductos = this.lstCategoria[0].producto;
        console.log(res);
     }   
    );
  }

  find(ev: any) {
   let valor = ev.target.value;
    console.log(valor);
    if(valor===undefined || valor === null || valor === ""){
      this.cancelFind();
    }else{
      this._service_inicio.getFiltroProducto(valor).subscribe(
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
 
  }

  cancelFind(){
    this.loadList();
  }



  openRubro(rubro:any){
 
    
    console.log("ROBRU = "+rubro.id)
    this.abrirModalRubro(rubro.id);
  }


  async abrirModalRubro(ids){
    const myModal = await this.viewCtrl.create({
      component:RubroTiendasPage,
      componentProps:{id:ids}});
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

  
  verOfertas(){

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

}
