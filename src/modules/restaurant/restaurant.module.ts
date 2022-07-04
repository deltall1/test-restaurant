import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from '../../constants';
import { DoughChef } from './dough-chef';
import { ToppingChef } from './topping-chef';
import { Oven } from './oven';
import { Waiter } from './waiter';
import { OrderModule } from '../order/order.module';
import { RestaurantQueue } from './restaurant.queue';
import { RepositoryModule } from '../repository/repository.module';
import { AppEventsModule } from '../app-events/app-events.module';

@Module({
  imports: [
    RepositoryModule,
    AppEventsModule,
    OrderModule,
    BullModule.registerQueue({ name: QUEUE_NAME.ORDERS }),
    BullModule.registerQueue({ name: QUEUE_NAME.DOUGH_CHEFS }),
    BullModule.registerQueue({ name: QUEUE_NAME.TOPPING_CHEFS }),
    BullModule.registerQueue({ name: QUEUE_NAME.OVENS }),
    BullModule.registerQueue({ name: QUEUE_NAME.WAITERS }),
  ],
  providers: [RestaurantQueue, DoughChef, ToppingChef, Oven, Waiter],
})
export class RestaurantModule {}
