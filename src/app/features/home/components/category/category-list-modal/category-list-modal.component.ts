import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonContent, IonToolbar, IonHeader, IonButtons, IonTitle, IonButton, IonIcon, IonModal } from "@ionic/angular/standalone";
import { CategoryListItemComponent } from '../category-list-item/category-list-item.component';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';
import { Category } from '@core/entities/category';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { IEditCategory } from '@features/home/interfaces/edit-category.interface';
import { UpdateCategoryUseCase } from '@core/uses-cases/categories/update/update-category.usecase';
import { DeleteCategoryUseCase } from '@core/uses-cases/categories/delete/delete-category.usecase';
import { NoDataComponent } from 'src/app/shared/components/no-data/no-data.component';
import { FirebaseService } from '@shared/services/firebase/firebase';

@Component({
  selector: 'app-category-list-modal',
  templateUrl: './category-list-modal.component.html',
  styleUrls: ['./category-list-modal.component.scss'],
  imports: [IonModal, IonIcon, IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    CategoryListItemComponent,
    ModalCategoryComponent,
    CategoryEditModalComponent,
    NoDataComponent
  ]

})
export class CategoryListModalComponent implements OnInit {
  @Output() needReloadTasks: EventEmitter<boolean> = new EventEmitter<boolean>();

  categories: Category[] = [];
  categoryToEdit!: Category;
  isCreateCategoryOpen = false;
  isEditOpen = false;
  isCreateCategoryActive = false;

  private getAllCategoryUseCase = inject(GetAllCategoriesUseCase);
  private updateCategoryUseCase = inject(UpdateCategoryUseCase);
  private deleteCategoryUseCase = inject(DeleteCategoryUseCase);
  private firebaseService = inject(FirebaseService);

  constructor() {
    addIcons({
      'add-circle-outline': addCircleOutline,
    })
  }

  ngOnInit(): void {
    this.getConfiguration();
    this.getAllCategories();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.getAllCategoryUseCase.execute();
  }

  openEditModal(category: Category): void {
    this.isEditOpen = true;
    this.categoryToEdit = category;
  }

  async removeTaskFromArray(categorySelected: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(category => category.id === categorySelected.id);
    this.categories.splice(categoryIndex,1);
    await this.deleteCategoryUseCase.execute(categorySelected.id!);

  }

  validateCategoryAction($event: boolean): void {
    if($event) {
      this.getAllCategories();
      this.needReloadTasks.emit(true);
    }

    this.isCreateCategoryOpen = false
  }

  editCategoryInfo($event: IEditCategory): void {

    if($event.isEdited) {
      const categoryIndex = this.categories.findIndex(cat => cat.id === this.categoryToEdit.id);

      this.categories[categoryIndex].name = $event.categoryInfo?.name!;
      this.categories[categoryIndex].description = $event.categoryInfo?.description!;

      this.updateCategoryUseCase.execute(this.categories[categoryIndex]);
    }
    this.isEditOpen = false;
  }

  async getConfiguration(): Promise<void> {
    this.isCreateCategoryActive = await this.firebaseService.getConfigValueAsBoolean("feature_create_category");
    console.warn(this.isCreateCategoryActive," careogira")
  }
}
