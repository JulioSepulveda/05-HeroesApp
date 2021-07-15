import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HeroesModule } from './heroes/heroes.module';

/* En este módulo solo declaramos las rutas principales */
const routes: Routes = [
  /* En el siguiente objeto estamos definiendo las rutas de la carpeta auth de forma perezosa (lazyLoad) */
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    /* Se puede realizar de las dos siguientes formas. O igual que el elemento anterior o redireccionandolo al anterior */
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

/* Se importa el forRoot solamente porque solo están  definidas las rutas principales */
@NgModule({
  imports: [
    RouterModule.forRoot ( routes )
  ],
exports: [
  RouterModule
]

})
export class AppRoutingModule { }
