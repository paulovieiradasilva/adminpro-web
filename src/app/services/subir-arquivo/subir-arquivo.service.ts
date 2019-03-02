import { Injectable } from '@angular/core';
import { URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArquivoService {

  constructor() { }

  subirArquivo(arquivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', arquivo, arquivo.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }

        }
      };

      let url = URL + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
