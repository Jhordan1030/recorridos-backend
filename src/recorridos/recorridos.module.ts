// src/recorridos/recorridos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecorridosService } from './recorridos.service';
import { RecorridosController } from './recorridos.controller';
import { Recorrido } from './entities/recorrido.entity';
import { RecorridoNino } from './entities/recorrido-nino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recorrido, RecorridoNino])],
  controllers: [RecorridosController],
  providers: [RecorridosService],
})
export class RecorridosModule {}
