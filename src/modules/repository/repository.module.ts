import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryService } from './repository.service';
import { Order } from '../entities/order.entity';
import { OrderReport } from '../entities/order-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderReport])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
