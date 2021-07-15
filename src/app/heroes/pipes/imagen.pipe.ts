import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';

/* Si se pone el atributo pure a false hace que cada vez que se cambie algo en el objeto heroe se dispare el pipe */
@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if ( (!heroe.id && !heroe.alt_img) || (heroe.id && heroe.alt_img == "") ) {
      return 'assets/no-image.png';
    } else if ( heroe.alt_img ) {
      return heroe.alt_img;
    }else {
      return `assets/heroes/${ heroe.id }.jpg`;
   }
  
  }

}
