
import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { Endereco, NgxViacepService } from '@brunoc/ngx-viacep';
import { Usuario } from '../model/Usuario';


@Component({
  selector: 'app-feed-usuario',
  templateUrl: './feed-usuario.component.html',
  styleUrls: ['./feed-usuario.component.css']
})
export class FeedUsuarioComponent implements OnInit {
  key = 'data';
  reverse = true;

  // Usuario
  dadosUsuario: Usuario = new Usuario()
  listaUsuario: Usuario[]

  // Postagem
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  idUser: number
  titulo: string;
  cepCausa: string

  // Tema
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema:string;
  UsuarioService: any;

  constructor(
    private viacep: NgxViacepService,
    private alert: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService,

  ) {}

  ngOnInit() {
    window.scroll(0, 0)
    this.findAllPostagens()
    this.findAllTemas()
    this.findByIdListaPostagem()
  }

  getIdUsuario() {
    if (environment.idUsuario == null) {
      this.idUser = null
    }
    else {
      this.idUser = environment.idUsuario
    }
  }



// Busca dados pelo CEP
  consultaCep(){
    this.viacep.buscarPorCep(this.cepCausa).then((endereco: Endereco) => {
      this.postagem.postEndereco = endereco.logradouro
      this.postagem.postCidade = endereco.localidade
      this.postagem.postEstado = endereco.uf
      this.postagem.postBairro = endereco.bairro
    })
  }


  // Buscas
  findByIdListaPostagem() {
    this.postagemService.getByIdListaPostagem(this.idUser).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
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

  // Cadastrar Novo Tema
  cadastrar(){
    if (
      this.tema.temaDescricao === undefined ||
      this.tema.temaDescricao.trim().length === 0
    ) {
      this.alert.showAlertDanger(
        'Preencha o campo de nome do tema corretamente'
      );
    } else {
      this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
        this.tema = resp;
        this.alert.showAlertSuccess('Tema cadastrado com sucesso!');
        this.findAllTemas();
        this.tema = new Tema();
      });
    }
  }

  // Publicar Nova Postagem
  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    if (
      this.postagem.postTitulo == null ||
      this.postagem.postTexto == null ||
      this.postagem.tema == null ||
      this.postagem.postEndereco == null ||
      this.postagem.postEstado == null ||
      this.postagem.postCidade == null ||
      this.postagem.postBairro == null
    ) {
      this.alert.showAlertDanger('Preencha todos os campos antes de publicar!');
    } else {
      this.postagemService
        .postPostagem(this.postagem)
        .subscribe((resp: Postagem) => {
          this.postagem = resp;
          this.postagem = new Postagem();
          this.alert.showAlertSuccess('Postagem realizada com sucesso!');
          this.findAllPostagens();
        });
    }
  }

}


