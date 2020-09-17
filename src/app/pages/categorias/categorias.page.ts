import { Component, OnInit } from '@angular/core';
import { Categoria, Producto, Categorias, ProductoCont } from 'src/app/interfaces/interfaces';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductoPage } from '../producto/producto.page';
import { ModalController, NavParams } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  public recomendados: any;
  public lstCategoria: Categorias[] = [];
  public categoriaSelect: Categorias;
  public lstProductos: ProductoCont[] = [];
  public idCategoria: number;
  public idTienda: number;
  public nomTienda: any;
  public idzona: any;
  public idRubroTienda: any;
  public idsubcategoria: any;
  public verFiltros: boolean;
  public error404: boolean;
  public lstProducto: Producto[] = [];


  public slideOpts = {
    slidesPerView: 2.0,
    freeMode: true
  };
  public slideone = {
    slidesPerView: 1.7,
    freeMode: true,
    spaceBetween: -50
  };



  constructor(public service_carrito: CarritoService, private _service_inicio: InicioService, private activatedRoute: ActivatedRoute, private _service_categoria: CategoriasService, private router: Router, public viewCtrl: ModalController, private navParams: NavParams
    , public _serviceProducto: ProductoService) {
    this.idzona = this.navParams.get('idzona');
    this.idRubroTienda = this.navParams.get('idRubroTienda');
    this.idsubcategoria = this.navParams.get('idsubcategoria');
    this.idTienda = this.navParams.get('idtienda');
    this.verFiltros = true;
    this.idCategoria = this.navParams.get('id');

    //this.idCategoria = this.activatedRoute.snapshot.params.id;

    /* if(this.activatedRoute.snapshot.params.idtienda!=undefined || this.activatedRoute.snapshot.params.idtienda!=null ){
       this.idTienda = this.activatedRoute.snapshot.params.idtienda;
       console.log("ID TIENDA= "+this.idTienda);
     }*/

    //console.log("ZONA  = "+this.idzona);
    //console.log("RUBRO TIENDA = "+this.idRubroTienda);
    //console.log("SUBCATEGORIA = "+this.idsubcategoria);
    //console.log("TIENDA = "+this.idTienda);
    //console.log("CARRITO LON = "+ this.service_carrito.longCarrito());
    console.log("ID CATEGORÍA :: " + this.idCategoria);
    //this.service_carrito.longCarrito();

  }

  ngOnInit() {

    //this.getListaCategorias();
    //this.recomendadosList();
    //this._serviceProducto.getProductosPorCategoria(this.idCategoria);
    this.getProductosPorCategoria();
  }

  getProductosPorCategoria() {
    this._serviceProducto.getProductosPorCategoria(this.idCategoria).then(res => {
      console.log("resultado:");
      console.log(JSON.stringify(res));
      this.lstProducto = res as Producto[];
      //console.log("this.lstProducto: " + JSON.stringify(this.lstProducto));
    }).catch(error => {
      console.log("error no hay lstProducto");
    });
  }

  /*recomendadosList(){
    this._service_categoria.getRecomendados(this.idTienda).subscribe(
      res=>{
        console.log("PRODUCTOS RECOMENDADOS =  "+JSON.stringify(res))
         let recom = res;
         this.recomendados=[]
         recom.forEach(p => {
           let productoCont = new ProductoCont();
           productoCont.cantidad = 1;
           productoCont.producto = p;
           this.recomendados.push(productoCont); 
           }); 
     }   
    );
  }*/


  /*loadList(){
    this._service_categoria.getListaProductos(this.idTienda,this.categoriaSelect.id).subscribe(
      res=>{
        let productos= res;
        if(productos.codigo){
                this.error404=true;
        }else{
          console.log("PRODUCTOS "+JSON.stringify(res))
            this.error404=false;
           this.cargarProductosConContador(productos);
        }
        
     }   
    );
  }*/



  sumarCantidad(id: any) {
    let pos = this.lstProductos.findIndex(p => p.producto.id === id);
    this.lstProductos[pos].cantidad = this.lstProductos[pos].cantidad + 1;
  }

  restarCantidad(id: any) {
    let pos = this.lstProductos.findIndex(p => p.producto.id === id);
    if (this.lstProductos[pos].cantidad <= 1) {
      return;
    }
    this.lstProductos[pos].cantidad = this.lstProductos[pos].cantidad - 1;
  }

  find(ev: any) {
    let valor = ev.target.value;
    console.log("VALOR= " + valor);
    if (valor === undefined || valor === null || valor === "") {
      this.cancelFind();
    } else {
      this._serviceProducto.getFiltroProducto(valor, this.idCategoria).subscribe(
        res => {
          //let productos= res;
          this.verFiltros = false;
          //this.lstProducto=[];
          //.cargarProductosConContador(productos);
          this.lstProducto = res;
          console.log("PRODUCTOS BUSCADOR: " + JSON.stringify(res));
        },
        error => {
          this.verFiltros = true;
        }
      );
    }

  }

  cargarProductosConContador(productos: any) {
    this.lstProductos = []
    productos.forEach(p => {
      let productoCont = new ProductoCont();
      productoCont.cantidad = 1;
      productoCont.producto = p;
      this.lstProductos.push(productoCont);
    });
    console.log(this.lstProductos);
  }

  cancelFind() {
    this.verFiltros = true;
    //this.loadList();
  }

  cambioCategorias(item: any) {
    this.categoriaSelect = item;
    console.log("zona elegida" + JSON.stringify(this.categoriaSelect));
    //this.loadList();
  }

  /********metodos del select */
  /*getListaCategorias(){
    console.log("IDee SUB= "+this.idsubcategoria)
    this._service_categoria.getListaCategorias(this.idsubcategoria).subscribe(
      res=>{
         this.lstCategoria = res as Categorias[];
         if(this.lstCategoria.length>0){
           this.categoriaSelect = this.lstCategoria[0];
           this.loadList();
         }
        // let lstCategoriaFiltrado = this.lstCategoria.filter(entidad => entidad.id == this.idCategoria);
        // this.categoriaSelect = lstCategoriaFiltrado[0];
         console.log(res)
         console.log("ID = "+this.idCategoria)
        console.log(this.categoriaSelect );
     }   
    );
  }*/


  OnChange(event) {
    console.log("seleciono id = " + event.target.value.id)
  }
  /********fin metodos del select */

  openProducto(producto: any) {

    console.log("PRODUCTO = " + producto.id);
    this.abrirModal(producto.id);
  }


  async abrirModal(ids) {
    const myModal = await this.viewCtrl.create({
      component: ProductoPage,
      componentProps: { id: ids }
    });
    await myModal.present();
  }

  close() {
    this._serviceProducto.lstProductos = [];
    this._serviceProducto.paginaofe = 0;
    this.viewCtrl.dismiss();
  }


  /*addCarrito(item:ProductoCont){
    console.log("add carrito " + JSON.stringify(item))
    this.service_carrito.guardarCarrito(item);   
  }*/
  guardarCarrito(pruducto: any) {
    let item = new ProductoCont();
    var idProductoString = pruducto.id;
    var idProductoNumber: number = +idProductoString;

    var precioString = pruducto.precio;
    var precioNumber: number = +precioString;

    var ofertaString = pruducto.oferta;
    var ofertaNumber: number = +ofertaString;

    pruducto.id = idProductoNumber;
    pruducto.precio = precioNumber;
    pruducto.oferta = ofertaNumber;

    item.producto = pruducto;
    item.cantidad = 1;
    this.service_carrito.guardarCarrito(item);
  }


  openCarrito() {
    this.abrirModalCarrito();
  }


  async abrirModalCarrito() {
    const myModal = await this.viewCtrl.create({
      component: CarritoPage
    });
    await myModal.present();
  }

  siguiente_pagina(event) {
    this._serviceProducto.getProductosPorCategoria(this.idCategoria).then(res => {
      console.log("resultado:");
      console.log(JSON.stringify(res));
      this.lstProducto = res as Producto[];
      event.target.complete();
    }).catch(error => {
      console.log("error no hay página siguiente");
      event.target.complete();
    });
  }

}
