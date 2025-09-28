import { Injectable } from '@angular/core';
import { CategoryRepository } from 'src/app/core/repositories/category.repository';
import { DatabaseService } from '../database/database.service';
import { Category } from 'src/app/core/entities/category';

@Injectable({
  providedIn: 'root',
})
export class CategorySQLiteRepository extends CategoryRepository {
  constructor(private dbService: DatabaseService) {
    super();
  }

  async add(category: Omit<Category, 'id'>): Promise<Category> {
    const db = await this.dbService.getDB();
    const now = new Date().toISOString();

    const query = `
      INSERT INTO categories (name, description, created_at, is_active)
      VALUES (?, ?, ?, ?)
    `;
    const values = [category.name, category.description ?? null, now, 1];

    await db.executeSql(query, values);

    const result = await db.executeSql(`SELECT last_insert_rowid() as id`, []);
    const id = result.rows.item(0).id;

    return { ...category, id, created_at: now };
  }

  async getAll(): Promise<Category[]> {
    const db = await this.dbService.getDB();
    const res = await db.executeSql(`SELECT * FROM categories WHERE is_active = 1`, []);
    const categories: Category[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      categories.push(res.rows.item(i));
    }

    return this.dbService.resultSetToArray<Category>(res);
  }

  async update(category: Category): Promise<void> {
    const db = await this.dbService.getDB();
    const query = `
      UPDATE categories 
      SET name = ?, description = ?
      WHERE id = ? AND is_active = ?
    `;
    const values = [category.name, category.description ?? null, category.id, 1];
    await db.executeSql(query, values);
  }

  async delete(id: number): Promise<void> {
    const db = await this.dbService.getDB();
    await db.executeSql(`UPDATE categories 
      SET is_active = ?
      WHERE id = ?`, [0, id]);
  }
}