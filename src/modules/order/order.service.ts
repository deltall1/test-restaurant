import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 } from 'uuid';

import { Order } from '../entities/order.entity';
import { OrdersDto } from './orders.dto';
import { EventName } from '../app-events/app-events.types';
import { RepositoryService } from '../repository/repository.service';
import { AppEventsEmitter } from '../app-events/app-events.emitter';
import { OrderStatus, QUEUE_NAME } from '../../constants';
import { OrderReport } from '../entities/order-report.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectQueue(QUEUE_NAME.ORDERS) private readonly ordersQueue: Queue,
    private readonly repositoryService: RepositoryService,
    private readonly appEventsEmitter: AppEventsEmitter,
  ) {}

  async createOrder(orders: OrdersDto): Promise<Order[]> {
    const orderId = v4();

    const dbOrders = orders.orders.map((el) =>
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

  async getOrder(orderId: string): Promise<Order[]> {
    return this.repositoryService.findOrders({ where: { orderId } });
  }

  getOrderReport(orderId: string): Promise<OrderReport> {
    return this.repositoryService.findOrderReport({ where: { orderId } });
  }
}
