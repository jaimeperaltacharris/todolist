import { UpdateStatusTaskUseCase } from './update-status-task.usecase';
import { TaskRepository } from '@core/repositories/task.repository';

describe('UpdateStatusTaskUseCase', () => {
  let useCase: UpdateStatusTaskUseCase;
  let mockTaskRepo: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockTaskRepo = jasmine.createSpyObj('TaskRepository', ['updateStatus']);
    useCase = new UpdateStatusTaskUseCase(mockTaskRepo);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call task repository updateStatus with correct ID and status and resolve successfully', async () => {
    const taskId = 10;
    const newStatus = 1;

    mockTaskRepo.updateStatus.and.resolveTo();

    await expectAsync(useCase.execute(taskId, newStatus)).toBeResolved();

    expect(mockTaskRepo.updateStatus).toHaveBeenCalled();
    expect(mockTaskRepo.updateStatus).toHaveBeenCalledTimes(1);
    expect(mockTaskRepo.updateStatus).toHaveBeenCalledWith(taskId, newStatus);
  });

  it('should reject the promise if the task repository updateStatus method fails', async () => {
    const taskId = 20;
    const newStatus = 0;
    const error = new Error('Repository error: Task status update failed');

    mockTaskRepo.updateStatus.and.rejectWith(error);

    await expectAsync(useCase.execute(taskId, newStatus)).toBeRejectedWith(error);

    expect(mockTaskRepo.updateStatus).toHaveBeenCalledWith(taskId, newStatus);
  });
});