// src/ninos/ninos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NinosService } from './ninos.service';
import { NinosController } from './ninos.controller';
import { Nino } from './entities/nino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nino])],
  controllers: [NinosController],
  providers: [NinosService],
})
export class NinosModule {}
