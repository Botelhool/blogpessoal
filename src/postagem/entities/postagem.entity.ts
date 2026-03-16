
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:"tb_postagens"})//Create table tb_postagens
export class Postagem{
    
    @PrimaryGeneratedColumn()
    @ApiProperty() // PRIMARY KEY (id) AUTO INCREMENT
    id:number;
    
    @Transform(({value}:TransformFnParams)=> value?.trim())
    @IsNotEmpty() // validador
    @Column({length:100,nullable:false})// Varchar(100) NOT NULL
    @ApiProperty()
    titulo: string;
    
    @Transform(({value}:TransformFnParams)=> value?.trim())
    @IsNotEmpty() // validador
    @Column({length:1000,nullable:false})// Varchar(1000) NOT NULL
    @ApiProperty()
    texto:string;
    
    @UpdateDateColumn()
    @ApiProperty()
    data:Date;

    @ManyToOne(()=> Tema, (tema) => tema.postagem,{   
        onDelete:"CASCADE"
    }) 
    @ApiProperty()
      tema : Tema; //Representa a chave estrangeira


    @ManyToOne(()=> Usuario, (usuario) => usuario.postagem,{   
        onDelete:"CASCADE"
    }) 
    @ApiProperty()
    usuario: Usuario; //Representa a chave estrangeira
}