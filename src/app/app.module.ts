import { ErrorHandler, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/utility/wrapper/wrapper.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/utility/page-not-found/page-not-found.component';
import { RouterLinkActive } from '@angular/router';
import { DynamicLoaderComponent } from './components/utility/dynamic-loader/dynamic-loader.component';
import { NotificationsComponent } from './components/layout/toolbar/notifications/notifications.component';
import { UserProfileComponent } from './components/common/user-profile/user-profile.component';
import { SettingsComponent } from './components/common/settings/settings.component';
import { EditableSvgComponent } from './components/utility/editable-svg/editable-svg.component';
import { MaterialModule } from './services/material/material.module';
import { SideNavigationComponent } from './components/layout/side-navigation/side-navigation.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { LoginComponent } from './components/common/login/login.component';
import { SearchComponent } from './components/layout/toolbar/search/search.component';
import { FormsModule } from '@angular/forms';
import { ReactWrapperComponent } from './components/utility/react-wrapper/react-wrapper.component';
import { ErrorService } from './services/shared/error.service';
import { HoverDirective } from './services/directives/hover.directive';
import { ThemeStyleComponent } from './components/theme-style/theme-style.component';
import { AssistantParcelComponent } from './components/assistant-parcel/assistant-parcel.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    HomeComponent,
    LayoutComponent,
    PageNotFoundComponent,
    DynamicLoaderComponent,
    NotificationsComponent,
    UserProfileComponent,
    SettingsComponent,
    EditableSvgComponent,
    SideNavigationComponent,
    ToolbarComponent,
    LoginComponent,
    SearchComponent,
    ReactWrapperComponent,
    HoverDirective,
    ThemeStyleComponent,
    AssistantParcelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterLinkActive,
    FormsModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: ErrorService }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private ngZone: NgZone) {
    (window as unknown as MyWindow).ngZone = this.ngZone;
  }
}

interface MyWindow extends Window {
  ngZone: NgZone;
}
