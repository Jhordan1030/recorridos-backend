// src/ninos/ninos.controller.ts
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
import { NinosService } from './ninos.service';
import { CreateNinoDto } from './dto/create-nino.dto';
import { UpdateNinoDto } from './dto/update-nino.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('ninos')
@UseGuards(JwtAuthGuard)
export class NinosController {
  constructor(private readonly ninosService: NinosService) {}

  @Post()
  create(@Body() createNinoDto: CreateNinoDto, @Request() req) {
    return this.ninosService.create(createNinoDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.ninosService.findAll(req.user.userId, req.user.rol);
  }

  @Get('activos')
  findActive(@Request() req) {
    return this.ninosService.findActive(req.user.userId, req.user.rol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ninosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNinoDto: UpdateNinoDto) {
    return this.ninosService.update(id, updateNinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ninosService.remove(id);
  }
}
