import { Injectable } from '@angular/core';
import { TaskRepository } from 'src/app/core/repositories/task.repository';
import { Task } from 'src/app/core/entities/task';

@Injectable({
  providedIn: 'root'
})
export class GetByCategoryTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(categoryId: number): Promise<Task[]> {
    return await this.taskRepository.getByCategory(categoryId);
  }
}