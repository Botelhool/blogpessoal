
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name:'tb_tema'})
export class Tema {

@PrimaryGeneratedColumn()
@ApiProperty()
id : number;

@Column({length:100, nullable:false})
@Transform(({value}:TransformFnParams)=> value?.trim())
@IsNotEmpty()
@ApiProperty()
descricao : string;

@OneToMany(()=>Postagem,(postagem)=>postagem.tema)
@ApiProperty()
postagem:Postagem[]; //Array de retorno

}