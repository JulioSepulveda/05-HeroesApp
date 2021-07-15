import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{ 
         width: 100%;
         border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  @Input() heroe!: Heroe; 

  /* Tenemos que declarar el activateRoute para poder acceder a las rutas en el ngOnInit por ejemplo y saber con que id estamos trabajando */
  constructor( private activateRoute: ActivatedRoute, 
               private heroesService: HeroesService,
               private router: Router ) { }

  ngOnInit(): void {
    /* Lo del ({id}) es para desestructurar lo que recibimos y así poder coger solo el id que es lo que queremos */
    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
      )
      .subscribe(heroe => this.heroe = heroe );
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
