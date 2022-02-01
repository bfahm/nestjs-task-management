import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(filteration: GetTasksDto): Task[] {
  //   let response = this.tasks;

  //   if (filteration.status) {
  //     response = response.filter((task) => task.status === filteration.status);
  //   }

  //   if (filteration.query) {
  //     response = response.filter(
  //       (task) =>
  //         task.title.includes(filteration.query) ||
  //         task.description.includes(filteration.query),
  //     );
  //   }
  //   return response;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found.`);
    }
    return found;
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with id ${id} was not found.`);
  //   }

  //   const index = this.tasks.findIndex((task) => task.id === found.id);
  //   this.tasks.splice(index, 1);
  //   // Another way to delete:
  //   // this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatusById(id: string, newStatus: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = newStatus;
  //   return task;
  // }
}
