import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data';
  reverse = true;

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  titulo: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema:string;

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {

    let token = environment.token

    window.scroll(0, 0);

    this.findAllPostagens();
    this.findAllTemas();
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    if (
      this.postagem.postTitulo == null ||
      this.postagem.postTexto == null ||
      this.postagem.tema == null
    ) {
      alert('Preencha todos os campos antes de publicar!');
    } else {
      this.postagemService
        .postPostagem(this.postagem)
        .subscribe((resp: Postagem) => {
          this.postagem = resp;
          this.postagem = new Postagem();
          alert('Postagem realizada com sucesso!');
          this.findAllPostagens();
        });
    }
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByTituloPostagem() {
    if (this.titulo === ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema() {
    if (this.nomeTema === ''){
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }
}
