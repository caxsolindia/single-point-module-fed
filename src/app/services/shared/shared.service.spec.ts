import { TestBed } from '@angular/core/testing';

import { MenuArray, SharedService } from './shared.service';
import { Router } from '@angular/router';
import { MENU_DATA } from '../../constants';

describe('SharedService', () => {
  let service: SharedService;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', [
      'isActive',
      'navigate',
    ]);

    TestBed.configureTestingModule({
      providers: [SharedService, { provide: Router, useValue: mockRouter }],
    });

    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(service.sideNavItems).toEqual(MENU_DATA.MAIN_MENU);
    expect(service.bottomItems).toEqual(MENU_DATA.BOTTOM_MENU);
    expect(service.topItems).toEqual(MENU_DATA.TOP_ITEMS);
    expect(service.types).toEqual({
      UR: 'unread',
      R: 'read',
      MENTIONS: 'mentions',
      ORG: 'organisation',
    });
  });

  it('should check if a route is active', () => {
    const route = '/some-route';
    mockRouter.isActive.and.returnValue(true);

    expect(service.isActive(route)).toBe(true);
    expect(mockRouter.isActive).toHaveBeenCalledWith(route, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  });

  it('should navigate to a route', () => {
    const route = '/some-route';
    service.routeScreen(route);

    expect(mockRouter.navigate).toHaveBeenCalledWith([route]);
  });

  it('should set option as clicked and reset after timeout', done => {
    const option: MenuArray = {
      routerLink: '/test',
      label: 'Test',
      iconName: 'test-icon',
      isHovered: false,
      isClicked: false,
    };

    service.setClicked(option, true);
    expect(option.isClicked).toBe(true);

    setTimeout(() => {
      expect(option.isClicked).toBe(false);
      done();
    }, 1000);
  });

  it('should get primary colour in component', () => {
    spyOn(window, 'getComputedStyle').and.returnValue({
      getPropertyValue: (prop: string) => {
        if (prop === '--custom-primary-main-color') {
          return ' rgb(255, 255, 255) ';
        }
        return '';
      },
    } as CSSStyleDeclaration);

    expect(service.getPrimaryColourInComponent()).toBe('rgb(255, 255, 255)');
  });

  it('should get major colour in component', () => {
    spyOn(window, 'getComputedStyle').and.returnValue({
      getPropertyValue: (prop: string) => {
        if (prop === '--major-label-colour') {
          return ' rgb(0, 0, 0) ';
        }
        return '';
      },
    } as CSSStyleDeclaration);

    expect(service.getMajorColourInComponent()).toBe('rgb(0, 0, 0)');
  });

  it('should call reactModule.bootstrap when both rootElement and reactModule are provided', () => {
    const mockRootElement = document.createElement('div');
    const mockReactModule = {
      bootstrap: jasmine.createSpy('bootstrap'),
    };

    service.mount(mockRootElement, mockReactModule);

    expect(mockReactModule.bootstrap).toHaveBeenCalledWith(mockRootElement);
  });

  it('should log an error when rootElement is null', () => {
    spyOn(console, 'error');

    service.mount(null, { bootstrap: () => {} });

    expect(console.error).toHaveBeenCalledWith(
      'Root element with id "root" or reactModule is not available'
    );
  });

  it('should log an error when reactModule is null', () => {
    spyOn(console, 'error');

    service.mount(document.createElement('div'), null);

    expect(console.error).toHaveBeenCalledWith(
      'Root element with id "root" or reactModule is not available'
    );
  });

  it('should close the overlay by setting isOpen to false', () => {
    // Open the overlay first
    service.toggleOverlay();
    expect(service.isOpen).toBe(true);

    // Close the overlay
    service.closeOverlay();
    expect(service.isOpen).toBe(false);
  });
});
