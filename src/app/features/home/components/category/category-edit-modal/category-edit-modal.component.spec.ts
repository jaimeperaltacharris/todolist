import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryEditModalComponent } from './category-edit-modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IEditCategory } from '@features/home/interfaces/edit-category.interface';
import { Category } from '@core/entities/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CategoryEditModalComponent', () => {
  let component: CategoryEditModalComponent;
  let fixture: ComponentFixture<CategoryEditModalComponent>;
  let formBuilder: FormBuilder;

  const mockCategory: Category = {
    id: 1,
    name: 'Old Name',
    description: 'Old Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditModalComponent, ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryEditModalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.category = mockCategory;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with category data and validators', () => {
      expect(component.form instanceof FormGroup).toBeTrue();
      
      expect(component.form.get('name')?.value).toBe(mockCategory.name);
      expect(component.form.get('description')?.value).toBe(mockCategory.description);
      
      const nameControl = component.form.get('name');
      expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
      nameControl?.setValue('');
      expect(nameControl?.valid).toBeFalse();
      nameControl?.setValue('ab');
      expect(nameControl?.valid).toBeFalse();
      nameControl?.setValue('abc');
      expect(nameControl?.valid).toBeTrue();
    });
  });

  describe('closeModal', () => {
    let emitSpy: jasmine.Spy;

    beforeEach(() => {
      emitSpy = spyOn(component.editCategory, 'emit');
    });

    it('should emit isEdited: false and null categoryInfo when called without arguments (cancel)', () => {
      component.closeModal();

      const expectedEmit: IEditCategory = {
        isEdited: false,
        categoryInfo: undefined
      };

      expect(emitSpy).toHaveBeenCalledWith(expectedEmit);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit isEdited: true and categoryInfo when category object is passed (success)', () => {
      const newCategoryInfo = { name: 'New Name', description: 'New Desc' };
      component.closeModal(newCategoryInfo);

      const expectedEmit: IEditCategory = {
        isEdited: true,
        categoryInfo: newCategoryInfo
      };

      expect(emitSpy).toHaveBeenCalledWith(expectedEmit);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});