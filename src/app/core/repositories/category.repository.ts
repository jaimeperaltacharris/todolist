import { Category } from '../entities/category';

export abstract class CategoryRepository {
  abstract add(category: Omit<Category, 'id'>): Promise<Category>;
  abstract getAll(): Promise<Category[]>;
  abstract update(category: Category): Promise<void>;
  abstract delete(id: number): Promise<void>;
}