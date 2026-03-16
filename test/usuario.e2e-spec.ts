import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes dos Modulos Usuario e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;

  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      //chamar o sqlite para criar o banco de dados em memória
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'], //_dirname é o dieretorio raiz da aplicacao -> aqui ele vai procurar tudo q termina com entity.ts dentro das pastas entities e gerar entidades do bd
          synchronize: true, //para sincronizar se tiver alguma mudança na entidade, ele vai atualizar o banco de dados automaticamente
          dropSchema: true, //para dropar o banco de dados toda vez que iniciar a aplicação, para evitar dados antigos e garantir um ambiente limpo para os testes
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //biblioteca validation - para validar os testes
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  //os metodos sao assicronos, o afterAll so vai ser executado qnd tds os tests tiverem sido executados
  //criar o afterALl - qnd terminar os testes, ele fecha a aplicação para liberar os recursos do sistema
  afterAll(async () => {
    await app.close();
  });
 
  //cada teste deve fazer uma coisa só
  //metodo de teste no nest = it() -> recebe uma descrição do teste e uma função assíncrona que contém o código do teste

   //testar o endpoint de cadastro de usuário
  it('01- Deve cadastrar um novo usuario', async () => {
    const resposta = await request(app.getHttpServer()) //getHttpServer() é um método do NestJS que retorna o servidor HTTP criado pela aplicação, para que possamos fazer requisições a ele usando o supertest
      //configurar a requisição:
      .post('/usuarios/cadastrar') //endpoint de cadastro de usuário
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-'
      })
      expect(201); //espera que o status seja 201 - criado
    
      usuarioId = resposta.body.id; //pegar o id do usuário criado para usar nos próximos testes
    });

    it('02- Não deve cadastrar um usuario ja existente', async () => {
    const resposta = await request(app.getHttpServer()) //getHttpServer() é um método do NestJS que retorna o servidor HTTP criado pela aplicação, para que possamos fazer requisições a ele usando o supertest
      //configurar a requisição:
      .post('/usuarios/cadastrar') //endpoint de cadastro de usuário
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-'
      })
      expect(400); //espera que o status seja 400 - bad request
      //expect(resposta.stauts).toBe(400); 
    });

    //testar o endpoint de login
    it('03- Deve autenticar um usuario cadastrado', async () => {
      const resposta = await request(app.getHttpServer())
        .post('/usuarios/logar')
        .send({
          usuario: 'root@root.com.br',
          senha: 'rootroot'
        })
        expect(200);
        token = resposta.body.token; //pegar o token do usuário logado para usar nos próximos testes
    })


    //listar todos os usuários - endpoint protegido, precisa do token de autenticação
    it('04- Deve listar todos os usuarios', async () => {
      await request(app.getHttpServer())
        .get('/usuarios/all') //get pq é consulta
        .set('Authorization',`${token}`) //configurar o header de autorização com o token do usuário logado
        expect(200);
    });


    //atualizar um usuário - endpoint protegido, precisa do token de autenticação
    it('05- Deve atualizar os dados de um usuario que ja existe', async () => {
      await request(app.getHttpServer())
        .put('/usuarios/atualizar') //put pq é atualização
        .set('Authorization', `${token}`) //configurar o header de autorização com o token do usuário logado
        .send({
          id: usuarioId,
          nome: 'Root Atualizado',
          usuario: 'root@root.com.br',
          senha: 'rootroot',
          foto: '-'
        })
        expect(200);   
    });

    //procurar um usuário pelo id - endpoint protegido, precisa do token de autenticação
    it('06-Deve procurar um usuário pelo id',async()=>{
      await request(app.getHttpServer())
      .get(`/usuarios/${usuarioId}`)//get pq é consulta,passar o id do usuário na url
      .set('Authorization',`${token}`)
      expect(200);
    })

});