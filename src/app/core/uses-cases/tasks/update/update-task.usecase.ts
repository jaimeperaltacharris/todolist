import { Injectable } from '@angular/core';
import { TaskRepository } from '@core/repositories/task.repository';
import { Task } from '@core/entities/task';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}

  execute(task: Task): Promise<void> {
    return this.taskRepo.updateTask(task);
  }
}
