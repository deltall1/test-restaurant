import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrderParamsDto, OrdersDto } from './orders.dto';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { OrderReport } from '../entities/order-report.entity';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create order',
  })
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [Order] })
  async createOrder(@Body() body: OrdersDto) {
    return this.orderService.createOrder(body);
  }

  @Get('/:orderId')
  @ApiOperation({
    summary: 'Get order',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @HttpCode(200)
  async getOrder(@Param() params: OrderParamsDto) {
    return this.orderService.getOrder(params.orderId);
  }

  @Get('/:orderId/report')
  @ApiOperation({
    summary: 'Get order report',
  })
  @ApiResponse({ status: 200, type: OrderReport })
  @HttpCode(200)
  async getOrderReport(@Param() params: OrderParamsDto) {
    return this.orderService.getOrderReport(params.orderId);
  }
}
