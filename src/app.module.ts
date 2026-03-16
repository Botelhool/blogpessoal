import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/services/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AppController } from './app.controller';



@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'postgres', // Neon usa PostgreSQL
  url: process.env.DATABASE_URL, // A URL de conexão é fornecida pelo Neon
  entities: [Postagem, Tema, Usuario],
  synchronize: true, // Em produção, prefira usar migrations
  ssl: true, // Ativa o SSL (obrigatório no Neon)
  extra: {
    ssl: {
      rejectUnauthorized: false, // Necessário para aceitar o certificado do Neon no Render
    },
  },
}),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
