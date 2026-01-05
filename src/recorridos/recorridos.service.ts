import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Recorrido } from './entities/recorrido.entity';
import { RecorridoNino } from './entities/recorrido-nino.entity';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { UpdateRecorridoDto } from './dto/update-recorrido.dto';

@Injectable()
export class RecorridosService {
  constructor(
    @InjectRepository(Recorrido)
    private recorridosRepository: Repository<Recorrido>,
    @InjectRepository(RecorridoNino)
    private recorridosNinosRepository: Repository<RecorridoNino>,
  ) {}

  async create(
    createRecorridoDto: CreateRecorridoDto,
    userId: string,
  ): Promise<Recorrido> {
    const { ninos, ...recorridoData } = createRecorridoDto;

    const recorrido = this.recorridosRepository.create({
      ...recorridoData,
      user_id: userId,
    });

    const savedRecorrido = await this.recorridosRepository.save(recorrido);

    if (ninos && ninos.length > 0) {
      const recorridosNinos = ninos.map((ninoId) =>
        this.recorridosNinosRepository.create({
          recorrido_id: savedRecorrido.id,
          niño_id: ninoId,
        }),
      );
      await this.recorridosNinosRepository.save(recorridosNinos);
    }

    return this.findOne(savedRecorrido.id);
  }

  async findAll(userId: string, rol: string): Promise<Recorrido[]> {
    const where = rol === 'admin' ? {} : { user_id: userId };
    return this.recorridosRepository.find({
      where,
      relations: ['vehiculo', 'ninos', 'ninos.nino'],
      order: { fecha: 'DESC', hora_inicio: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Recorrido> {
    const recorrido = await this.recorridosRepository.findOne({
      where: { id },
      relations: ['vehiculo', 'ninos', 'ninos.nino', 'user'],
    });
    if (!recorrido) {
      throw new NotFoundException(`Recorrido con ID ${id} no encontrado`);
    }
    return recorrido;
  }

  async findByDateRange(
    fechaInicio: string,
    fechaFin: string,
    userId: string,
    rol: string,
  ): Promise<Recorrido[]> {
    const queryBuilder = this.recorridosRepository
      .createQueryBuilder('recorrido')
      .leftJoinAndSelect('recorrido.vehiculo', 'vehiculo')
      .leftJoinAndSelect('recorrido.ninos', 'recorridosNinos')
      .leftJoinAndSelect('recorridosNinos.nino', 'nino')
      .where('recorrido.fecha >= :fechaInicio', { fechaInicio })
      .andWhere('recorrido.fecha <= :fechaFin', { fechaFin });

    if (rol !== 'admin') {
      queryBuilder.andWhere('recorrido.user_id = :userId', { userId });
    }

    return queryBuilder
      .orderBy('recorrido.fecha', 'DESC')
      .addOrderBy('recorrido.hora_inicio', 'DESC')
      .getMany();
  }

  async update(
    id: string,
    updateRecorridoDto: UpdateRecorridoDto,
  ): Promise<Recorrido> {
    const { ninos, ...recorridoData } = updateRecorridoDto as any;

    await this.findOne(id);

    if (Object.keys(recorridoData).length > 0) {
      await this.recorridosRepository.update(id, recorridoData);
    }

    if (ninos !== undefined) {
      await this.recorridosNinosRepository.delete({ recorrido_id: id });

      if (ninos && ninos.length > 0) {
        const recorridosNinos = ninos.map((ninoId: string) =>
          this.recorridosNinosRepository.create({
            recorrido_id: id,
            niño_id: ninoId,
          }),
        );
        await this.recorridosNinosRepository.save(recorridosNinos);
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const recorrido = await this.findOne(id);
    await this.recorridosNinosRepository.delete({ recorrido_id: id });
    await this.recorridosRepository.remove(recorrido);
  }

  async getEstadisticas(userId: string, rol: string) {
    const where = rol === 'admin' ? {} : { user_id: userId };

    const totalRecorridos = await this.recorridosRepository.count({ where });

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const recorridosHoy = await this.recorridosRepository
      .createQueryBuilder('recorrido')
      .where('CAST(recorrido.fecha AS TEXT) = :today', { today: todayStr })
      .andWhere(rol === 'admin' ? '1=1' : 'recorrido.user_id = :userId', {
        userId,
      })
      .getCount();

    const costoTotal = await this.recorridosRepository
      .createQueryBuilder('recorrido')
      .select('SUM(CAST(recorrido.costo AS DECIMAL))', 'total')
      .where(rol === 'admin' ? '1=1' : 'recorrido.user_id = :userId', {
        userId,
      })
      .getRawOne();

    return {
      totalRecorridos,
      recorridosHoy,
      costoTotal: parseFloat(costoTotal?.total || '0'),
    };
  }
}
