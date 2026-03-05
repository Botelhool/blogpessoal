import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name:'tb_tema'})
export class Tema {

@PrimaryGeneratedColumn()
id : number;

@Column({length:100, nullable:false})
@Transform(({value}:TransformFnParams)=> value?.trim())
@IsNotEmpty()
descricao : string;

@OneToMany(()=>Postagem,(postagem)=>postagem.tema)
postagem:Postagem[]; //Array de retorno

}