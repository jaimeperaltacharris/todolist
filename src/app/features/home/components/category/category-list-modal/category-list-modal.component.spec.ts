import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListModalComponent } from './category-list-modal.component';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';
import { UpdateCategoryUseCase } from '@core/uses-cases/categories/update/update-category.usecase';
import { DeleteCategoryUseCase } from '@core/uses-cases/categories/delete/delete-category.usecase';
import { FirebaseService } from '@shared/services/firebase/firebase';
import { Category } from '@core/entities/category';
import { IEditCategory } from '@features/home/interfaces/edit-category.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// --- Mocks de Use Cases ---
const mockCategories: Category[] = [
  { id: 1, name: 'Work', description: 'Work tasks' },
  { id: 2, name: 'Study', description: 'Study items' },
];

const mockGetAllCategories = jasmine.createSpyObj('GetAllCategoriesUseCase', ['execute']);
mockGetAllCategories.execute.and.resolveTo(mockCategories);

const mockUpdateCategory = jasmine.createSpyObj('UpdateCategoryUseCase', ['execute']);
mockUpdateCategory.execute.and.resolveTo();

const mockDeleteCategory = jasmine.createSpyObj('DeleteCategoryUseCase', ['execute']);
mockDeleteCategory.execute.and.resolveTo();

const mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['getConfigValueAsBoolean']);

describe('CategoryListModalComponent', () => {
  let component: CategoryListModalComponent;
  let fixture: ComponentFixture<CategoryListModalComponent>;

  beforeEach(async () => {
    mockFirebaseService.getConfigValueAsBoolean.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [CategoryListModalComponent],
      providers: [
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllCategories },
        { provide: UpdateCategoryUseCase, useValue: mockUpdateCategory },
        { provide: DeleteCategoryUseCase, useValue: mockDeleteCategory },
        { provide: FirebaseService, useValue: mockFirebaseService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    mockGetAllCategories.execute.calls.reset();
  });

  it('should create the component and initialize data', () => {
    expect(component).toBeTruthy();
    expect(component.isCreateCategoryActive).toBe(true);
    expect(mockGetAllCategories.execute).toHaveBeenCalled();
    expect(mockFirebaseService.getConfigValueAsBoolean).toHaveBeenCalledWith("feature_create_category");
  });

  describe('getAllCategories', () => {
    it('should fetch categories and populate the categories array', async () => {
      const emptyCategories: Category[] = [];
      mockGetAllCategories.execute.and.resolveTo(emptyCategories);
      component.categories = mockCategories;
      await component.getAllCategories();

      expect(mockGetAllCategories.execute).toHaveBeenCalled();
      expect(component.categories).toEqual(emptyCategories);
    });
  });

  describe('openEditModal', () => {
    it('should set isEditOpen to true and set categoryToEdit', () => {
      const category: Category = mockCategories[0];
      component.isEditOpen = false;

      component.openEditModal(category);

      expect(component.isEditOpen).toBeTrue();
      expect(component.categoryToEdit).toBe(category);
    });
  });

  describe('removeTaskFromArray', () => {
    it('should remove the category from the local array and call the delete use case', async () => {
      component.categories = [...mockCategories];
      const categoryToDelete = component.categories[0]; // ID '1'

      await component.removeTaskFromArray(categoryToDelete);

      expect(component.categories.length).toBe(1);
      expect(component.categories.some(c => c.id === categoryToDelete.id)).toBeFalse();
      expect(mockDeleteCategory.execute).toHaveBeenCalledWith(categoryToDelete.id);
      expect(mockDeleteCategory.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateCategoryAction', () => {
    it('should reload categories and emit needReloadTasks when $event is true', () => {
      const getAllCategoriesSpy = spyOn(component, 'getAllCategories');
      const emitSpy = spyOn(component.needReloadTasks, 'emit');
      component.isCreateCategoryOpen = true;

      component.validateCategoryAction(true);

      expect(getAllCategoriesSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(true);
      expect(component.isCreateCategoryOpen).toBeFalse();
    });

    it('should only close the modal when $event is false', () => {
      const getAllCategoriesSpy = spyOn(component, 'getAllCategories');
      const emitSpy = spyOn(component.needReloadTasks, 'emit');
      component.isCreateCategoryOpen = true;

      component.validateCategoryAction(false);

      expect(getAllCategoriesSpy).not.toHaveBeenCalled();
      expect(emitSpy).not.toHaveBeenCalled();
      expect(component.isCreateCategoryOpen).toBeFalse();
    });
  });

  describe('editCategoryInfo', () => {
    it('should update the category, call the update use case, and close the modal when isEdited is true', () => {
      const categoryToUpdate = { ...mockCategories[0] };
      component.categories = [categoryToUpdate];
      component.categoryToEdit = categoryToUpdate;
      component.isEditOpen = true;

      const editEvent: IEditCategory = {
        isEdited: true,
        categoryInfo: { name: 'New Work Name', description: 'Updated Description' }
      };

      component.editCategoryInfo(editEvent);

      expect(categoryToUpdate.name).toBe('New Work Name');
      expect(categoryToUpdate.description).toBe('Updated Description');
      expect(mockUpdateCategory.execute).toHaveBeenCalledWith(categoryToUpdate);
      expect(component.isEditOpen).toBeFalse();
    });

    it('should only close the modal when isEdited is false', () => {
      component.isEditOpen = true;
      
      const editEvent: IEditCategory = {
        isEdited: false,
        categoryInfo: undefined
      };

      component.editCategoryInfo(editEvent);

      expect(component.isEditOpen).toBeFalse();
    });
  });
});