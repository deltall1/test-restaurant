import { Logger } from '@nestjs/common';
import { SECOND } from '../../constants';
import { Order } from './interfaces';

export class Waiter {
  private readonly _logger = new Logger(Waiter.name);
  private readonly _waitersCount = 2;
  private readonly _processingTime = 10 * SECOND;

  public async processOrder(order: Order): Promise<void> {
    this._logger.log('Pizza served');
  }
}
