// src/permisos/entities/permiso.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
