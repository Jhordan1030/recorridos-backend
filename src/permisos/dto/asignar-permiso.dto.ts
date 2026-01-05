// src/permisos/dto/asignar-permiso.dto.ts
import { IsEnum, IsUUID } from 'class-validator';

export class AsignarPermisoDto {
  @IsEnum(['admin', 'usuario'])
  rol: 'admin' | 'usuario';

  @IsUUID()
  permiso_id: string;
}
