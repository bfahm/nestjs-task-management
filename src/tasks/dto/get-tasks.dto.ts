import { TaskStatus } from '../task.model';

export class GetTasksDto {
  query: string;
  status: TaskStatus;
}
