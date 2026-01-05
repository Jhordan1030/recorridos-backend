// src/ninos/ninos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nino } from './entities/nino.entity';
import { CreateNinoDto } from './dto/create-nino.dto';
import { UpdateNinoDto } from './dto/update-nino.dto';

@Injectable()
export class NinosService {
  constructor(
    @InjectRepository(Nino)
    private ninosRepository: Repository<Nino>,
  ) {}

  async create(createNinoDto: CreateNinoDto, userId: string): Promise<Nino> {
    const nino = this.ninosRepository.create({
      ...createNinoDto,
      user_id: userId,
    });
    return this.ninosRepository.save(nino);
  }

  async findAll(userId: string, rol: string): Promise<Nino[]> {
    const where = rol === 'admin' ? {} : { user_id: userId };
    return this.ninosRepository.find({
      where,
      order: { nombre: 'ASC' },
    });
  }

  async findActive(userId: string, rol: string): Promise<Nino[]> {
    const where =
      rol === 'admin' ? { activo: true } : { user_id: userId, activo: true };
    return this.ninosRepository.find({
      where,
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Nino> {
    const nino = await this.ninosRepository.findOne({ where: { id } });
    if (!nino) {
      throw new NotFoundException(`Niño con ID ${id} no encontrado`);
    }
    return nino;
  }

  async update(id: string, updateNinoDto: UpdateNinoDto): Promise<Nino> {
    await this.findOne(id);
    await this.ninosRepository.update(id, updateNinoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const nino = await this.findOne(id);
    await this.ninosRepository.remove(nino);
  }
}
