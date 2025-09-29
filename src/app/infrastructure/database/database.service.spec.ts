import { DatabaseService } from './database.service';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLITE_CONFIG } from './database.config';
import { CREATE_CATEGORIES_SCHEMA } from './schemas/create/categories.schema';
import { CREATE_TASKS_SCHEMA } from './schemas/create/tasks.schema';

const mockSQLiteObject = {
  executeSql: jasmine.createSpy('executeSql').and.resolveTo({ rows: { length: 0 } }),
  rows: {
    length: 0,
    item: () => {},
  }
} as unknown as SQLiteObject;

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockPlatform: jasmine.SpyObj<Platform>;
  let mockSQLite: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    mockPlatform = jasmine.createSpyObj('Platform', ['ready']);
    mockPlatform.ready.and.returnValue(Promise.resolve(""));

    mockSQLite = jasmine.createSpyObj('SQLite', ['create']);
    mockSQLite.create.and.returnValue(Promise.resolve(mockSQLiteObject));

    (mockSQLiteObject.executeSql as jasmine.Spy).calls.reset();

    service = new DatabaseService(mockSQLite, mockPlatform);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initDB', () => {
    it('should initialize the database, create the instance, and execute schemas', async () => {
      await service.initDB();

      expect(mockPlatform.ready).toHaveBeenCalledTimes(1);
      expect(mockSQLite.create).toHaveBeenCalledWith(SQLITE_CONFIG);
      expect(mockSQLiteObject.executeSql).toHaveBeenCalledTimes(2);
      expect(mockSQLiteObject.executeSql).toHaveBeenCalledWith(CREATE_CATEGORIES_SCHEMA, []);
      expect(mockSQLiteObject.executeSql).toHaveBeenCalledWith(CREATE_TASKS_SCHEMA, []);
    });
  });

  describe('getDB', () => {
    it('should call initDB if dbInstance is null', async () => {
      const initDBSpy = spyOn(service as any, 'initDB').and.callThrough();

      await service.getDB();

      expect(initDBSpy).toHaveBeenCalledTimes(1);

      await service.getDB();

      expect(initDBSpy).toHaveBeenCalledTimes(1);
    });

    it('should return the SQLiteObject instance', async () => {
      await service.initDB();
      const db = await service.getDB();
      expect(db).toBe(mockSQLiteObject);
    });
  });

  describe('resultSetToArray', () => {
    it('should correctly transform a raw result set into an array of objects', () => {
      const mockResult = {
        rows: {
          length: 2,
          item: (index: number) => {
            if (index === 0) return { id: 1, name: 'Test 1' };
            if (index === 1) return { id: 2, name: 'Test 2' };
            return null;
          },
        },
      };

      interface TestItem {
        id: number;
        name: string;
      }
      
      const expectedArray: TestItem[] = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ];

      const result = service.resultSetToArray<TestItem>(mockResult);
      expect(result).toEqual(expectedArray);
    });

    it('should return an empty array if the result set is empty', () => {
      const mockResult = {
        rows: {
          length: 0,
          item: () => {},
        },
      };

      const result = service.resultSetToArray(mockResult);
      expect(result).toEqual([]);
    });
  });
});