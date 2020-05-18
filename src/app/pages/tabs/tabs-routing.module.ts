import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'tienda',
        loadChildren: () => import('../tienda/tienda.module').then( m => m.TiendaPageModule)
      },
      {
        path: 'contactos',
        loadChildren: () => import('../contactos/contactos.module').then( m => m.ContactosPageModule)
      },
      {
        path: 'recadeo',
        loadChildren: () => import('../recadeo/recadeo.module').then( m => m.RecadeoPageModule)
      },
      {
        path: 'llamada',
        loadChildren: () => import('../llamada/llamada.module').then( m => m.LlamadaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
