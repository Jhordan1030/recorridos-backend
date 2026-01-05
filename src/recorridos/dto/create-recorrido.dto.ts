// src/recorridos/dto/create-recorrido.dto.ts
import {
  IsDateString,
  IsString,
  IsUUID,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateRecorridoDto {
  @IsDateString()
  fecha: string;

  @IsString()
  hora_inicio: string;

  @IsString()
  @IsOptional()
  hora_fin?: string;

  @IsUUID()
  @IsOptional()
  vehiculo_id?: string;

  @IsEnum(['llevar', 'traer', 'ambos'])
  @IsOptional()
  tipo_recorrido?: 'llevar' | 'traer' | 'ambos';

  @IsNumber()
  @IsOptional()
  costo?: number;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  ninos?: string[];
}
