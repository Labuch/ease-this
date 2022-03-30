import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  create(taskDto: CreateTaskDto, user: User) {
    const task = this.repo.create(taskDto);

    task.user = user;
    console.log(user);

    if (!user) {
      return null;
    }

    return this.repo.save(task);
  }

  async findAll(user: User) {
    return this.repo.find({ user });
  }

  findOne(id: number, user: User) {
    if (!id) {
      return null;
    }
    if (!user) {
      return null;
    }
    return this.repo.findOne({ id, user });
  }

  async update(id: number, user: User, attrs: Partial<Task>) {
    const task = await this.findOne(id, user);

    if (!task) throw new NotFoundException('Task not found');

    Object.assign(task, attrs);

    return this.repo.save(task);
  }

  async remove(id: number, user: User) {
    const task = await this.findOne(id, user);

    if (!task) throw new NotFoundException('Task not found');

    return this.repo.remove(task);
  }
}
