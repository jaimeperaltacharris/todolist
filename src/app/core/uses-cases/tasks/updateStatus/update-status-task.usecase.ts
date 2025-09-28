import { Injectable } from '@angular/core';
import { TaskRepository } from '@core/repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdateStatusTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}

  execute(taskId: number, status: number): Promise<void> {
    return this.taskRepo.updateStatus(taskId, status);
  }
}
