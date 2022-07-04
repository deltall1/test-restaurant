import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus, QUEUE_NAME, SECOND } from '../../constants';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as humanizeDuration from 'humanize-duration';
import { restaurantConfig } from '../../configs/restaurant.config';
import { Order } from '../entities/order.entity';
import { RepositoryService } from '../repository/repository.service';
import { EventName } from '../app-events/app-events.types';
import { AppEventsEmitter } from '../app-events/app-events.emitter';

@Injectable()
@Processor(QUEUE_NAME.WAITERS)
export class Waiter {
  private readonly _logger = new Logger(Waiter.name);
  private readonly _processingTime = 1 * SECOND;

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly appEventsEmitter: AppEventsEmitter,
  ) {}

  @Process({ concurrency: restaurantConfig.waiters })
  public async processOrder(job: Job<Order>): Promise<void> {
    const start = Date.now();
    const order = await this.repositoryService.findOrder({
      where: { id: job.data.id },
    });

    await new Promise((resolve) => setTimeout(resolve, this._processingTime));

    order.status = OrderStatus.SERVED;
    order.servedAt = new Date();

    const processingTime = humanizeDuration(Date.now() - start);
    this._logger.log(`Waiter is ready: ${processingTime}`);

    await this.repositoryService.saveOrder(order);

    const orders = await this.repositoryService.findOrders({
      where: { orderId: job.data.orderId, status: OrderStatus.COOKING },
    });
    if (orders.length === 0) {
      this.appEventsEmitter.emit(EventName.ORDER_COMPLETED, {
        orderId: order.orderId,
        completedAt: order.servedAt,
      });
    }
  }
}
