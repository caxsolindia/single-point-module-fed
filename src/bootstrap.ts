import { NgZone, enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.dev';

if (environment.production) {
  enableProdMode();
}

interface Platform {
  [key: string]: ReturnType<typeof platformBrowser> | undefined;
}

declare const require: {
  (id: string): { dependencies: { [key: string]: string } };
  resolve: (id: string) => string;
  cache: unknown;
  extensions: unknown;
  main: unknown;
};

interface MyWindow extends Window {
  ngZone?: NgZone;
  plattform?: Platform;
}

const ngVersion = require('../package.json').dependencies['@angular/core'];
const myWindow = window as MyWindow;
myWindow.plattform = myWindow.plattform || {};
let platform = myWindow.plattform[ngVersion];
if (!platform) {
  platform = platformBrowser();
  myWindow.plattform[ngVersion] = platform;
}
platform
  .bootstrapModule(AppModule, { ngZone: myWindow.ngZone })
  .catch((err: unknown) => console.error(err));
