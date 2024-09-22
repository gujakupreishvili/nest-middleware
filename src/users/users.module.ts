import { MiddlewareConsumer, Module,  NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {   CheckUser  } from './logger.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(CheckUser).forRoutes({path:"*",  method: RequestMethod.GET})
    // consumer.apply(CheckUser).forRoutes({path:"*",  method: RequestMethod.POST})
  }

}
