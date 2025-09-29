import { GetByCategoryTasksUseCase } from './get-by-category-tasks.usecase';
import { TaskRepository } from 'src/app/core/repositories/task.repository';
import { Task } from 'src/app/core/entities/task';

describe('GetByCategoryTasksUseCase', () => {
  let useCase: GetByCategoryTasksUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['getByCategory']);
    useCase = new GetByCategoryTasksUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository getByCategory method with the correct ID and return related tasks', async () => {
    const categoryId = 10;
    const tasks: Task[] = [
      { id: 1, name: 'Task A', category_id: categoryId, completed: false },
      { id: 2, name: 'Task B', category_id: categoryId, completed: false }
    ];

    mockTaskRepo.getByCategory.and.resolveTo(tasks);

    const result = await useCase.execute(categoryId);

    expect(mockTaskRepo.getByCategory).toHaveBeenCalled();
    expect(mockTaskRepo.getByCategory).toHaveBeenCalledTimes(1);
    expect(mockTaskRepo.getByCategory).toHaveBeenCalledWith(categoryId);
    expect(result).toEqual(tasks);
    expect(result.length).toBe(2);
  });

  it('should return an empty array if no tasks are found for the given category ID', async () => {
    const categoryId = 99;
    const emptyTasks: Task[] = [];

    mockTaskRepo.getByCategory.and.resolveTo(emptyTasks);

    const result = await useCase.execute(categoryId);

    expect(mockTaskRepo.getByCategory).toHaveBeenCalledWith(categoryId);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should reject the promise if the task repository getByCategory method fails', async () => {
    const categoryId = 5;
    const error = new Error('Repository error: Invalid category ID');

    mockTaskRepo.getByCategory.and.rejectWith(error);

    await expectAsync(useCase.execute(categoryId)).toBeRejectedWith(error);
    expect(mockTaskRepo.getByCategory).toHaveBeenCalledWith(categoryId);
  });
});