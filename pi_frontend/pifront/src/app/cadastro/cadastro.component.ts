import { HttpClient } from '@angular/common/http';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUnlock, faAddressCard, faCalendarAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario()
  senha: string
  email: string
  cpfUsuario: string
  ok: false
  listaUsuario: Usuario[]

  constructor(
    private alerta: AlertasService,
    private authService: AuthService,
    private router: Router,
  ) { }

  faEnvelope = faEnvelope
  faUser = faUser
  faLock = faLock
  faUnlock = faUnlock
  faAddressCard = faAddressCard
  faCalendarAlt = faCalendarAlt
  faCamera = faCamera

  ngOnInit(): void {
  }

  conferirSenha(event: any) {
    this.senha = event.target.value
  }

  conferirEmail(event: any) {
    this.email = event.target.value
  }

  formatarEmail(){
    if (this.email.includes('@') && this.email.includes('.com')){
      this.confDigitosSenha()
    }
    else{
      this.alerta.showAlertDanger('Formato de Email Incorreto!')
    }
  }

  confDigitosSenha(){
    if (this.senha.length >= 8) {
      this.cadastrar()
    }
    else {
      this.alerta.showAlertDanger('Sua senha deve conter no minimo 8 digitos!')
    }
  }

  cadastrar() {
    if ( this.senha === this.usuario.usuarioSenha && this.email === this.usuario.usuarioEmail) {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso!')
      }, err => {
        if (err.status == '500') {
          this.alerta.showAlertDanger('CPF ou Email ja Cadastrado!')
        }
      })
    } else {
      this.alerta.showAlertDanger('Suas senhas ou email não conferem')
    }
  }

}
