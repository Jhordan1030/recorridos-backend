import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  placa: string;

  @Column({ nullable: true })
  capacidad: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'numeric', default: 0 })
  costo_por_recorrido: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
