import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"tb_postagens"})//Create table tb_postagens
export class Postagem{
    
    @PrimaryGeneratedColumn() // PRIMARY KEY (id) AUTO INCREMENT
    id:number;
    
    @Transform(({value}:TransformFnParams)=> value?.trim())
    @IsNotEmpty() // validador
    @Column({length:100,nullable:false})// Varchar(100) NOT NULL
    titulo: string;
    
    @Transform(({value}:TransformFnParams)=> value?.trim())
    @IsNotEmpty() // validador
    @Column({length:1000,nullable:false})// Varchar(1000) NOT NULL
    texto:string;
    
    @UpdateDateColumn()
    data:Date;

}