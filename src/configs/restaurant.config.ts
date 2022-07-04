interface RestaurantConfig {
  doughChefs: number;
  toppingChefs: number;
  ovens: number;
  waiters: number;
}

export const restaurantConfig: RestaurantConfig = {
  doughChefs: +process.env.RESTAURANT_DOUGH_CHEFS,
  toppingChefs: +process.env.RESTAURANT_TOPPING_CHEFS,
  ovens: +process.env.RESTAURANT_OVENS,
  waiters: +process.env.RESTAURANT_WAITERS,
};
