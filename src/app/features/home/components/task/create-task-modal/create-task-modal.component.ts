import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormTaskModalComponent } from '../form-task-modal/form-task-modal.component';
import { IonTitle, IonHeader, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTaskUseCase } from '@core/uses-cases/tasks/create/create-task.usecase';
import { Task } from '@core/entities/task';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  imports: [IonContent, IonButton, IonButtons, IonToolbar, IonHeader, IonTitle,
    FormTaskModalComponent
  ]
})
export class CreateTaskModalComponent {
  @Output() needReloadTasks: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm!: FormGroup;
  private createTaskUseCase = inject(CreateTaskUseCase);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category_id: ['', Validators.required],
    });
  }

  async onSaveTask(task: Omit<Task, 'id'>): Promise<void> {
    const taskResponse = await this.createTaskUseCase.execute({
      name: task.name,
      description: task.description,
      category_id: task.category_id
    });

    this.needReloadTasks.emit(true);
  }
}
