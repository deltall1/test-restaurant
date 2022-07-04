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
@Processor(QUEUE_NAME.DOUGH_CHEFS)
export class DoughChef {
  private readonly _logger = new Logger(DoughChef.name);
  private readonly _processingTime = 7 * SECOND;

  constructor(
    private readonly restaurantQueueService: RestaurantQueue,
    private readonly repositoryService: RepositoryService,
  ) {}

  @Process({ concurrency: restaurantConfig.doughChefs })
  public async processOrder(job: Job<Order>): Promise<void> {
    const start = Date.now();
    const order = await this.repositoryService.findOrder({
      where: { id: job.data.id },
    });
    order.cookingStartedAt = new Date();

    await new Promise((resolve) => setTimeout(resolve, this._processingTime));

    order.status = OrderStatus.COOKING;
    order.doughReadyAt = new Date();

    const processingTime = humanizeDuration(Date.now() - start);
    this._logger.log(`Dough chef is ready: ${processingTime}`);

    await this.repositoryService.saveOrder(order);
    await this.restaurantQueueService.addToppingChefsQueue(order);
  }
}
