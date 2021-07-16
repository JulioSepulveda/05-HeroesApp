import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) {}

  /* Evita que se active el módulo, este cargado o no. Se complementa con el CanLoad para que sea realmente segura la app */
  /* EL pipe del return hace que si no está logado lo envie a la página de login. Para ello en el método verificaAutenticacion tenemos que devolver un Observable no un boolean
     ya que si no no podríamos utilizar el pipe */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
            }
          })
        );
  }

  /* Puede cargar un módulo. Solo sirve para cargar el módulo, si ya estuviera cargado previamente no serviria, necesitariamos el canActivate para que sea realmente seguro */
  /* EL pipe del return hace que si no está logado lo envie a la página de login. Para ello en el método verificaAutenticacion tenemos que devolver un Observable no un boolean
     ya que si no no podríamos utilizar el pipe */
  /* Si no se utiliza lazyLoad no es necesario utilizar el canLoad */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
            }
          })
        );
  }
}
