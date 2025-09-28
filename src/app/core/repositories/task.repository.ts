import { Task } from '../entities/task';

export abstract class TaskRepository {
  abstract add(task: Omit<Task, 'id'>): Promise<Task>;
  abstract getAll(): Promise<Task[]>;
  abstract getByCategory(categoryId: number): Promise<Task[]>;
  abstract updateStatus(id: number, completed: number): Promise<void>;
  abstract updateTask(task: Omit<Task, 'id'>): Promise<void>;
  abstract delete(id: number): Promise<void>;
}