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
@Processor(QUEUE_NAME.TOPPING_CHEFS)
export class ToppingChef {
  private readonly _logger = new Logger(ToppingChef.name);
  private readonly _toppingPerTime = 2;
  private readonly _processingTime = 4 * SECOND;

  constructor(
    private readonly restaurantQueueService: RestaurantQueue,
    private readonly repositoryService: RepositoryService,
  ) {}

  @Process({ concurrency: restaurantConfig.toppingChefs })
  public async processOrder(job: Job<Order>): Promise<void> {
    const start = Date.now();
    const order = await this.repositoryService.findOrder({
      where: { id: job.data.id },
    });

    let toppingsCount = job.data.toppings.length;
    while (toppingsCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, this._processingTime));
      toppingsCount -= this._toppingPerTime;
    }

    order.status = OrderStatus.COOKING;
    order.toppingsReadyAt = new Date();

    const processingTime = humanizeDuration(Date.now() - start);
    this._logger.log(`Topping chef is ready: ${processingTime}`);

    await this.repositoryService.saveOrder(order);
    await this.restaurantQueueService.addOvenQueue(order);
  }
}
