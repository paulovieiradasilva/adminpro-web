import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArquivoService } from '../subir-arquivo/subir-arquivo.service';

@Injectable()
export class UsuarioService {

  constructor(
    private _http: HttpClient,
    private router: Router,
    public _subirArquivo: SubirArquivoService
  ) {
    this.cargarStorage();
  }

  usuario: Usuario;
  token: string;

  /**
   * Armazena os dados no localStorage
   */
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  /**
   * Create User
   * POST
   * @param usuario
   */
  created(usuario: Usuario) {
    return this._http.post(`${URL}/usuarios`, usuario).pipe(
      map((result: any) => {
        swal('Guardado!', usuario.email, 'success');
        return result.usuario;
      }));
  }

  update(usuario: Usuario) {
    let url = URL + '/usuarios/' + usuario._id;
    url += '?token=' + this.token;
    return this._http.put(url, usuario).pipe(map((res: any) => {
      swal('Usuários atualizado!', usuario.nombre, 'success');
      this.guardarStorage(res.usuario._id, this.token, res.usuario);
      return true;
    }));
  }

  cambiarImagen(arquivo: File, id: string) {
    this._subirArquivo.subirArquivo(arquivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        swal('Imagen atualizada!', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(res => {
        console.log(res);
      });
  }

  /**
   * Login GOOGLE
   * @param token
   */
  loginGoogle(token: string) {
    return this._http.post(`${URL}/login/google`, { token }).pipe(map((res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }

  /**
   * Login
   * POST
   */
  login(usuario: Usuario, remember: boolean = false) {
    return this._http.post<any>(`${URL}/login`, usuario).pipe(map((res: any) => {
      if (remember) {
        localStorage.setItem('email', usuario.email);
      } else {
        localStorage.removeItem('email');
      }
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  /**
   * Check Authentication
   *
   */
  check(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }
}
