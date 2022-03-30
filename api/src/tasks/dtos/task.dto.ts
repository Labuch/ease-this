import { Expose, Transform } from 'class-transformer';
import { Periodicity } from '../task.entity';

export class TaskDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.description || undefined;
  })
  description: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.deadline || undefined;
  })
  deadline: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.periodicity || undefined;
  })
  periodicity: Periodicity;

  @Expose()
  count: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.user?.id;
  })
  userId: number;
}
