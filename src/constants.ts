export const SECOND = 1000;

export const QUEUE_NAME = {
  ORDERS: 'orders',
  DOUGH_CHEFS: 'dough_chefs',
  TOPPING_CHEFS: 'topping_chefs',
  OVENS: 'ovens',
  WAITERS: 'waiters',
};

export enum OrderStatus {
  PENDING = 'PENDING',
  COOKING = 'COOKING',
  SERVED = 'SERVED',
}

export enum PizzaToppings {
  Pepperoni = 'Pepperoni',
  ExtraCheese = 'Extra Cheese',
  Mushrooms = 'Mushrooms',
  Onions = 'Onions',
  Sausage = 'Sausage',
  BlackOlives = 'Black Olives',
  GreenPeppers = 'Green Peppers',
  Pineapple = 'Pineapple',
  Spinach = 'Spinach',
  Mozzarella = 'Mozzarella',
}
