import { Component, OnInit } from '@angular/core';
import { Categoria, Producto, Categorias } from 'src/app/interfaces/interfaces';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductoPage } from '../producto/producto.page';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  public recomendados:any;
  public lstCategoria: Categorias[]=[];
  public categoriaSelect:Categorias;
  public lstProductos: Producto[]=[];
  public idCategoria:number;
  public idTienda:number;
  public nomTienda:any;


  public slideOpts={
    slidesPerView: 2.0,
    freeMode:true
  };
  public slideone={
    slidesPerView: 1.7,
    freeMode:true,
    spaceBetween:-50
  };

  

  constructor(private _service_inicio:InicioService,private activatedRoute: ActivatedRoute,private _service_categoria:CategoriasService,private router:Router, public viewCtrl: ModalController,private navParams: NavParams) {
      this.idCategoria = this.navParams.get('id');
      this.idTienda =   this.navParams.get('idtienda');
      if(this.idTienda!=undefined){
          this.nomTienda =this.navParams.get('nombre');
      }
    //this.idCategoria = this.activatedRoute.snapshot.params.id;

   /* if(this.activatedRoute.snapshot.params.idtienda!=undefined || this.activatedRoute.snapshot.params.idtienda!=null ){
      this.idTienda = this.activatedRoute.snapshot.params.idtienda;
      console.log("ID TIENDA= "+this.idTienda);
    }*/
   
    console.log("ID = "+this.idCategoria);
    console.log("idtienda = "+this.idTienda);
   }

  ngOnInit() {
   this.loadList();
   this.getListaCategorias();
   this.recomendadosList();
  }

  recomendadosList(){
    this._service_categoria.getRecomendados().subscribe(
      res=>{
         this.recomendados = res;
     }   
    );
  }


  loadList(){
    this._service_inicio.getLista().subscribe(
      res=>{
        this.lstProductos= res[0].producto;
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



  /********metodos del select */
  getListaCategorias(){
    console.log("IDee = "+this.idCategoria)
    this._service_categoria.getListaCategorias().subscribe(
      res=>{
         this.lstCategoria = res as Categorias[];
         if(this.lstCategoria.length>0){
           this.categoriaSelect = this.lstCategoria[0];
         }
        // let lstCategoriaFiltrado = this.lstCategoria.filter(entidad => entidad.id == this.idCategoria);
        // this.categoriaSelect = lstCategoriaFiltrado[0];
         console.log(res)
         console.log("ID = "+this.idCategoria)
        console.log(this.categoriaSelect );
     }   
    );
  }


  OnChange(event){
    console.log("seleciono id = "+event.target.value.id)
  }
  /********fin metodos del select */

  openProducto(producto:any){

    console.log("PRODUCTO = "+producto.id)
    this.abrirModal(producto.id);
  }


  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:ProductoPage,
      componentProps:{id:ids}});
    await myModal.present();
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
