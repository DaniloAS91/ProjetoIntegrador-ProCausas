import { Postagem } from './Postagem'

export class Tema {
    public id: number
    public temaDescricao: string
    public postagem: Postagem[]
}