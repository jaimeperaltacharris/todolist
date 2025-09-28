import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { TaskRepository } from './app/core/repositories/task.repository';
import { TaskSQLiteRepository } from './app/infrastructure/repositories/task-sqlite.repository';
import { DatabaseService } from './app/infrastructure/database/database.service';
import { CategoryRepository } from '@core/repositories/category.repository';
import { CategorySQLiteRepository } from './app/infrastructure/repositories/category-sqlite.repository';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    SQLite,
    DatabaseService,
    { provide: TaskRepository, useClass: TaskSQLiteRepository },
    { provide: CategoryRepository, useClass: CategorySQLiteRepository}
  ],
});
