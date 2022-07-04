import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 } from 'uuid';

import { OrderStatus, PizzaToppings } from '../../constants';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelProperty({ example: v4() })
  id: string;

  @PrimaryColumn()
  @ApiModelProperty({ example: v4() })
  orderId: string;

  @Column({ type: 'jsonb', default: [], enum: PizzaToppings })
  @ApiModelProperty({
    enum: [PizzaToppings],
    example: [Object.keys(PizzaToppings)],
  })
  toppings: PizzaToppings[];

  @Column({ enum: OrderStatus })
  @ApiModelProperty({ enum: [OrderStatus], example: OrderStatus.SERVED })
  status: OrderStatus;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiModelProperty()
  cookingStartedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiModelProperty()
  doughReadyAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiModelProperty()
  toppingsReadyAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  backedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiModelProperty()
  servedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiModelProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiModelProperty()
  updatedAt: Date;
}
