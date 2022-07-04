import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 } from 'uuid';

interface OrderReportData {
  id: string;
  preparationTime: string;
}

@Entity()
export class OrderReport {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelProperty({ example: v4() })
  id: string;

  @Column()
  @ApiModelProperty({ example: v4() })
  orderId: string;

  @Column({ type: 'jsonb', default: [] })
  data: OrderReportData[];

  @Column()
  @ApiModelProperty()
  totalOrders: number;

  @Column()
  @ApiModelProperty()
  totalTime: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiModelProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiModelProperty()
  updatedAt: Date;
}
