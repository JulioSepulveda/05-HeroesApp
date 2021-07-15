import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';





@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
`]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
    
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService, 
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('editar') ) {
      this.activatedRoute.params
      .pipe( 
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ) ) 
      )
      .subscribe( heroe => this.heroe = heroe )
    }
    
  }

  guardar() {

    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      /* Petición Put para modificar en la BBDD */
      this.heroesService.actualizarHeroe ( this.heroe )
        .subscribe( heroe => this.mostrarSnackBar( 'Registro actualizado' ) )
    }
    else {
      /* Petición Post para insertar en la BBDD */
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate( [ '/heroes/editar', heroe.id ] );
        this.mostrarSnackBar( 'Registro creado' );
      });
    }
    
  }

  borrarHeroe () {

    /* Para utilizar el dialog tendremos que crear un nuevo componente en el cual estableceremos lo que se va a mostrar en nuestro dialogo.
       Con el parámetro data podemos pasar a nuestro componente lo que queramos, en este caso el objeto heroe */
    const dialog = this.dialog.open( ConfirmarComponent, { width: '250px', data: this.heroe } );

    dialog.afterClosed().subscribe( 
      (result) => { 
        if( result ){
          this.heroesService.borrarHeroe( this.heroe.id! )
                .subscribe( resp => {
                  this.router.navigate(['/heroes']);
                });
        } 
      }
    )
    
  }

  /* En el snackBar primero se manda el mensaje, luego el texto del botón y por último la duración que queremos que se vea el snackBar. Los dos últimos son opcionales */
  mostrarSnackBar ( mensaje: string ) {
    this.snackBar.open( mensaje, 'Ok!', { duration: 2500 } );
  }

}
