// src/ninos/dto/create-nino.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNinoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidos: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefono_contacto?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
