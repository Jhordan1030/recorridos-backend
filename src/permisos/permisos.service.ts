// src/permisos/permisos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso.entity';
import { RolPermiso } from './entities/rol-permiso.entity';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>,
    @InjectRepository(RolPermiso)
    private rolesPermisosRepository: Repository<RolPermiso>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    const permiso = this.permisosRepository.create(createPermisoDto);
    return this.permisosRepository.save(permiso);
  }

  async findAll(): Promise<Permiso[]> {
    return this.permisosRepository.find();
  }

  async findOne(id: string): Promise<Permiso> {
    const permiso = await this.permisosRepository.findOne({ where: { id } });
    if (!permiso) {
      throw new NotFoundException(`Permiso con ID ${id} no encontrado`);
    }
    return permiso;
  }

  async findByRol(rol: 'admin' | 'usuario'): Promise<Permiso[]> {
    const rolesPermisos = await this.rolesPermisosRepository.find({
      where: { rol },
      relations: ['permiso'],
    });
    return rolesPermisos.map((rp) => rp.permiso);
  }

  async update(
    id: string,
    updatePermisoDto: UpdatePermisoDto,
  ): Promise<Permiso> {
    await this.findOne(id);
    await this.permisosRepository.update(id, updatePermisoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const permiso = await this.findOne(id);
    await this.permisosRepository.remove(permiso);
  }

  async asignarPermisoRol(
    rol: 'admin' | 'usuario',
    permisoId: string,
  ): Promise<RolPermiso> {
    const permiso = await this.findOne(permisoId);

    const exists = await this.rolesPermisosRepository.findOne({
      where: { rol, permiso_id: permisoId },
    });

    if (exists) {
      return exists;
    }

    const rolPermiso = this.rolesPermisosRepository.create({
      rol,
      permiso_id: permisoId,
    });

    return this.rolesPermisosRepository.save(rolPermiso);
  }

  async removerPermisoRol(
    rol: 'admin' | 'usuario',
    permisoId: string,
  ): Promise<void> {
    await this.rolesPermisosRepository.delete({ rol, permiso_id: permisoId });
  }
}
