import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksDto {
  @IsOptional()
  @IsString()
  query?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
