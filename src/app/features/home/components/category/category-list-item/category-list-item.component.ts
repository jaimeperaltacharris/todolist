import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import {
  IonList,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";
import { DatePipe } from '@angular/common';
import { Category } from '@core/entities/category';
import { DeleteCategoryUseCase } from '@core/uses-cases/categories/delete/delete-category.usecase';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
  imports: [
    DatePipe,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonIcon
  ]
})
export class CategoryListItemComponent {

  @Input() category!: Category;
  @Output() categoryDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() editCategory: EventEmitter<void> = new EventEmitter<void>();

  private deleteCategoryUseCase = inject(DeleteCategoryUseCase);

  constructor() {
    addIcons({
      'trash-outline': trashOutline
    })
  }

  async deleteCategory(): Promise<void> {
    await this.deleteCategoryUseCase.execute(this.category.id!);
    this.categoryDeleted.emit();
  }
}
