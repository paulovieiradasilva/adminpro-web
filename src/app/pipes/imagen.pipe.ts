import { Pipe, PipeTransform } from '@angular/core';
import { URL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    let url = `${URL}/img`;

    if (!img) {
      return url + '/usuarios/sem-imagem.abc';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de imagens no existe, usuario, medico, ');
        url += '/usuarios/xxxx';
        break;
    }


    return url;
  }

}
