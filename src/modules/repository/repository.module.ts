import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderReport } from '../entities/order-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderReport])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
