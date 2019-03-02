import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajuste: Ajustes = {
    url: `assets/css/colors/default.css`,
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajuste));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajuste = JSON.parse(localStorage.getItem('ajustes'));

      this.aplicarTheme(this.ajuste.theme);

    } else {
      this.aplicarTheme(this.ajuste.theme);
    }
  }

  aplicarTheme(theme: string) {

    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajuste.theme = theme;
    this.ajuste.url = url;

    this.guardarAjustes();

  }

}


// Interface de Ajuste dos Themas
interface Ajustes {
  url: string;
  theme: string;
}
