import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_DATA } from '../../constants';
import { ReactModule } from '../../model/reactModule';

export interface MenuArray {
  routerLink: string;
  label: string;
  iconName: string;
  isHovered: boolean;
  isClicked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  sideNavItems: MenuArray[] = MENU_DATA.MAIN_MENU;
  bottomItems: MenuArray[] = MENU_DATA.BOTTOM_MENU;
  topItems: MenuArray[] = MENU_DATA.TOP_ITEMS;

  types = {
    UR: 'unread',
    R: 'read',
    MENTIONS: 'mentions',
    ORG: 'organisation',
  };

  constructor(private readonly router: Router) {}
  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  toggleOverlay(): void {
    this._isOpen = !this._isOpen;
  }

  closeOverlay(): void {
    this._isOpen = false;
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  routeScreen(route: string) {
    this.router.navigate([route]);
  }

  setClicked(
    option:
      | {
          label: string;
          svgName: string;
          action: () => void;
          isHovered: boolean;
          isClicked: boolean;
        }
      | MenuArray,
    isClicked: boolean
  ) {
    option.isClicked = isClicked;
    setTimeout(() => (option.isClicked = false), 1000);
  }

  getPrimaryColourInComponent() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--custom-primary-main-color')
      .trim();
  }

  getMajorColourInComponent() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--major-label-colour')
      .trim();
  }

  mount(rootElement: HTMLElement | null, reactModule: ReactModule | null) {
    if (rootElement && reactModule) {
      reactModule.bootstrap(rootElement);
    } else {
      console.error(
        'Root element with id "root" or reactModule is not available'
      );
    }
  }
  unMount(rootElement: HTMLElement | null, reactModule: ReactModule | null) {
    if (rootElement && reactModule?.unmount) {
      reactModule.unmount(rootElement);
    }
  }
}
