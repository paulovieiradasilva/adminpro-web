import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;

  auth2: any;
  userGoogle: any;

  constructor(private router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.remember = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '207089760121-odv5caf1geh9rh36s6b4uhk6pbnknmum.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btn-google'));
    });
  }

  attachSignin(elemento) {
    this.auth2.attachClickHandler(elemento, {}, (userGoogle) => {
      let token = userGoogle.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard');
    });
  }

  ingressar(f: NgForm) {
    if (f.invalid) {
      return;
    }
    let user = new Usuario(null, f.value.email, f.value.password);
    this._usuarioService.login(user, f.value.remember).subscribe(() => this.router.navigate(['/dashboard']));
  }

}
