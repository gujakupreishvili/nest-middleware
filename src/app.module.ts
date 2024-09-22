import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {  Checkdevice, CheckTime, FindUser } from './users/logger.middleware';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(CheckTime).forRoutes({path:"*",  method: RequestMethod.ALL})
    // consumer.apply(Checkdevice).forRoutes({path:"*",  method: RequestMethod.ALL})
    consumer.apply(FindUser).forRoutes({path:"*",  method: RequestMethod.ALL})

  }
}
