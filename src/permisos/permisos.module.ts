// src/permisos/permisos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { Permiso } from './entities/permiso.entity';
import { RolPermiso } from './entities/rol-permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, RolPermiso])],
  controllers: [PermisosController],
  providers: [PermisosService],
})
export class PermisosModule {}
