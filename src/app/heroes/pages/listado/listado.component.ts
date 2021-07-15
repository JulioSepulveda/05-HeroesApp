import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  /* Con el mat-card indicamos que haya una separación horizontal de 20px en todos los mat-card de la página listado */
  styles: [ ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = []; 

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
    /* LLamamos a nuestro servicio el cual tendrá todo lo referente a las llamadas a nuestra BBDD */
    this.heroesService.getHeroes()
      .subscribe( resp => this.heroes = resp );
  }

}
