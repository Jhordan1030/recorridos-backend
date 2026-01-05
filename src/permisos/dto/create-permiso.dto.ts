// src/permisos/dto/create-permiso.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
