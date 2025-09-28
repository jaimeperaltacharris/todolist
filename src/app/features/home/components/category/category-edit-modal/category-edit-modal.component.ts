import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '@core/entities/category';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent } from "@ionic/angular/standalone";
import { FormCategoryComponent } from '../form-category/form-category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEditCategory } from '@features/home/interfaces/edit-category.interface';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.scss'],
  imports: [IonContent,
    FormCategoryComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle
  ]
})
export class CategoryEditModalComponent implements OnInit {
  @Input() category!: Category;
  @Output() editCategory: EventEmitter<IEditCategory> = new EventEmitter<IEditCategory>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.category.name, [Validators.required, Validators.minLength(3)]],
      description: [this.category.description],
    });
  }

  closeModal(category?: Omit<Category, 'id'>): void {
    
    this.editCategory.emit({
      isEdited: !!category,
      categoryInfo: category
    })
  }
}
