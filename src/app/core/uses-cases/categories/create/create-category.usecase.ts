import { Injectable } from '@angular/core';
import { Category } from '@core/entities/category';
import { CategoryRepository } from '@core/repositories/category.repository';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoryUseCase {
  constructor(private categoryRepo: CategoryRepository) {}

  execute(category: Category): Promise<Category> {
    return this.categoryRepo.add(category);
  }
}