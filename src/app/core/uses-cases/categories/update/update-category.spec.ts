import { UpdateCategoryUseCase } from './update-category.usecase';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category } from '@core/entities/category';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let mockCategoryRepo: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockCategoryRepo = jasmine.createSpyObj('CategoryRepository', ['update']);
    useCase = new UpdateCategoryUseCase(mockCategoryRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call category repository update method with the category object and resolve successfully', async () => {
    const updatedCategory: Category = { id: 3, name: 'Books V2', description: 'Updated literature section' };
    mockCategoryRepo.update.and.resolveTo();

    await expectAsync(useCase.execute(updatedCategory)).toBeResolved();

    expect(mockCategoryRepo.update).toHaveBeenCalled();
    expect(mockCategoryRepo.update).toHaveBeenCalledTimes(1);
    expect(mockCategoryRepo.update).toHaveBeenCalledWith(updatedCategory);
  });

  it('should reject the promise if the category repository update method fails', async () => {
    const categoryToUpdate: Category = { id: 5, name: 'Software', description: 'Digital applications' };
    const error = new Error('Validation error: Invalid category name');

    mockCategoryRepo.update.and.rejectWith(error);

    await expectAsync(useCase.execute(categoryToUpdate)).toBeRejectedWith(error);
    expect(mockCategoryRepo.update).toHaveBeenCalledWith(categoryToUpdate);
  });
});