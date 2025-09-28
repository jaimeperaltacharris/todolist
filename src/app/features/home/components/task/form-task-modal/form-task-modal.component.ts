import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption, IonList } from "@ionic/angular/standalone";
import { Task } from '@core/entities/task';
import { Category } from '@core/entities/category';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';

@Component({
  selector: 'app-form-task-modal',
  templateUrl: './form-task-modal.component.html',
  styleUrls: ['./form-task-modal.component.scss'],
  imports: [IonList, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonTextarea,
    IonInput,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption
]
})
export class FormTaskModalComponent implements OnInit {
  @Input() taskForm!: FormGroup;
  @Output() save = new EventEmitter<Omit<Task, 'id'>>();

  categories: Category[] = [];
  private getAllCategoryUseCase = inject(GetAllCategoriesUseCase);

  ngOnInit(): void {
    this.getAllCategories();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.getAllCategoryUseCase.execute();
  }

  submit() {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
