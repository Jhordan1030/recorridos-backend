import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recorrido } from './recorrido.entity';
import { Nino } from '../../ninos/entities/nino.entity';

@Entity('recorridos_niños')
export class RecorridoNino {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  recorrido_id: string;

  @Column({ nullable: true })
  niño_id: string;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @ManyToOne(() => Recorrido, (recorrido) => recorrido.ninos)
  @JoinColumn({ name: 'recorrido_id' })
  recorrido: Recorrido;

  @ManyToOne(() => Nino)
  @JoinColumn({ name: 'niño_id' })
  nino: Nino;
}
