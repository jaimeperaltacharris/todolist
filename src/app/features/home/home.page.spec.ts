import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { GetAllTasksUseCase } from '@core/uses-cases/tasks/getAll/get-all-tasks.usecase';
import { GetByCategoryTasksUseCase } from '@core/uses-cases/tasks/getByCategory/get-by-category-tasks.usecase';
import { UpdateTaskUseCase } from '@core/uses-cases/tasks/update/update-task.usecase';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';
import { FirebaseService } from '@shared/services/firebase/firebase';
import { Task } from '@core/entities/task';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockTasks: Task[] = [
  { id: 99, name: 'Test Task', completed: false, category_id: 1 },
];
const mockCategories = [{ id: 1, name: 'Work' }];

const mockGetAllTasks = jasmine.createSpyObj('GetAllTasksUseCase', ['execute']);
mockGetAllTasks.execute.and.resolveTo(mockTasks);

const mockGetByCategoryTasks = jasmine.createSpyObj('GetByCategoryTasksUseCase', ['execute']);
mockGetByCategoryTasks.execute.and.resolveTo([]);

const mockUpdateTask = jasmine.createSpyObj('UpdateTaskUseCase', ['execute']);
mockUpdateTask.execute.and.resolveTo();

const mockGetAllCategories = jasmine.createSpyObj('GetAllCategoriesUseCase', ['execute']);
mockGetAllCategories.execute.and.resolveTo(mockCategories);

const mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['getConfigValueAsBoolean']);
mockFirebaseService.getConfigValueAsBoolean.and.resolveTo(true);

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let getAllTasksSpy: jasmine.SpyObj<GetAllTasksUseCase>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: GetAllTasksUseCase, useValue: mockGetAllTasks },
        { provide: GetByCategoryTasksUseCase, useValue: mockGetByCategoryTasks },
        { provide: UpdateTaskUseCase, useValue: mockUpdateTask },
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllCategories },
        { provide: FirebaseService, useValue: mockFirebaseService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    
    getAllTasksSpy = TestBed.inject(GetAllTasksUseCase) as jasmine.SpyObj<GetAllTasksUseCase>;
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;

    fixture.detectChanges(); 
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data and configuration on ngOnInit', () => {
    expect(getAllTasksSpy.execute).toHaveBeenCalled();
    expect(mockGetAllCategories.execute).toHaveBeenCalled();
    expect(firebaseServiceSpy.getConfigValueAsBoolean).toHaveBeenCalledWith("feature_create_task");
    
    expect(component.tasks).toEqual(mockTasks);
    expect(component.categories).toEqual(mockCategories);
    expect(component.isCreateTaskActive).toBe(true);
  });
  
  it('should fetch tasks when getTasks is called', async () => {
    const newTasks: Task[] = [{ id: 99, name: 'Test Task', completed: false, category_id: 1 }];
    getAllTasksSpy.execute.and.resolveTo(newTasks);
    
    await component.getTasks();
    
    expect(component.tasks).toEqual(newTasks);
  });
});