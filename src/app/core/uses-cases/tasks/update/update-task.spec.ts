import { UpdateTaskUseCase } from './update-task.usecase';
import { TaskRepository } from '@core/repositories/task.repository';
import { Task } from '@core/entities/task';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['updateTask']);
    useCase = new UpdateTaskUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository updateTask method with the task object and resolve successfully', async () => {
    const updatedTask: Task = {
      id: 1,
      name: 'Finish report',
      completed: true,
      category_id: 1,
      description: 'The final version'
    };

    mockTaskRepo.updateTask.and.resolveTo();

    await expectAsync(useCase.execute(updatedTask)).toBeResolved();

    expect(mockTaskRepo.updateTask).toHaveBeenCalled();
    expect(mockTaskRepo.updateTask).toHaveBeenCalledTimes(1);
    expect(mockTaskRepo.updateTask).toHaveBeenCalledWith(updatedTask);
  });

  it('should reject the promise if the task repository updateTask method fails', async () => {
    const taskToUpdate: Task = { id: 2, name: 'Broken task', completed: false, category_id: 1 };
    const error = new Error('Database error during update operation');

    mockTaskRepo.updateTask.and.rejectWith(error);

    await expectAsync(useCase.execute(taskToUpdate)).toBeRejectedWith(error);

    expect(mockTaskRepo.updateTask).toHaveBeenCalledWith(taskToUpdate);
  });
});