import { Module } from '@nestjs/common';
import { join } from 'path';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number | undefined>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        entities: [join(__dirname, `./entities/**`, '*.entity.{ts,js}')],
        synchronize: false,
        migrations: [join(__dirname, '../migrations/**', '*{.ts,.js}')],
        migrationsRun: true,
        logging: configService.get<boolean>('database.logging'),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const cacheConfig: CacheModuleOptions = {
          ttl: Number(configService.get<number | 1000>('cacheManagement.ttl')),
        };
        const useRedis =
          Number(configService.get<number>('cacheManagement.useRedis')) || 0;
        if (Number(useRedis) > 0) {
          cacheConfig.store = redisStore;
          cacheConfig.host = configService.get<string>('cacheManagement.host');
          cacheConfig.port = Number(
            configService.get<number | 6379>('cacheManagement.port'),
          );
          cacheConfig.db =
            Number(configService.get<number>('cacheManagement.db')) || 0;
        }
        return { ...cacheConfig };
      },
    }),
  ],
  exports: [ConfigModule],
})
export class SharedModule {}
