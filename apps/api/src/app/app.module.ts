import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { ApiCategoryModule } from '@wfh/api/category';
import { ApiBrandModule } from '@wfh/api/brand';
import { ApiProductModule } from '@wfh/api/product';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiAuthModule } from '@wfh/api/auth';
import { ApiUserModule } from '@wfh/api/user';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
        AUTH0_ISSUER_URL: Joi.string()
          .uri({
            scheme: ['https'],
          })
          .required(),
        AUTH0_DB: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryAttempts: 3,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
    ApiUserModule,
    ApiAuthModule,
    ApiProductModule,
    ApiCategoryModule,
    ApiBrandModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
