import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { ApiCategoryModule } from '@wfh/api/category';
import { ApiBrandModule } from '@wfh/api/brand';
import { ApiProductModule } from '@wfh/api/product';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
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
    UsersModule,
    OrdersModule,
    ApiProductModule,
    ApiCategoryModule,
    ApiBrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
