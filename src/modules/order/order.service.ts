import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderDto } from './orderDto';
import { InjectQueue } from '@nestjs/bull';
import { EventName } from '../app-events/app-events.types';
import { Queue } from 'bull';
import { v4 } from 'uuid';
import { RepositoryService } from '../repository/repository.service';
import { AppEventsEmitter } from '../app-events/app-events.emitter';
import { OrderStatus, QUEUE_NAME } from '../../constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectQueue(QUEUE_NAME.ORDERS) private readonly ordersQueue: Queue,
    private readonly repositoryService: RepositoryService,
    private readonly appEventsEmitter: AppEventsEmitter,
  ) {}

  async createOrder(orders: OrderDto[]): Promise<Order[]> {
    const orderId = v4();

    const dbOrders = orders.map((el) =>
      this.repositoryService.createOrder({
        orderId,
        toppings: el.toppings,
        status: OrderStatus.PENDING,
      }),
    );
    await this.repositoryService.saveOrders(dbOrders);
    this.appEventsEmitter.emit(EventName.ORDER_CREATED, {
      orderId,
      orders: dbOrders,
    });

    return dbOrders;
  }
}
