import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  
  // ADICIONE ESTAS 2 LINHAS ABAIXO (O Construtor)
  constructor(private configService: ConfigService) {} 

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'), // Agora isso vai funcionar!
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}