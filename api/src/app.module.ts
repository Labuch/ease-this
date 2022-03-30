import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { HistoriesModule } from './histories/histories.module';

import { ormConfig } from './database/config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    UsersModule,
    TasksModule,
    HistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
