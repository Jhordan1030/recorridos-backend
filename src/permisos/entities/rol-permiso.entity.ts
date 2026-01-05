// src/permisos/entities/rol-permiso.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Permiso } from './permiso.entity';

@Entity('roles_permisos')
export class RolPermiso {
  @PrimaryColumn()
  rol: 'admin' | 'usuario';

  @PrimaryColumn()
  permiso_id: string;

  @ManyToOne(() => Permiso)
  @JoinColumn({ name: 'permiso_id' })
  permiso: Permiso;
}
