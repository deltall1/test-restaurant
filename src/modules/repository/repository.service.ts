import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderReport } from '../entities/order-report.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderReport)
    private readonly orderReportRepository: Repository<OrderReport>,
  ) {}

  createOrder(order?: DeepPartial<Order>): Order {
    return this.orderRepository.create(order);
  }

  async findOrder(options: FindOneOptions<Order>): Promise<Order | null> {
    return this.orderRepository.findOne(options);
  }

  async findOrders(options: FindManyOptions<Order>): Promise<Order[]> {
    return this.orderRepository.find(options);
  }

  async saveOrder(order: DeepPartial<Order>): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async saveOrders(order: DeepPartial<Order>[]): Promise<Order[]> {
    return this.orderRepository.save(order);
  }

  createOrderReport(orderReport?: DeepPartial<OrderReport>): OrderReport {
    return this.orderReportRepository.create(orderReport);
  }

  async findOrderReport(
    options: FindOneOptions<OrderReport>,
  ): Promise<OrderReport> {
    return this.orderReportRepository.findOne(options);
  }

  async saveOrderReport(
    report: DeepPartial<OrderReport>,
  ): Promise<OrderReport> {
    return this.orderReportRepository.save(report);
  }
}
