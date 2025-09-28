import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@core/entities/category';
import { CreateCategoryUseCase } from '@core/uses-cases/categories/create/create-category.usecase';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
  imports: [IonContent,
    FormCategoryComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle
  ]
})
export class ModalCategoryComponent {
  @Output() needReloadTasks: EventEmitter<boolean> = new EventEmitter<boolean>();

  form!: FormGroup;
  
  private createCategoryUseCase = inject(CreateCategoryUseCase);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  async onSaveCategory(category: Omit<Category, 'id'>): Promise<void> {
    const categoryResponse = await this.createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    this.needReloadTasks.emit(true);
  }
}
