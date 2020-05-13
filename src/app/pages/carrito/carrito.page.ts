import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { IonList, ModalController } from '@ionic/angular';
import { PedidoPage } from '../pedido/pedido.page';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  @ViewChild('list',{static: false}) list: IonList;
  lstproduct :any;
  cupon:any;
  msgxCupon:string;
  cuponValido:boolean;
  tipoPago:any;
  lstTipoPago:any;

  constructor(private _servcio_producto:ProductoService,private _service_inicio:InicioService, public viewCtrl: ModalController) {
    this.cuponValido=false;
    
   }

  ngOnInit() {
    this.loadList();
    this.loadListPagos();
  }

  loadList(){
    this._servcio_producto.getListProductos().subscribe(
      res=>{
         this.lstproduct = res;
        console.log(res);
     }   
    );
  }

  loadListPagos(){
    this._servcio_producto.getListTipoPagos().subscribe(
      res=>{
         this.lstTipoPago = res;
         this.tipoPago = this.lstTipoPago[0];
        console.log(res);
     }   
    );
  }
  

addProducto(item:any){
  console.log(item)
}

restarProducto(item:any){
  console.log(item)
  this.list.closeSlidingItems(); // efecto de cerrar los botones de los costados
}

eliminarProducto(item:any){
  console.log(item)
}


cuponValidar(){
  if(this.cupon!=undefined && this.cupon!=null && this.cupon!="" ){
    this.msgxCupon="Cupon aplicado con exito";
    this.cuponValido = true;
  }else{
    this.msgxCupon="El cupon es invalido";
    this.cuponValido = false;
  }
}

openPedido(){
  //this.router.navigate(["/categorias/",categoria.id]);
  this.abrirModalPedido();
}

async abrirModalPedido(){
const myModal = await this.viewCtrl.create({
  component:PedidoPage
});
await myModal.present();
}

OnChange($event){
  console.log("CAMIO TIPO")
}

}
