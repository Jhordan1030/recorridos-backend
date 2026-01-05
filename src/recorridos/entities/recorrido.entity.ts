import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';
import { RecorridoNino } from './recorrido-nino.entity';

@Entity('recorridos')
export class Recorrido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time', nullable: true })
  hora_fin: string;

  @Column({ nullable: true })
  vehiculo_id: string;

  @Column({ nullable: true })
  tipo_recorrido: 'llevar' | 'traer' | 'ambos';

  @Column({ type: 'numeric', nullable: true })
  costo: number;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @OneToMany(() => RecorridoNino, (recorridoNino) => recorridoNino.recorrido)
  ninos: RecorridoNino[];
}
