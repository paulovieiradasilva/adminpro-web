import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  f: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  verifyPassword(value1: string, value2: string) {
    return (g: FormGroup) => {

      let pw1 = g.controls[value1].value;
      let pw2 = g.controls[value2].value;

      if (pw1 === pw2) {
        return null;
      }
      return {
        equal: true
      };
    };
  }

  ngOnInit() {

    this.f = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
      terms: new FormControl(false)
    }, { validators: this.verifyPassword('password', 'confirm_password') });

    this.f.setValue({
      nombre: 'Test',
      email: 'test@email.com',
      password: '123456',
      confirm_password: '123456',
      terms: true
    });
  }

  register() {
    if (this.f.invalid) {
      return;
    }
    if (!this.f.value.terms) {
      console.log('Deve aceptar las condiciones');
      swal('Importante', 'Deve aceitar os termos', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.f.value.nombre,
      this.f.value.email,
      this.f.value.password
    );

    this._usuarioService.created(usuario).subscribe(() => this.router.navigate(['/login']));
  }

}
