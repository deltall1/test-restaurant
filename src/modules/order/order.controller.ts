import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './orderDto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: OrderDto[]) {
    await this.orderService.createOrder(body);
  }
}
