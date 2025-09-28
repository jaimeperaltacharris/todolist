import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@core/entities/task';
import { IonTitle, IonHeader, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { FormTaskModalComponent } from '../form-task-modal/form-task-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEditTask } from '@features/home/interfaces/edit-task.interface';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  imports: [IonContent, IonButton, IonButtons, IonToolbar, IonHeader, IonTitle,
      FormTaskModalComponent
    ]
})
export class EditTaskModalComponent  implements OnInit {
  @Input() task!: Task;
  @Output() editTask: EventEmitter<IEditTask> = new EventEmitter<IEditTask>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description],
      category_id: [this.task.category_id, Validators.required],
    });
  }

  closeModal(task?: Omit<Task, 'id'>): void {
    this.editTask.emit({
      isEdited: !!task,
      taskInfo: task
    })
  }
}
