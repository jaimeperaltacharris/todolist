import { Injectable } from '@angular/core';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category } from '@core/entities/category';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}