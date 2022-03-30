import {
  Entity,
  BaseEntity,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from '../tasks/task.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @AfterInsert()
  logInser() {
    console.log('Iserted User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id:', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('Deleted User with id:', this.id);
  }
}
