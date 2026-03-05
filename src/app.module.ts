import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/services/postagem.module';
import { Tema } from './tema/entities/tema.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username: 'root',
      password:'root',
      database:'db_blogpessoal',
      entities:[Postagem,Tema],
      synchronize:true,
      logging:true,
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
