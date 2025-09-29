import { DeleteTaskUseCase } from './delete-task.usecase';
import { TaskRepository } from '@core/repositories/task.repository';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;
  
  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['delete']);
    useCase = new DeleteTaskUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository delete method with the correct ID and resolve successfully', async () => {
    const taskIdToDelete = 15;

    mockTaskRepo.delete.and.resolveTo();

    await expectAsync(useCase.execute(taskIdToDelete)).toBeResolved();

    expect(mockTaskRepo.delete).toHaveBeenCalled();
    expect(mockTaskRepo.delete).toHaveBeenCalledTimes(1);
    expect(mockTaskRepo.delete).toHaveBeenCalledWith(taskIdToDelete);
  });

  it('should reject the promise if the task repository delete method fails', async () => {
    const taskIdToDelete = 50;
    const error = new Error('Task deletion failed: Task ID not found');

    mockTaskRepo.delete.and.rejectWith(error);

    await expectAsync(useCase.execute(taskIdToDelete)).toBeRejectedWith(error);

    expect(mockTaskRepo.delete).toHaveBeenCalledWith(taskIdToDelete);
  });
});