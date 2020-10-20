import { Postagem } from './Postagem'

export class Usuario {
    public id: number
    public usuarioNome:  string  
    public usuarioEmail:string
    public usuarioSenha:string
    public usuarioNascimento: string
    public usuarioDocumento: string
    public usuarioImagemUrl: string
    public postagem: Postagem[]
    
}