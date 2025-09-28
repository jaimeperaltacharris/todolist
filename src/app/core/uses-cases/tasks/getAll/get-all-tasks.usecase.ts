import { Injectable } from '@angular/core';
import { TaskRepository } from 'src/app/core/repositories/task.repository';
import { Task } from 'src/app/core/entities/task';

@Injectable({
  providedIn: 'root'
})
export class GetAllTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getAll();
  }
}