import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { EditableSvgComponent } from '../../utility/editable-svg/editable-svg.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MaterialModule } from '../../../services/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auths/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HoverDirective } from '../../../services/directives/hover.directive'; // Correct the path as necessary
import { MatSidenav } from '@angular/material/sidenav'; // Import MatSidenav
import {
  MenuArray,
  SharedService,
} from '../../../services/shared/shared.service';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
      close: () => {},
    };
  }
}

export interface User {
  name: string;
  role: string;
}

class AuthServiceMock {
  getUser(): User | undefined {
    return { name: 'Test User', role: 'admin' };
  }
  logout() {}
}

class RouterMock {
  navigate() {}
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        EditableSvgComponent,
        NotificationsComponent,
        HoverDirective, // Add HoverDirective here
      ],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    // Initialize sidenav
    component.sidenav = TestBed.createComponent(MatSidenav).componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open notifications drawer', () => {
    component.notificationComponent = jasmine.createSpyObj(
      'NotificationsComponent',
      ['openDrawer']
    );
    component.openNotificationsDrawer();
    expect(component.notificationComponent.openDrawer).toHaveBeenCalled();
  });

  it('should call authService logout on logout', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should toggle the menu', () => {
    spyOn(component.sidenav, 'toggle'); // Spy on the toggle method
    component.isMobile = true;
    component.toggleMenu();
    expect(component.sidenav.toggle).toHaveBeenCalled();
  });

  it('should route to profile on menu click (index 0)', () => {
    spyOn(component.sharedService, 'routeScreen');
    component.menuOptions[0].action(); // Simulate click on index 0 menu item
    expect(component.sharedService.routeScreen).toHaveBeenCalledWith('profile');
  });

  it('should route to setting on menu click (index 1)', () => {
    spyOn(component.sharedService, 'routeScreen');
    component.menuOptions[1].action(); // Simulate click on index 1 menu item
    expect(component.sharedService.routeScreen).toHaveBeenCalledWith('setting');
  });

  it('should logout on menu click (index 2)', () => {
    spyOn(authService, 'logout');
    component.menuOptions[2].action(); // Simulate click on index 2 menu item
    expect(authService.logout).toHaveBeenCalled();
  });
  it('should call authService logout on logout', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should call resetStates and reset menu options', () => {
    // Set initial state
    component.menuOptions.forEach(option => {
      option.isHovered = true;
      option.isClicked = true;
    });

    component.resetStates();

    // Assert that all menu options have been reset
    component.menuOptions.forEach(option => {
      expect(option.isHovered).toBe(false);
      expect(option.isClicked).toBe(false);
    });
  });

  it('should call sidenav open', () => {
    spyOn(component.sidenav, 'open'); // Spy on the open method
    component.isMobile = false;
    component.isCollapsed = true;
    component.toggleMenu();
    expect(component.sidenav.open).toHaveBeenCalled();
  });

  it('should call openSearchDrawer', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openSearchDrawer();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should toggle isExpanded when toggleSearch is called', () => {
    component.isExpanded = false;
    component.toggleSearch();
    expect(component.isExpanded).toBe(true);
    component.toggleSearch();
    expect(component.isExpanded).toBe(false);
  });

  it('should call toggleSearch when handleKeydown is called with Enter or Space', () => {
    spyOn(component, 'toggleSearch');
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(enterEvent);
    expect(component.toggleSearch).toHaveBeenCalled();

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.handleKeydown(spaceEvent);
    expect(component.toggleSearch).toHaveBeenCalled();
  });

  it('should not call toggleSearch when handleKeydown is called with a key other than Enter or Space', () => {
    spyOn(component, 'toggleSearch');
    const otherEvent = new KeyboardEvent('keydown', { key: 'A' });
    component.handleKeydown(otherEvent);
    expect(component.toggleSearch).not.toHaveBeenCalled();
  });
  it('should toggle isOpen via overlay and stop event propagation in toggleOverlay', () => {
    const event = jasmine.createSpyObj('MouseEvent', ['stopPropagation']);
    const overlay = TestBed.inject(SharedService); // Get the service instance

    spyOn(overlay, 'toggleOverlay').and.callThrough(); // Spy on the toggleOverlay method

    // Initial state should reflect service's default state
    expect(overlay.isOpen).toBe(false);

    // Call the component's method
    component.toggleOverlay(event);

    // Expect service's toggleOverlay to be called
    expect(overlay.toggleOverlay).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    // State should now be toggled
    expect(overlay.isOpen).toBe(true);

    // Call toggleOverlay again
    component.toggleOverlay(event);

    // State should be toggled back
    expect(overlay.isOpen).toBe(false);
  });

  it('should close overlay when clicking outside (onDocumentClick)', () => {
    const overlay = TestBed.inject(SharedService); // Get overlay instance
    spyOn(component.el.nativeElement, 'contains').and.returnValue(false);
    overlay.toggleOverlay(); // Set initial state to open
    expect(overlay.isOpen).toBe(true); // Verify initial state

    component.onDocumentClick(new MouseEvent('click'));

    expect(overlay.isOpen).toBe(false); // Verify the overlay is closed
  });

  it('should not close overlay when clicking inside (onDocumentClick)', () => {
    const overlay = TestBed.inject(SharedService); // Get overlay instance
    spyOn(component.el.nativeElement, 'contains').and.returnValue(true);
    overlay.toggleOverlay(); // Set initial state to open
    expect(overlay.isOpen).toBe(true); // Verify initial state

    component.onDocumentClick(new MouseEvent('click'));

    expect(overlay.isOpen).toBe(true); // Verify the overlay remains open
  });

  it('should return correct icon path based on hover state and active route', () => {
    // Mocking SharedService.isActive method
    spyOn(component.sharedService, 'isActive').and.callFake(
      routerLink => routerLink === 'active-link'
    );

    const basePath = 'assets/images/';
    const mockMenuItem: MenuArray = {
      label: 'Test Label',
      isHovered: false,
      isClicked: false,
      routerLink: 'inactive-link',
      iconName: 'test-icon',
    };

    // Case 1: Item is not hovered and route is not active
    let iconPath = component.getIconPathMenu(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_linear/test-icon.svg`);

    // Case 2: Item is hovered
    mockMenuItem.isHovered = true;
    iconPath = component.getIconPathMenu(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_fill/test-icon.svg`);

    // Case 3: Route is active
    mockMenuItem.isHovered = false;
    mockMenuItem.routerLink = 'active-link';
    iconPath = component.getIconPathMenu(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_fill/test-icon.svg`);
  });

  it('should return correct icon path based on drawer state and hover state', () => {
    const basePath = 'assets/images/';
    const mockMenuItem: MenuArray = {
      label: 'Test Label',
      isHovered: false,
      isClicked: false,
      routerLink: 'test-link',
      iconName: 'nine-dots',
    };

    // Case 1: Drawer is open and iconName is 'nine-dots'
    component.isDrawerOpen = true;
    let iconPath = component.getIconPath(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_fill/nine-dots.svg`);

    // Case 2: Drawer is closed and item is not hovered
    component.isDrawerOpen = false;
    iconPath = component.getIconPath(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_linear/nine-dots.svg`);

    // Case 3: Drawer is closed and item is hovered
    mockMenuItem.isHovered = true;
    iconPath = component.getIconPath(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_fill/nine-dots.svg`);

    // Case 4: Drawer is open but iconName is not 'nine-dots'
    mockMenuItem.iconName = 'test-icon';
    component.isDrawerOpen = true;
    iconPath = component.getIconPath(mockMenuItem);
    expect(iconPath).toBe(`${basePath}new_fill/test-icon.svg`);
  });
});
