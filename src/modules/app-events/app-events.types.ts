import { Order } from '../entities/order.entity';

export const enum EventName {
  ORDER_CREATED = 'order.created',
  ORDER_COMPLETED = 'order.completed',
}

export interface EventPayload {
  [EventName.ORDER_CREATED]: {
    orderId: string;
    orders: Order[];
  };

  [EventName.ORDER_COMPLETED]: {
    orderId: string;
    completedAt: Date;
  };
}
