import { SECOND } from '../../constants';
import { Order } from './interfaces';
import { Logger } from '@nestjs/common';

export class ToppingChef {
  private readonly _logger = new Logger(ToppingChef.name);
  private readonly _chefsCount = 3;
  private readonly _toppingPerTime = 2;
  private readonly _processingTime = 4 * SECOND;

  private _availableChefs = 3;

  public get availableChefs(): number {
    return this._availableChefs;
  }

  public async processOrder(order: Order): Promise<void> {
    this._logger.log('Toppings are ready');
  }
}
