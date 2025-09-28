import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './infrastructure/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private dbService: DatabaseService,
    private platform: Platform
  ) {}

  async ngOnInit(): Promise<void> {
    await this.platform.ready();
    await this.dbService.initDB();
  }
}
