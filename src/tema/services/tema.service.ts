import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository, DeleteResult } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>
  ) {}

  findAll(): Promise<Tema[]> {
    return this.temaRepository.find({
      relations: {
        postagem: true,
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: { id },
      relations: {
        postagem: true,
      },
    });

    if (!tema)
      throw new HttpException("Id inválido", HttpStatus.NOT_FOUND);

    return tema;
  }

  findAllByDescricao(descricao: string): Promise<Tema[]> {
    return this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagem: true,
      },
    });
  }

  create(tema: Tema): Promise<Tema> {
    
    return this.temaRepository.save(tema);
    
  }

  async update(tema: Tema): Promise<Tema> {
    await this.findById(tema.id);

    return this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.temaRepository.delete(id);
  }
}