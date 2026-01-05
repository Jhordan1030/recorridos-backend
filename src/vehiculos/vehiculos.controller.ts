// src/vehiculos/vehiculos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('vehiculos')
@UseGuards(JwtAuthGuard)
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  create(@Body() createVehiculoDto: CreateVehiculoDto, @Request() req) {
    return this.vehiculosService.create(createVehiculoDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.vehiculosService.findAll(req.user.userId, req.user.rol);
  }

  @Get('activos')
  findActive(@Request() req) {
    return this.vehiculosService.findActive(req.user.userId, req.user.rol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return this.vehiculosService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculosService.remove(id);
  }
}
