import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCategoryComponent } from './form-category.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '@core/entities/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormCategoryComponent', () => {
  let component: FormCategoryComponent;
  let fixture: ComponentFixture<FormCategoryComponent>;
  let formBuilder: FormBuilder;
  let testForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCategoryComponent, ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCategoryComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    testForm = formBuilder.group({
      name: ['Initial Name', [Validators.required, Validators.minLength(3)]],
      description: ['Initial Description'],
    });

    component.form = testForm;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    let saveEmitSpy: jasmine.Spy;

    beforeEach(() => {
      saveEmitSpy = spyOn(component.save, 'emit');
    });

    it('should emit the form value and reset the form if the form is valid', () => {
      testForm.setValue({
        name: 'Valid Name',
        description: 'Valid Description',
      });
      expect(testForm.valid).toBeTrue();

      component.submit();

      const expectedValue: Omit<Category, 'id'> = {
        name: 'Valid Name',
        description: 'Valid Description',
      };
      expect(saveEmitSpy).toHaveBeenCalledWith(expectedValue);
      expect(saveEmitSpy).toHaveBeenCalledTimes(1);

      expect(testForm.value.name).toBeNull();
      expect(testForm.value.description).toBeNull();
    });

    it('should NOT emit the form value or reset the form if the form is invalid', () => {
      testForm.setValue({
        name: 'a',
        description: 'Desc',
      });
      expect(testForm.valid).toBeFalse();

      component.submit();

      expect(saveEmitSpy).not.toHaveBeenCalled();

      expect(testForm.value.name).toBe('a');
      expect(testForm.value.description).toBe('Desc');
    });

    it('should reset the form even if the initial value was null and then valid', () => {
      testForm.reset();
      testForm.setValue({
        name: 'Test',
        description: 'Test Description'
      });
      
      component.submit();
      
      expect(saveEmitSpy).toHaveBeenCalledTimes(1);
      expect(testForm.value.name).toBeNull(); 
    });
  });
});