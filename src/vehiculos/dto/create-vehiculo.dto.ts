// src/vehiculos/dto/create-vehiculo.dto.ts
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsString()
  @IsOptional()
  placa?: string;

  @IsNumber()
  @IsOptional()
  capacidad?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsNumber()
  @IsOptional()
  costo_por_recorrido?: number;
}
