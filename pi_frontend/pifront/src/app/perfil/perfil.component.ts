import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuarioteste: Usuario = new Usuario();
  userLogin: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {



    // console.log(
    //   this.usuarioteste.usuarioImagemUrl +
    //     ' = this.usuarioteste.usuarioImagemUrl'
    // );
    // console.log(
    //   this.userLogin.usuarioImagemUrl +
    //     ' = this.userloginteste.usuarioImagemUrl'
    // );
  }

  teste() {
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;
      environment.token = this.userLogin.usuarioToken;
      console.log(this.userLogin.usuarioImagemUrl + " = this.userLogin.usuarioImagemUrl ")
    });
  }
}
