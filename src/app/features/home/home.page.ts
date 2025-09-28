import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPopover,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Task } from '@core/entities/task';
import { GetAllTasksUseCase } from '@core/uses-cases/tasks/getAll/get-all-tasks.usecase';
import { GetByCategoryTasksUseCase } from '@core/uses-cases/tasks/getByCategory/get-by-category-tasks.usecase';
import { UpdateTaskUseCase } from '@core/uses-cases/tasks/update/update-task.usecase';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { addIcons } from 'ionicons';
import {
  add,
  filterCircleOutline,
  documentTextOutline
} from 'ionicons/icons';
import { CategoryListModalComponent } from './components/category/category-list-modal/category-list-modal.component';
import { CreateTaskModalComponent } from './components/task/create-task-modal/create-task-modal.component';
import { EditTaskModalComponent } from './components/task/edit-task-modal/edit-task-modal.component';
import { IEditTask } from './interfaces/edit-task.interface';
import { Category } from '@core/entities/category';
import { FormsModule } from '@angular/forms';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonButton,
    IonPopover,
    IonIcon,
    IonFabButton,
    IonFab,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TaskItemComponent,
    CategoryListModalComponent,
    CreateTaskModalComponent,
    EditTaskModalComponent
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  taskToEdit!: Task;
  categories: Category[] = [];
  selectedCategory: number | 'all' = 'all';
  
  isCreateModalOpen = false;
  isCategoryModalOpen = false;
  isEditOpen = false;

  private getAllTasks = inject(GetAllTasksUseCase);
  private getByCategoryTaskUseCase = inject(GetByCategoryTasksUseCase);
  private updateTaskUseCase = inject(UpdateTaskUseCase);
  private getAllCategoryUseCase = inject(GetAllCategoriesUseCase);

  constructor() {
    addIcons({
      'add': add,
      'filter-circle-outline': filterCircleOutline,
      'document-text-outline': documentTextOutline
    })
  }

  ngOnInit(): void {
    this.getTasks();
    this.getAllCategories();
  }

  removeTaskFromArray(taskSelected: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.id === taskSelected.id);
    this.tasks.splice(taskIndex, 1);
  }

  validateCategoryAction($event: boolean): void {
    if ($event) {
      this.getTasks();
      this.getAllCategories();
    }

    this.isCategoryModalOpen = false;
    this.isCreateModalOpen = false;
  }

  openEditModal(task: Task): void {
    this.isEditOpen = true;
    this.taskToEdit = task;
  }

  editTaskInfo($event: IEditTask): void {
    if ($event.isEdited) {
      const categoryIndex = this.tasks.findIndex(cat => cat.id === this.taskToEdit.id);
      this.tasks[categoryIndex].name = $event.taskInfo?.name!;
      this.tasks[categoryIndex].description = $event.taskInfo?.description!;
      this.tasks[categoryIndex].category_id = $event.taskInfo?.category_id!;

      this.updateTaskUseCase.execute(this.tasks[categoryIndex]);
    }
    this.isEditOpen = false;
  }

  onCategoryChange() {
    if (this.selectedCategory === 'all') {
      this.getTasks();
    } else {
      this.getByCategory();
    }
  }

  async getTasks(): Promise<void> {
    this.tasks = await this.getAllTasks.execute();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.getAllCategoryUseCase.execute();
  }

  async getByCategory(): Promise<void> {
    this.tasks = await this.getByCategoryTaskUseCase.execute(this.selectedCategory as number);
  }
}
