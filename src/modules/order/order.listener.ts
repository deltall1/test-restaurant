import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

import { QUEUE_NAME } from '../../constants';
import * as humanizeDuration from 'humanize-duration';
import { EventName, EventPayload } from '../app-events/app-events.types';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class OrderListener {
  private readonly _logger = new Logger(OrderListener.name);

  constructor(
    @InjectQueue(QUEUE_NAME.ORDERS) private readonly ordersQueue: Queue,
    private readonly repositoryService: RepositoryService,
  ) {}

  @OnEvent(EventName.ORDER_CREATED)
  private async orderCreatedListener(
    event: EventPayload[EventName.ORDER_CREATED],
  ): Promise<void> {
    for (const order of event.orders) {
      await this.ordersQueue.add(order);
    }
  }

  @OnEvent(EventName.ORDER_COMPLETED)
  private async orderCompletedListener(
    event: EventPayload[EventName.ORDER_COMPLETED],
  ): Promise<void> {
    const orders = await this.repositoryService.findOrders({
      where: { orderId: event.orderId },
      order: { createdAt: 'ASC' },
    });
    const totalTime = humanizeDuration(event.completedAt.getTime() - orders[0].createdAt.getTime());
    const orderReport = this.repositoryService.createOrderReport({
      totalOrders: orders.length,
      orderId: event.orderId,
      data: [],
      totalTime,
    });

    orders.forEach((el) => {
      const orderTime = el.servedAt.getTime() - el.cookingStartedAt.getTime();
      this._logger.log(`Order ${el.id} preparation time: ${humanizeDuration(orderTime)}`);
      orderReport.data.push({
        id: el.id,
        preparationTime: humanizeDuration(orderTime),
      });
    });

    this._logger.log(`Total orders ${event.orderId} preparation time: ${totalTime}`);

    await this.repositoryService.saveOrderReport(orderReport);
  }
}
