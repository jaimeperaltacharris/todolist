import { GetAllCategoriesUseCase } from './get-all-categories.usecase';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category } from '@core/entities/category';

describe('GetAllCategoriesUseCase', () => {
  let useCase: GetAllCategoriesUseCase;
  let mockCategoryRepo: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockCategoryRepo = jasmine.createSpyObj('CategoryRepository', ['getAll']);
    useCase = new GetAllCategoriesUseCase(mockCategoryRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call category repository getAll method and return a list of categories', async () => {
    const categories: Category[] = [
      { id: 1, name: 'Food', description: 'Edible goods' },
      { id: 1, name: 'Clothing', description: 'Apparel and accessories' }
    ];

    mockCategoryRepo.getAll.and.resolveTo(categories);

    const result = await useCase.execute();

    expect(mockCategoryRepo.getAll).toHaveBeenCalled();
    expect(mockCategoryRepo.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(categories);
    expect(result.length).toBe(2);
  });

  it('should return an empty array if category repository getAll method resolves with no categories', async () => {
    const emptyCategories: Category[] = [];

    mockCategoryRepo.getAll.and.resolveTo(emptyCategories);

    const result = await useCase.execute();

    expect(mockCategoryRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should reject the promise if the category repository getAll method fails', async () => {
    const error = new Error('Network error during fetching categories');

    mockCategoryRepo.getAll.and.rejectWith(error);

    await expectAsync(useCase.execute()).toBeRejectedWith(error);
    expect(mockCategoryRepo.getAll).toHaveBeenCalled();
  });
});