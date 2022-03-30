import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskDto } from './dtos/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@Serialize(TaskDto)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTask(@Body() body: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(body, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAllTasks(@CurrentUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(parseInt(id), user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  updateTask(
    @Param('id') id: string,
    @Body() body: CreateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(parseInt(id), user, body);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.remove(parseInt(id), user);
  }
}
