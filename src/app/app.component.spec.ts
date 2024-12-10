import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, provideRouter } from '@angular/router';
import { AuthService } from './services/auths/auth.service';
import { ThemePalette } from './model/themePalatte';

const eventData = {
  data: {
    palette: {
      mode: 'light',
      background: { default: '#ffffff', paper: '#f5f5f5' },
      primary: {
        main: '#1976d2',
        dark: '#004ba0',
        light: '#63a4ff',
        lightest: '#bbdefb',
      },
      secondary: { main: '#dc004e', light: '#ff6090' },
      success: { main: '#4caf50', light: '#80e27e' },
      info: { main: '#2196f3', light: '#64b5f6' },
      error: { main: '#f44336' },
      gray: { main: '#9e9e9e', light: '#cfcfcf' },
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#bdbdbd',
        white: '#ffffff',
        green: '#4caf50',
      },
      divider: '#bdbdbd',
    },
    name: 'test-event',
  },
};

// Mock AuthService
class MockAuthService {
  getisLoggedIn = jasmine.createSpy('getisLoggedIn').and.returnValue(true);
  getToken = jasmine.createSpy('getToken').and.returnValue('mockToken');
  setisLoggedIn = jasmine.createSpy('setisLoggedIn');
}

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shell'`, () => {
    expect(app.title).toEqual('shell');
  });

  it('should update theme and set CSS variables on storage event', () => {
    const theme: ThemePalette = eventData.data;

    const event: StorageEvent = new StorageEvent('storage', {
      key: 'ThemeConfig',
      newValue: JSON.stringify(theme),
    });

    // Call the storageEventListener method with the mock event
    app.storageEventListener(event);

    // Verify that the theme is updated
    expect(app.theme).toEqual(theme);
  });

  it('should set token and isLoggedIn on ngOnInit', () => {
    // Call ngOnInit
    app.ngOnInit();

    // Verify token is set
    expect(app.token).toBe('mockToken');

    // Verify AuthService.setisLoggedIn is called with true
    expect(authService.setisLoggedIn).toHaveBeenCalledWith(true);
    if (app.token) {
      // Verify isLoggedIn is set correctly
      expect(app.isLoggedIn).toBe(true);
    } else {
      expect(app.isLoggedIn).toBe(false);
    }
  });
  it('should update isLoggedIn on ngDoCheck', () => {
    // Initially, isLoggedIn should be true based on mock service
    expect(app.isLoggedIn).toBe(true);

    // Simulate a change in logged-in state (mocking scenario where user logs out)
    authService.getisLoggedIn.and.returnValue(false);

    // Call ngDoCheck manually
    app.ngDoCheck();

    // Verify that getisLoggedIn was called
    expect(authService.getisLoggedIn).toHaveBeenCalled();

    // Verify that isLoggedIn is updated accordingly
    expect(app.isLoggedIn).toBe(false);
  });

  it('should handle info event listener', () => {
    const infoEvent = new CustomEvent('info', {
      detail: eventData,
    });

    // Call ngOnInit to set up the event listener
    app.ngOnInit();

    // Spy on setThemeVariables to verify it gets called with the correct arguments
    const setThemeVariablesSpy = spyOn(
      app,
      'setThemeVariables'
    ).and.callThrough();

    // Dispatch the custom event
    window.dispatchEvent(infoEvent);

    // Verify that setThemeVariables is called with the correct palette data
    expect(setThemeVariablesSpy).toHaveBeenCalledWith(eventData.data.palette);

    // Verify that the eventData property is set correctly
    expect(app.eventData).toEqual(eventData.data.name);

    // Optionally, you can also check if the console.log was called
    // Note: Spying on console.log is usually not recommended but can be done if necessary
    const consoleSpy = spyOn(console, 'log');
    window.dispatchEvent(infoEvent);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Angular Shell',
      eventData.data.palette.primary.main
    );
  });
});
