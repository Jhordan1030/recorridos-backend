import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NinosModule } from './ninos/ninos.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { RecorridosModule } from './recorridos/recorridos.module';
import { PermisosModule } from './permisos/permisos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // IMPORTANTE: false para no modificar tu BD existente
        logging: true,
        ssl: {
          rejectUnauthorized: false, // Necesario para Supabase
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    NinosModule,
    VehiculosModule,
    RecorridosModule,
    PermisosModule,
  ],
})
export class AppModule {}
