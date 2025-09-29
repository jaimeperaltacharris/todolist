import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListItemComponent } from './category-list-item.component';
import { DeleteCategoryUseCase } from '@core/uses-cases/categories/delete/delete-category.usecase';
import { Category } from '@core/entities/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CategoryListItemComponent', () => {
  let component: CategoryListItemComponent;
  let fixture: ComponentFixture<CategoryListItemComponent>;
  let mockDeleteCategoryUseCase: jasmine.SpyObj<DeleteCategoryUseCase>;
  
  const mockCategory: Category = {
    id: 101,
    name: 'Home Supplies',
    description: 'Items for cleaning and maintenance'
  };

  beforeEach(async () => {
    mockDeleteCategoryUseCase = jasmine.createSpyObj('DeleteCategoryUseCase', ['execute']);
    mockDeleteCategoryUseCase.execute.and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [CategoryListItemComponent],
      providers: [
        { provide: DeleteCategoryUseCase, useValue: mockDeleteCategoryUseCase }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListItemComponent);
    component = fixture.componentInstance;
    component.category = mockCategory;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteCategory', () => {
    it('should call the DeleteCategoryUseCase with the correct ID and emit categoryDeleted', async () => {
      const emitSpy = spyOn(component.categoryDeleted, 'emit');

      await component.deleteCategory();

      expect(mockDeleteCategoryUseCase.execute).toHaveBeenCalledWith(mockCategory.id!);
      expect(mockDeleteCategoryUseCase.execute).toHaveBeenCalledTimes(1);
      
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit categoryDeleted even if the delete operation fails (if not handled internally)', async () => {
      const error = new Error('Deletion Failed');
      mockDeleteCategoryUseCase.execute.and.rejectWith(error);
      const emitSpy = spyOn(component.categoryDeleted, 'emit');

      try {
        await component.deleteCategory();
      } catch (e) {
        expect(e).toBe(error);
      }
      
      expect(mockDeleteCategoryUseCase.execute).toHaveBeenCalled();
    });
  });
});