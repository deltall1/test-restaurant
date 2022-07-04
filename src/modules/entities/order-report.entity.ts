import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

interface OrderReportData {
  id: string;
  preparationTime: string;
}

@Entity()
export class OrderReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column({ type: 'jsonb', default: [] })
  data: OrderReportData[];

  @Column()
  totalOrders: number;

  @Column()
  totalTime: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
