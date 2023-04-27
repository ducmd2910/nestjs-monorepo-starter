import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AbstractSecretsService } from '../../global/secrets/abstract';
import { SecretsModule } from '../../global/secrets/module';
import { ConnectionName } from '../enums/connection-name';

@Module({
  imports: [
    SecretsModule,
    TypeOrmModule.forRootAsync({
      name: ConnectionName.DEFAULT,
      useFactory: async ({ DATABASE }: AbstractSecretsService) => {
        return {
          type: 'postgres',
          replication: {
            master: {
              host: DATABASE.DEFAULT_DB.HOST,
              port: DATABASE.DEFAULT_DB.PORT,
              username: DATABASE.DEFAULT_DB.USER_NAME,
              password: DATABASE.DEFAULT_DB.PASSWORD,
              database: DATABASE.DEFAULT_DB.DATABASE,
            },
            slaves: DATABASE.DEFAULT_DB_SLAVES,
          },
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
        };
      },
      inject: [AbstractSecretsService],
    }),
  ],
})
export class DefaultDatabaseModule { }
