import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../constants';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'jsonb', default: [] })
  toppings: string[];

  @Column()
  status: OrderStatus;

  @Column({ type: 'timestamptz', nullable: true })
  doughReadyAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  toppingsReadyAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  backedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  servedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
