import { GetAllTasksUseCase } from './get-all-tasks.usecase';
import { TaskRepository } from 'src/app/core/repositories/task.repository';
import { Task } from 'src/app/core/entities/task';

describe('GetAllTasksUseCase', () => {
  let useCase: GetAllTasksUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['getAll']);
    useCase = new GetAllTasksUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository getAll method and return a list of tasks', async () => {
    const tasks: Task[] = [
      { id: 1, name: 'Buy groceries', completed: false , category_id: 1},
      { id: 2, name: 'Read documentation', completed: true, category_id: 1 }
    ];

    mockTaskRepo.getAll.and.resolveTo(tasks);

    const result = await useCase.execute();

    expect(mockTaskRepo.getAll).toHaveBeenCalled();
    expect(mockTaskRepo.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tasks);
    expect(result.length).toBe(2);
  });

  it('should return an empty array if task repository getAll method resolves with no tasks', async () => {
    const emptyTasks: Task[] = [];

    mockTaskRepo.getAll.and.resolveTo(emptyTasks);

    const result = await useCase.execute();

    expect(mockTaskRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should reject the promise if the task repository getAll method fails', async () => {
    const error = new Error('Repository error: Cannot connect to data source');

    mockTaskRepo.getAll.and.rejectWith(error);

    await expectAsync(useCase.execute()).toBeRejectedWith(error);
    expect(mockTaskRepo.getAll).toHaveBeenCalled();
  });
});