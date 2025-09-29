import { DeleteCategoryUseCase } from './delete-category.usecase';
import { CategoryRepository } from '@core/repositories/category.repository';

describe('DeleteCategoryUseCase', () => {
  let useCase: DeleteCategoryUseCase;
  let mockCategoryRepo: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockCategoryRepo = jasmine.createSpyObj('CategoryRepository', ['delete']);
    useCase = new DeleteCategoryUseCase(mockCategoryRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call category repository delete method with the correct ID and resolve successfully', async () => {
    const categoryIdToDelete = 42;
    mockCategoryRepo.delete.and.resolveTo();
    await useCase.execute(categoryIdToDelete);

    expect(mockCategoryRepo.delete).toHaveBeenCalled();
    expect(mockCategoryRepo.delete).toHaveBeenCalledTimes(1);
    expect(mockCategoryRepo.delete).toHaveBeenCalledWith(categoryIdToDelete);
  });

  it('should reject the promise if the category repository delete method fails', async () => {
    const categoryIdToDelete = 99;
    const error = new Error('Deletion failed: Category not found');

    mockCategoryRepo.delete.and.rejectWith(error);
    await expectAsync(useCase.execute(categoryIdToDelete)).toBeRejectedWith(error);
    expect(mockCategoryRepo.delete).toHaveBeenCalledWith(categoryIdToDelete);
  });
});