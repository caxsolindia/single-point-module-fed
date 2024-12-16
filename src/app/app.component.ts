import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService, User } from './services/auths/auth.service';
import { ThemePalette } from './model/themePalatte';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements DoCheck, OnInit {
  title = 'shell';
  isLoggedIn = this.authService.getisLoggedIn();
  user: User | undefined;
  token: string | null = '';
  eventData: string | undefined;
  theme: ThemePalette | null = JSON.parse(
    localStorage.getItem('ThemeConfig') as string
  );

  constructor(public authService: AuthService) {
    if (this.theme) {
      this.setThemeVariables(this.theme.palette);
    }
  }

  storageEventListener(event: StorageEvent) {
    if (event.key === 'ThemeConfig') {
      this.theme = JSON.parse(event.newValue as string);
      if (this.theme) {
        this.setThemeVariables(this.theme.palette);
      }
    }
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      this.authService.setisLoggedIn(true);
    } else {
      this.authService.setisLoggedIn(false);
    }
    this.isLoggedIn = this.authService.getisLoggedIn();

    window.addEventListener('storage', this.storageEventListener.bind(this));
    console.log('kai nathi aavdtu', process.env?.BASE_URL);
    window.addEventListener('info', (evt: Event) => {
      const customEvent = evt as CustomEvent;
      if (customEvent) {
        const eventData = customEvent.detail;
        this.setThemeVariables(eventData.data.palette);
        console.log('Angular Shell', eventData.data.palette.primary.main);
        this.eventData = eventData.data.name; // Assign to a component property for rendering
      }
    });
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.getisLoggedIn();
  }

  setThemeVariables(palette: ThemePalette['palette']): void {
    const root = document.documentElement;

    const variables: { [key: string]: string } = {
      '--custom-background-default-color': palette.background.default,
      '--custom-background-paper-color': palette.background.paper,
      '--custom-primary-main-color': palette.primary.main,
      '--custom-primary-dark-color': palette.primary.dark,
      '--custom-primary-lighter-color': palette.primary.light,
      '--custom-primary-lightest-color': palette.primary.lightest,
      '--custom-secondary-main-color': palette.secondary.main,
      '--custom-secondary-light-color': palette.secondary.light,
      '--custom-success-main-color': palette.success.main,
      '--custom-success-light-color': palette.success.light,
      '--custom-info-main-color': palette.info.main,
      '--custom-info-light-color': palette.info.light,
      '--error-main': palette.error.main,
      '--custom-gray-main-color': palette.gray.main,
      '--custom-gray-light-color': palette.gray.light,
      '--custom-text-primary-color': palette.text.primary,
      '--custom-text-secondary-color': palette.text.secondary,
      '--custom-text-disabled-color': palette.text.disabled,
      '--custom-text-white-color': palette.text.white,
      '--custom-text-green-color': palette.text.green,
      '--divider': palette.divider,
    };

    Object.keys(variables).forEach(key => {
      root.style.setProperty(key, variables[key]);
    });
  }
}
