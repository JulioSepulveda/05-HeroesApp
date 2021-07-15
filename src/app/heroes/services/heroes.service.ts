import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  /* La variable baseUrl se ha declarado en los ficheros enviroments (tanto el normal como el de producción). De esta forma ya tendremos configurada la app para que en funcion
     del entorno en el que se encuentre coja una url u otra. Es importante que cuando se importa la clase enviroments importemos la normal no la .prod ya que asi la app cogera
     la correcta en cada caso */
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  /* LLamada a la BBDD creada en la carpeta  C:\Users\jsepulveda\Desktop\Curso Angular\05- Heroes-server con nombre db.json 
     Para montar esta BBDD he tenido que instalar y arrancar el json server como se ve en el link https://www.npmjs.com/package/json-server */
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroePorId( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias ( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  agregarHeroe( heroe: Heroe ) : Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe ) : Observable<Heroe> {
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe);
  }

  borrarHeroe( id: String ) : Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`);
  }

}
