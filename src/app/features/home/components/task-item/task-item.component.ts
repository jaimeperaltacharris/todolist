import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  IonList,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { Task } from '@core/entities/task';
import { DatePipe } from '@angular/common';
import { UpdateStatusTaskUseCase } from '@core/uses-cases/tasks/updateStatus/update-status-task.usecase';
import { DeleteTaskUseCase } from '@core/uses-cases/tasks/delete/delete-task.usecase';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [
    DatePipe,
    IonCheckbox,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonIcon
  ]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() editTask: EventEmitter<void> = new EventEmitter<void>();

  private updateStatusTaskUseCase = inject(UpdateStatusTaskUseCase);
  private deleteTaskUseCase = inject(DeleteTaskUseCase);

  constructor() {
    addIcons({
      'trash-outline': trashOutline
    })
  }

  async updateStatusTask(): Promise<void> {
    await this.updateStatusTaskUseCase.execute(this.task.id!, this.task.completed ? 0 : 1);
  }

  async deleteTask(): Promise<void> {
    await this.deleteTaskUseCase.execute(this.task.id!);
    this.taskDeleted.emit();
  }
}
