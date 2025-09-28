import { Injectable } from '@angular/core';
import { CategoryRepository } from '@core/repositories/category.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryUseCase {
  constructor(private categoryRepo: CategoryRepository) {}

  execute(categoryId: number): Promise<void> {
    return this.categoryRepo.delete(categoryId);
  }
}
