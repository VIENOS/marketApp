import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { IonList, ModalController, AlertController } from '@ionic/angular';
import { PedidoPage } from '../pedido/pedido.page';
import { ProductoCont } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  @ViewChild('list',{static: false}) list: IonList;
  lstproduct :ProductoCont[]=[];
  cupon:any;
  msgxCupon:string;
  cuponValido:boolean;
  tipoPago:any;
  lstTipoPago:any;
  habilitarpago:boolean;
  messagepago:any;

  constructor(private _servcio_producto:ProductoService,private _service_inicio:InicioService, public viewCtrl: ModalController,public alertController: AlertController) {
    this.cuponValido=false;
    this.habilitarpago=false;
    
   }

  ngOnInit() {
    this.loadList();
    this.loadListPagos();
  }

  loadList(){
    this._servcio_producto.getListProductos().subscribe(
      res=>{
        console.log("POR" +JSON.stringify(res));
        let productos = res;
      
         this.cargarProductosConContador(productos);
       
     }   
    );
  }

  cargarProductosConContador(productos:any){
    productos.forEach(p => {
      let productoCont = new ProductoCont();
      productoCont.cantidad = 1;
      productoCont.producto = p;
      this.lstproduct.push(productoCont); 
  }); 
  console.log(this.lstproduct);       
  }

  loadListPagos(){
    this._servcio_producto.getListTipoPagos().subscribe(
      res=>{
         this.lstTipoPago = res;
       //  this.tipoPago = this.lstTipoPago[0];
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
    if(this.tipoPago!==undefined && this.tipoPago.id===0){
      this.habilitarpago = false;

      return;
    }

    if(this.tipoPago.id===1){
         this.messagepago="Debe asegurarse tener el dinero exacto por medidas de precaucion...."
    }else{
      if(this.tipoPago.id===2){
        this.messagepago="el motorizado llevara un aparato para pasar la tarjet...."


      }
    }
   this.presentAlertConfirm();
}


async presentAlertConfirm() {
  const alert = await this.alertController.create({
    mode:'ios',
    header: 'Aviso',
    message: this.messagepago,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          console.log('Confirm Okay');
          console.log("CAMIO TIPO")
          this.habilitarpago = this.tipoPago!=undefined && this.tipoPago.id !=0 ? true : false; 
          console.log("HABILITADO = "+this.habilitarpago)
        }
      }
    ]
  });

  await alert.present();
}


openPolitica(){
  this.presentAlertConfirm();
}

close(){
  this.viewCtrl.dismiss();
}





sumarCantidad(id:any){
  let pos = this.lstproduct.findIndex(p=> p.producto.id === id);
   this.lstproduct[pos].cantidad =   this.lstproduct[pos].cantidad + 1  ;
}

restarCantidad(id:any){
  let pos = this.lstproduct.findIndex(p=> p.producto.id === id);
  if(this.lstproduct[pos].cantidad<=1){
    return;
  }
  this.lstproduct[pos].cantidad =   this.lstproduct[pos].cantidad - 1  ;
}

}
