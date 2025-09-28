import { Injectable } from '@angular/core';
import { TaskRepository } from 'src/app/core/repositories/task.repository';
import { DatabaseService } from '../database/database.service';
import { Task } from '@core/entities/task';

@Injectable({
  providedIn: 'root',
})
export class TaskSQLiteRepository extends TaskRepository {
  constructor(private dbService: DatabaseService) {
    super();
  }

  async add(task: Omit<Task, 'id'>): Promise<Task> {
    const db = await this.dbService.getDB();
    const now = new Date().toISOString();

    const query = `
      INSERT INTO tasks (name, description, category_id, completed, created_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [task.name, task.description ?? null, task.category_id, 0, now, 1];

    await db.executeSql(query, values);

    const result = await db.executeSql(`SELECT last_insert_rowid() as id`, []);
    const id = result.rows.item(0).id;

    return { ...task, id, created_at: now };
  }

  async getAll(): Promise<Task[]> {
    const db = await this.dbService.getDB();
    const res = await db.executeSql(`SELECT * FROM tasks WHERE is_active = 1`, []);
    const tasks: Task[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      const item = res.rows.item(i);
      tasks.push({
        ...item
      });
    }
    return tasks;
  }

  async getByCategory(categoryId: number): Promise<Task[]> {
    const db = await this.dbService.getDB();
    const query = `
      SELECT * FROM tasks
      WHERE category_id = ? AND is_active = ?
      ORDER BY created_at DESC
    `;

    const res = await db.executeSql(query, [categoryId, 1]);
    return this.dbService.resultSetToArray<Task>(res);
  }

  async updateStatus(id: number, completed: number): Promise<void> {
    const db = await this.dbService.getDB();
    await db.executeSql(`UPDATE tasks SET completed = ? WHERE id = ?`, [completed, id]);
  }

  async updateTask(task: Task): Promise<void> {
    const db = await this.dbService.getDB();

    const query = `
      UPDATE tasks 
      SET name = ?, description = ?, category_id = ?, completed = ?
      WHERE id = ?
    `;

    const values = [
      task.name,
      task.description ?? null,
      task.category_id,
      0,
      task.id,
    ];

    await db.executeSql(query, values);
  }

  async delete(id: number): Promise<void> {
    const db = await this.dbService.getDB();
    await db.executeSql(`UPDATE tasks SET is_active = ? WHERE id = ?`, [0, id]);
  }
}