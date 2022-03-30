import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum Periodicity {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  deadline: Date;

  @Column({
    type: 'enum',
    enum: Periodicity,
    nullable: true,
  })
  periodicity: Periodicity;

  @Column()
  count: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
