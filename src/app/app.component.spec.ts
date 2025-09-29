import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DatabaseService } from './infrastructure/database/database.service';
import { FirebaseService } from '@shared/services/firebase/firebase';
import { Platform, NavController, RouterLinkDelegate } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockNavController = jasmine.createSpyObj('NavController', ['subscribeWithPriority']);
const mockRouterOutletDelegate = jasmine.createSpyObj('RouterOutletDelegate', ['']);

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockFirebaseService: jasmine.SpyObj<FirebaseService>;
  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;
  let mockPlatform: jasmine.SpyObj<Platform>;

  beforeEach(waitForAsync(() => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['initRemoteConfig']);
    mockDatabaseService = jasmine.createSpyObj('DatabaseService', ['initDB']);
    mockPlatform = jasmine.createSpyObj('Platform', ['ready']);

    mockFirebaseService.initRemoteConfig.and.returnValue(Promise.resolve());
    mockDatabaseService.initDB.and.returnValue(Promise.resolve());
    mockPlatform.ready.and.returnValue(Promise.resolve("")); 

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        importProvidersFrom(
          IonicModule.forRoot() 
        ),
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: Platform, useValue: mockPlatform },
        { provide: NavController, useValue: mockNavController }, 
        { provide: RouterLinkDelegate, useValue: mockRouterOutletDelegate }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call initRemoteConfig, platform.ready, and initDB on ngOnInit', async () => {
    await component.ngOnInit();

    expect(mockFirebaseService.initRemoteConfig).toHaveBeenCalled();
    expect(mockPlatform.ready).toHaveBeenCalled();
    expect(mockDatabaseService.initDB).toHaveBeenCalled();
  });

  it('should call methods in correct order', async () => {
    const callOrder: string[] = [];

    mockFirebaseService.initRemoteConfig.and.callFake(() => {
      callOrder.push('firebase');
      return Promise.resolve();
    });

    mockPlatform.ready.and.callFake(() => {
      callOrder.push('platform');
      return Promise.resolve("");
    });

    mockDatabaseService.initDB.and.callFake(() => {
      callOrder.push('database');
      return Promise.resolve();
    });

    await component.ngOnInit();

    expect(callOrder).toEqual(['firebase', 'platform', 'database']);
  });
});