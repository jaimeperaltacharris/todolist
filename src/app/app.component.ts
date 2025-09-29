import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './infrastructure/database/database.service';
import { FirebaseService } from '@shared/services/firebase/firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private dbService: DatabaseService,
    private platform: Platform,
    private firebaseService: FirebaseService 
  ) {}

  async ngOnInit(): Promise<void> {
    await this.firebaseService.initRemoteConfig();
    await this.platform.ready();
    await this.dbService.initDB();
  }
}
