import { CreateTaskUseCase } from './create-task.usecase';
import { TaskRepository } from '@core/repositories/task.repository';
import { Task } from '@core/entities/task';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['add']);
    useCase = new CreateTaskUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository add method with the correct task object and return the created task', async () => {
    const newTask: Task = {
      id: 1,
      name: 'Review PR #45',
      description: 'Check logic and tests for the new feature',
      completed: false,
      created_at: new Date().toDateString(),
      category_id: 1
    };

    mockTaskRepo.add.and.resolveTo(newTask);

    const result = await useCase.execute(newTask);

    expect(mockTaskRepo.add).toHaveBeenCalled();
    expect(mockTaskRepo.add).toHaveBeenCalledTimes(1);
    expect(mockTaskRepo.add).toHaveBeenCalledWith(newTask);
    expect(result).toEqual(newTask);
  });

  it('should reject the promise if the task repository add method fails', async () => {
    const taskToCreate: Task = { id: 1, name: 'Test Failed', completed: false, category_id: 1};
    const error = new Error('Database connection failed');

    mockTaskRepo.add.and.rejectWith(error);

    await expectAsync(useCase.execute(taskToCreate)).toBeRejectedWith(error);
    expect(mockTaskRepo.add).toHaveBeenCalledWith(taskToCreate);
  });
});