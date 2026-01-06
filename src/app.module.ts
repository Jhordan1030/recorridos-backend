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
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : undefined,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // Parsear la URL para debugging
        console.log('Database URL:', databaseUrl?.substring(0, 50) + '...');

        return {
          type: 'postgres',
          url: databaseUrl,
          // Configuración SSL para Supabase en producción
          ssl:
            process.env.NODE_ENV === 'production'
              ? {
                  rejectUnauthorized: false,
                  requestCert: true,
                }
              : false,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false, // NUNCA true en producción
          logging: process.env.NODE_ENV === 'development',
          extra: {
            max: 10,
            connectionTimeoutMillis: 10000,
            idleTimeoutMillis: 30000,
          },
        };
      },
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
