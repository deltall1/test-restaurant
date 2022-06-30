import { SECOND } from '../../constants';
import { Order } from './interfaces';
import { Logger } from '@nestjs/common';

export class DoughChef {
  private readonly _logger = new Logger(DoughChef.name);
  private readonly _chefsCount = 2;
  private readonly _processingTime = 7 * SECOND;

  private _availableChefs = 2;

  public get availableChefs(): number {
    return this._availableChefs;
  }

  public async processOrder(order: Order): Promise<void> {
    this._logger.log('Dough is ready');
  }
}
