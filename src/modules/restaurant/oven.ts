import { SECOND } from '../../constants';
import { Order } from './interfaces';
import { Logger } from '@nestjs/common';

export class Oven {
  private readonly _logger = new Logger(Oven.name);
  private readonly _processingTime = 10 * SECOND;

  private _availableWaiters = 2;

  public get availableChefs(): number {
    return this._availableWaiters;
  }

  public async processOrder(order: Order): Promise<void> {
    this._logger.log('Pizza baked');
  }
}
