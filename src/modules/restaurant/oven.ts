import { Injectable, Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as humanizeDuration from 'humanize-duration';

import { Order } from '../entities/order.entity';
import { OrderStatus, QUEUE_NAME, SECOND } from '../../constants';
import { restaurantConfig } from '../../configs/restaurant.config';
import { RestaurantQueue } from './restaurant.queue';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
@Processor(QUEUE_NAME.OVENS)
export class Oven {
  private readonly _logger = new Logger(Oven.name);
  private readonly _processingTime = 10 * SECOND;

  constructor(
    private readonly restaurantQueueService: RestaurantQueue,
    private readonly repositoryService: RepositoryService,
  ) {}

  @Process({ concurrency: restaurantConfig.ovens })
  public async processOrder(job: Job<Order>): Promise<void> {
    const start = Date.now();
    const order = await this.repositoryService.findOrder({
      where: { id: job.data.id },
    });

    await new Promise((resolve) => setTimeout(resolve, this._processingTime));

    order.status = OrderStatus.COOKING;
    order.backedAt = new Date();

    const processingTime = humanizeDuration(Date.now() - start);
    this._logger.log(`Oven is ready: ${processingTime}`);

    await this.repositoryService.saveOrder(order);
    await this.restaurantQueueService.addWaiterQueue(order);
  }
}
