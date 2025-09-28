import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
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
import { NoDataComponent } from 'src/app/shared/components/no-data/no-data.component';

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
    EditTaskModalComponent,
    NoDataComponent
  ],
})
export class HomePage implements OnInit {
  @ViewChild('popoverActions') popover!: HTMLIonPopoverElement;

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

  updateTaskStatus(taskSelected: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.id === taskSelected.id);
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
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
    // this.tasks = [
    //   {
    //     "id": 101,
    //     "name": "Preparar presentación de ventas",
    //     "description": "Reunir los datos del último trimestre y diseñar diapositivas atractivas.",
    //     "category_id": 5,
    //     "completed": false,
    //     "created_at": "2025-09-28T14:00:00Z",
    //     "is_active": true
    //   },
    //   {
    //     "id": 102,
    //     "name": "Comprar leche y pan",
    //     "category_id": 1,
    //     "completed": true,
    //     "created_at": "2025-09-27T08:30:00Z",
    //     "is_active": true
    //   },
    //   {
    //     "id": 103,
    //     "name": "Revisar código del módulo de autenticación",
    //     "description": "Asegurar que todas las rutas estén protegidas y los tests pasen.",
    //     "category_id": 3,
    //     "completed": false,
    //     "is_active": true
    //   },
    //   {
    //     "name": "Investigar herramienta de BI",
    //     "description": "Buscar alternativas a Tableau y Power BI.",
    //     "category_id": 4,
    //     "is_active": true
    //   }
    // ]
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.getAllCategoryUseCase.execute();
    // this.categories = [
    //   {
    //     "id": 1,
    //     "name": "Personal",
    //     "description": "Tareas y recados de la vida diaria, como compras o citas médicas.",
    //     "created_at": "2025-09-01T10:00:00Z",
    //     "is_active": true
    //   },
    //   {
    //     "id": 2,
    //     "name": "Trabajo/Profesional",
    //     "description": "Proyectos, reuniones y actividades relacionadas con la oficina o el empleo.",
    //     "is_active": true
    //   },
    // ]
  }

  async getByCategory(): Promise<void> {
    this.tasks = await this.getByCategoryTaskUseCase.execute(this.selectedCategory as number);
  }

  closePopover(): void {
    this.popover.dismiss();
  }
}
