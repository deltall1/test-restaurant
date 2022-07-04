import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { BullModule } from '@nestjs/bull';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { redisConfig } from './configs/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './configs/db.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    BullModule.forRoot({ redis: redisConfig }),
    EventEmitterModule.forRoot(),
    OrderModule,
    RestaurantModule,
  ],
})
export class AppModule {}
