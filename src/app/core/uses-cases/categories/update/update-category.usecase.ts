import { Injectable } from '@angular/core';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category } from '@core/entities/category';

@Injectable({
  providedIn: 'root'
})
export class UpdateCategoryUseCase {
  constructor(private categoryRepo: CategoryRepository) {}

  execute(category: Category): Promise<void> {
    return this.categoryRepo.update(category);
  }
}
