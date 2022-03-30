import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';

import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let fakeTasksService: Partial<TasksService>;

  const user = { id: 1 } as User;
  const taskName = `this is task's name`;

  beforeEach(async () => {
    fakeTasksService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          name: taskName,
          periodicity: 'monthly',
          count: 1,
        } as Task);
      },
      findAll: () => {
        return Promise.resolve([
          {
            id: 1,
            name: taskName,
            periodicity: 'monthly',
            count: 1,
          } as Task,
        ]);
      },

      create: () => {
        const task = {
          id: 1,
          name: taskName,
          periodicity: 'monthly',
          count: 1,
        } as Task;
        return Promise.resolve(task);
      },
      // findOne ()
      // remove: () => {},
      // update: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: fakeTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllTasks returns a list of tasks with the given email', async () => {
    const tasks = await controller.findAllTasks(user);
    expect(tasks.length).toEqual(1);
    expect(tasks[0].name).toEqual(taskName);
  });

  it('findOne returns a single user with the given id', async () => {
    const task = await controller.findOne('1', user);
    expect(task).toBeDefined();
  });

  it('findOne throws an error if task with given id is not found', async () => {
    fakeTasksService.findOne = () => null;
    try {
      await controller.findOne('1', user);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('deleteTask throws an error if task with given id is not found', async () => {
    fakeTasksService.remove = () => null;
    try {
      await controller.deleteTask('1', user);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
