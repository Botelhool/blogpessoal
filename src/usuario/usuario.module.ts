import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.services';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Registra a entidade Usuario para ser usada neste módulo
    TypeOrmModule.forFeature([Usuario]),
    
    // Usa forwardRef apontando para o OUTRO módulo (AuthModule)
    // Isso resolve o problema de um depender do outro
    forwardRef(() => AuthModule),
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  
  // Exportar o UsuarioService é importante para que o AuthModule 
  // consiga validar o login do usuário
  exports: [UsuarioService],
})
export class UsuarioModule {}