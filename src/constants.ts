import { Order } from './modules/entities/order.entity';

export const SECOND = 1000;

export const QUEUE_NAME = {
  ORDERS: 'orders',
  DOUGH_CHEFS: 'dough_chefs',
  TOPPING_CHEFS: 'topping_chefs',
  OVENS: 'ovens',
  WAITERS: 'waiters',
};

export const enum OrderStatus {
  PENDING = 'PENDING',
  COOKING = 'COOKING',
  SERVED = 'SERVED',
}


