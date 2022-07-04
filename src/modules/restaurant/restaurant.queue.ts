import { Injectable } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';

import { QUEUE_NAME } from '../../constants';
import { Order } from '../entities/order.entity';

@Injectable()
@Processor(QUEUE_NAME.ORDERS)
export class RestaurantQueue {
  constructor(
    @InjectQueue(QUEUE_NAME.DOUGH_CHEFS)
    private readonly doughChefsQueue: Queue,
    @InjectQueue(QUEUE_NAME.TOPPING_CHEFS)
    private readonly toppingChefsQueue: Queue,
    @InjectQueue(QUEUE_NAME.OVENS)
    private readonly ovenQueue: Queue,
    @InjectQueue(QUEUE_NAME.WAITERS)
    private readonly waiterQueue: Queue,
  ) {}

  async addDoughChefsQueue(order: Order): Promise<void> {
    await this.doughChefsQueue.add(order);
  }

  async addToppingChefsQueue(order: Order): Promise<void> {
    await this.toppingChefsQueue.add(order);
  }

  async addOvenQueue(order: Order): Promise<void> {
    await this.ovenQueue.add(order);
  }

  async addWaiterQueue(order: Order): Promise<void> {
    await this.waiterQueue.add(order);
  }

  @Process()
  private async processOrder(job: Job<Order>) {
    await this.addDoughChefsQueue(job.data);
  }
}
