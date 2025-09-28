import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLITE_CONFIG } from './database.config';
import { CREATE_CATEGORIES_SCHEMA } from './schemas/create/categories.schema';
import { CREATE_TASKS_SCHEMA } from './schemas/create/tasks.schema';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite,
    private platform: Platform
  ) {}

  async initDB() {
    await this.platform.ready();
    this.dbInstance = await this.sqlite.create(SQLITE_CONFIG);
    await this.dbInstance.executeSql(CREATE_CATEGORIES_SCHEMA,[]);
    await this.dbInstance.executeSql(CREATE_TASKS_SCHEMA,[]);
  }

  async getDB(): Promise<SQLiteObject> {
    if (!this.dbInstance) {
      await this.initDB();
    }
    return this.dbInstance!;
  }

  resultSetToArray<T>(res: any): T[] {
    const items: T[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      items.push(res.rows.item(i));
    }
    return items;
  }
}