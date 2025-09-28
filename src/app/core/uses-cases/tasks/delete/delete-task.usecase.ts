import { Injectable } from '@angular/core';
import { CategoryRepository } from '@core/repositories/category.repository';
import { TaskRepository } from '@core/repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}

  execute(taskId: number): Promise<void> {
    return this.taskRepo.delete(taskId);
  }
}
