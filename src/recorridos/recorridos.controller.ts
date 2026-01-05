// src/recorridos/recorridos.controller.ts
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
  Query,
} from '@nestjs/common';
import { RecorridosService } from './recorridos.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { UpdateRecorridoDto } from './dto/update-recorrido.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('recorridos')
@UseGuards(JwtAuthGuard)
export class RecorridosController {
  constructor(private readonly recorridosService: RecorridosService) {}

  @Post()
  create(@Body() createRecorridoDto: CreateRecorridoDto, @Request() req) {
    return this.recorridosService.create(createRecorridoDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.recorridosService.findAll(req.user.userId, req.user.rol);
  }

  @Get('estadisticas')
  getEstadisticas(@Request() req) {
    return this.recorridosService.getEstadisticas(
      req.user.userId,
      req.user.rol,
    );
  }

  @Get('por-fecha')
  findByDateRange(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Request() req,
  ) {
    return this.recorridosService.findByDateRange(
      fechaInicio,
      fechaFin,
      req.user.userId,
      req.user.rol,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recorridosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecorridoDto: UpdateRecorridoDto,
  ) {
    return this.recorridosService.update(id, updateRecorridoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recorridosService.remove(id);
  }
}
