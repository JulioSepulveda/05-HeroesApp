import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

/* En este módulo solo declaramos las rutas principales */
const routes: Routes = [
  /* En el siguiente objeto estamos definiendo las rutas de la carpeta auth de forma perezosa (lazyLoad) */
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  /* Los métodos canLoad y canActivate pertenecen al guard creado en el módulo auth. Evita que pueda entrar o cargar los módulos de esta ruta sin estár logado. 
     En el caso que intente acceder se queda en blanco */
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
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
