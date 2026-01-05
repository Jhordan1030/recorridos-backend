// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(['admin', 'usuario'])
  @IsOptional()
  rol?: 'admin' | 'usuario';
}
