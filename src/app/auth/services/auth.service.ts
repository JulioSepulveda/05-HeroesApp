import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { Auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor( private http: HttpClient ) { }

  /* Con el segundo tap guardamos el id en el localStorage para que si recargan la página no pierdan el logueo anterior que realizaron y asi puedan seguir navegando por la app */
  login() {
    return this.http.get<Auth>(`${this.baseurl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id) )
      );
  }

  /* El método of sirve para resolver un Onservable de boolean. De esa forma no nos daría error ya que este método tiene que devolver un Observable.
     También podríamos resolverlo poniendo la cabecera de la siguiente forma: verificaAutenticacion(): Observable<boolean> | boolean {}. Con esa cabecera podríamos 
     devolver true o false */
  verificaAutenticacion(): Observable<boolean> {
    
    if ( !localStorage.getItem('token') ) {
      return of(false);
    }

    /* En el pipe podemos indicar el el _auth = auth para mantener el nombre de usuario en la parte superior de la app cuando se recargue */
    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
      .pipe( 
        map( auth => { 
          this._auth = auth;
          return true;
        }) 
      );

  }
}
