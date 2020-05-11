import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TiendaDetalleService } from 'src/app/services/tienda-detalle/tienda-detalle.service';
import { CategoriasPage } from '../categorias/categorias.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-detalle',
  templateUrl: './tienda-detalle.page.html',
  styleUrls: ['./tienda-detalle.page.scss'],
})
export class TiendaDetallePage implements OnInit {
  profileModal : any;
  public idTienda:any;
  public tienda:any;
  showHorario : boolean = false;
  constructor(private _service_det:TiendaDetalleService, public viewCtrl: ModalController,private navParams: NavParams,private router:Router) {
    this.idTienda = this.navParams.get('id');
   }

  ngOnInit() {
    this.getTienda();
  }

  getTienda(){
    this._service_det.getTienda(this.idTienda).subscribe(
          res=>{
             this.tienda = res;
             console.log(res);
          }
    );
  }

  mostrar(){
    this.showHorario = !this.showHorario;
  }

  cerrar(){
    this.showHorario = false;
  }

  close(){
    this.viewCtrl.dismiss();
}

openModal() {
  this.router.navigate(["/categorias/",this.idTienda,0]);

}

openPorCategoria(){
  //this.router.navigate(["/categorias/",categoria.id]);
  this.abrirModalCategorias(this.idTienda);
}


async abrirModalCategorias(ids){
const myModal = await this.viewCtrl.create({
  component:CategoriasPage,
  componentProps:{id:ids,nombre:this.tienda.nombre}});
await myModal.present();
}

}


