import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  createTask(title: string, description: string, user: User): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return this.save(task);
  }

  getTasks(filter: GetTasksDto, user: User): Promise<Task[]> {
    const { query, status } = filter;

    const result = this.createQueryBuilder('task');
    result.where({ user });

    if (status) {
      result.andWhere('task.status = :status', { status });
    }

    if (query) {
      result.andWhere(
        '(LOWER(task.title) LIKE LOWER(:query) OR LOWER(task.description) LIKE LOWER(:query))',
        { query: `%${query}%` },
      );
    }

    return result.getMany();
  }
}
