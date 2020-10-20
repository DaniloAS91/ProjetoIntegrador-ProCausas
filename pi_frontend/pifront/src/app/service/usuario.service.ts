import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getById(id: number){
    return this.http.get(`http://localhost:8080/usuario/${id}`, this.token)
  }

  
/*
  putUsuario(usuario: User) {
    return this.http.put('http://localhost:8080/usuario', usuario, this.token)
  }
*/
  getAllUsuarios() {
    return this.http.get('http://localhost:8080/usuario', this.token)
  }

}
