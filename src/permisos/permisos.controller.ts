// src/permisos/permisos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { AsignarPermisoDto } from './dto/asignar-permiso.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('permisos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @Get()
  findAll() {
    return this.permisosService.findAll();
  }

  @Get('rol/:rol')
  findByRol(@Param('rol') rol: 'admin' | 'usuario') {
    return this.permisosService.findByRol(rol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisosService.remove(id);
  }

  @Post('asignar')
  asignarPermisoRol(@Body() asignarPermisoDto: AsignarPermisoDto) {
    return this.permisosService.asignarPermisoRol(
      asignarPermisoDto.rol,
      asignarPermisoDto.permiso_id,
    );
  }

  @Delete('remover/:rol/:permisoId')
  removerPermisoRol(
    @Param('rol') rol: 'admin' | 'usuario',
    @Param('permisoId') permisoId: string,
  ) {
    return this.permisosService.removerPermisoRol(rol, permisoId);
  }
}
