import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BullModule } from '@nestjs/bull';
import { OrderListener } from './order.listener';
import { QUEUE_NAME } from '../../constants';
import { RepositoryModule } from '../repository/repository.module';
import { AppEventsModule } from '../app-events/app-events.module';

@Module({
  imports: [
    RepositoryModule,
    AppEventsModule,
    BullModule.registerQueue({ name: QUEUE_NAME.ORDERS }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderListener],
})
export class OrderModule {}
