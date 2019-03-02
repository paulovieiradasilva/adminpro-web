import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.update(this.usuario).subscribe();
  }

  selectImage(arquivo: File) {

    if (!arquivo) {
      this.imagenSubir = null;
      return;
    }

    if (arquivo.type.indexOf('image') < 0) {
      swal('Só imagens', 'O arquivo selecionado não e uma imagem', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = arquivo;

    let reader = new FileReader();

    reader.readAsDataURL(arquivo);
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
