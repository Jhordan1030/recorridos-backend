// src/vehiculos/vehiculos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculosRepository: Repository<Vehiculo>,
  ) {}

  async create(
    createVehiculoDto: CreateVehiculoDto,
    userId: string,
  ): Promise<Vehiculo> {
    const vehiculo = this.vehiculosRepository.create({
      ...createVehiculoDto,
      user_id: userId,
    });
    return this.vehiculosRepository.save(vehiculo);
  }

  async findAll(userId: string, rol: string): Promise<Vehiculo[]> {
    const where = rol === 'admin' ? {} : { user_id: userId };
    return this.vehiculosRepository.find({
      where,
      order: { tipo: 'ASC' },
    });
  }

  async findActive(userId: string, rol: string): Promise<Vehiculo[]> {
    const where =
      rol === 'admin' ? { activo: true } : { user_id: userId, activo: true };
    return this.vehiculosRepository.find({
      where,
      order: { tipo: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Vehiculo> {
    const vehiculo = await this.vehiculosRepository.findOne({ where: { id } });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return vehiculo;
  }

  async update(
    id: string,
    updateVehiculoDto: UpdateVehiculoDto,
  ): Promise<Vehiculo> {
    await this.findOne(id);
    await this.vehiculosRepository.update(id, updateVehiculoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculosRepository.remove(vehiculo);
  }
}
