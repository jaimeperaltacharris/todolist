import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private remoteConfig;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);

    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000, // 1 hora
      fetchTimeoutMillis: 60000            // 60 segundos
    };

    this.remoteConfig.defaultConfig = {
      feature_create_category: true,
      feature_create_task: true
    };
  }

  async initRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote Config activado correctamente');
    } catch (error) {
      console.error('Error al activar Remote Config:', error);
    }
  }

  getConfigValueAsBoolean(key: string): boolean {
    return getValue(this.remoteConfig, key).asBoolean();
  }
}
