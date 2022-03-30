import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsDate,
  IsArray,
  IsEnum,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { Periodicity } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((task) => task.periodicity === undefined)
  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @ValidateIf((task) => task.deadline === undefined)
  @IsEnum(Periodicity)
  periodicity: Periodicity;

  @IsNumber()
  @Min(1)
  count: number;

  @IsOptional()
  @IsArray()
  tags: string[];
}
