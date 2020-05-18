import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'tabs/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'llamada',
    loadChildren: () => import('./pages/llamada/llamada.module').then( m => m.LlamadaPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'tienda-detalle',
    loadChildren: () => import('./pages/tienda-detalle/tienda-detalle.module').then( m => m.TiendaDetallePageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'rubro-tiendas',
    loadChildren: () => import('./pages/rubro-tiendas/rubro-tiendas.module').then( m => m.RubroTiendasPageModule)
  },
  {
    path: 'contacto-detalle',
    loadChildren: () => import('./pages/contacto-detalle/contacto-detalle.module').then( m => m.ContactoDetallePageModule)
  },
  {
    path: 'cesion',
    loadChildren: () => import('./pages/cesion/cesion.module').then( m => m.CesionPageModule)
  },
  {
    path: 'recadeo',
    loadChildren: () => import('./pages/recadeo/recadeo.module').then( m => m.RecadeoPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'mapa-tienda',
    loadChildren: () => import('./pages/mapa-tienda/mapa-tienda.module').then( m => m.MapaTiendaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
