import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "./postagem.service";
import { PostagemController } from "../controllers/postagem.controller";
import { TemaModule } from "../../tema/tema.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Postagem]),
    TemaModule
  ],
  controllers: [PostagemController],
  providers: [PostagemService],
})
export class PostagemModule {}