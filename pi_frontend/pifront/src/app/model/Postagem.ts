import { Tema } from './Tema'
import { Usuario } from './Usuario'

export class Postagem {
    public id: number
    public postTitulo:string
    public postTexto:string
    public postCidade:string
    public postEstado:string
    public postEndereco:string
    public postBairro: string
    public postTag:string
    public postUrl:string
    public postImagem:string
    public data: Date
    public tema: Tema
    public usuario: Usuario
}
