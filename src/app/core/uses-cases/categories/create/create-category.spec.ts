import { CreateCategoryUseCase } from './create-category.usecase';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category } from '@core/entities/category';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let mockCategoryRepo: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockCategoryRepo = jasmine.createSpyObj('CategoryRepository', ['add']);
    useCase = new CreateCategoryUseCase(mockCategoryRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call category repository add method with the correct category object', async () => {
    const newCategory: Category = { id: 1, name: 'Electronics', description: 'Gadgets and appliances' };
    mockCategoryRepo.add.and.resolveTo(newCategory);
    const result = await useCase.execute(newCategory);

    expect(mockCategoryRepo.add).toHaveBeenCalled();
    expect(mockCategoryRepo.add).toHaveBeenCalledTimes(1);
    expect(mockCategoryRepo.add).toHaveBeenCalledWith(newCategory);
    expect(result).toEqual(newCategory);
  });

  it('should reject the promise if the category repository add method fails', async () => {
    const categoryToCreate: Category = { id: 1, name: 'Tools', description: 'Hand and power tools' };
    const error = new Error('Database error during add operation');

    mockCategoryRepo.add.and.rejectWith(error);
    await expectAsync(useCase.execute(categoryToCreate)).toBeRejectedWith(error);
    expect(mockCategoryRepo.add).toHaveBeenCalledWith(categoryToCreate);
  });
});