import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', [
      'getisLoggedIn',
      'getUser',
      'logout',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    mockRouterStateSnapshot = { url: '', root: {} } as RouterStateSnapshot;
  });

  it('should allow access if user is logged in and has required roles', () => {
    mockAuthService.getisLoggedIn.and.returnValue(true);
    mockAuthService.getUser.and.returnValue({
      name: 'John Doe',
      role: 'Manager',
    });
    mockActivatedRouteSnapshot.data = { roles: ['Manager'] };

    TestBed.runInInjectionContext(() => {
      expect(
        authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      ).toBe(true);
    });
  });

  it('should deny access and navigate to /auth if user is logged in but does not have required roles', () => {
    mockAuthService.getisLoggedIn.and.returnValue(true);
    mockAuthService.getUser.and.returnValue({
      name: 'John Doe',
      role: 'Manager',
    });
    mockActivatedRouteSnapshot.data = { roles: ['admin'] };

    TestBed.runInInjectionContext(() => {
      expect(
        authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      ).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/pagenotfound']);
    });
  });

  it('should deny access and navigate to /auth if user is not logged in', () => {
    mockAuthService.getisLoggedIn.and.returnValue(false);
    mockActivatedRouteSnapshot.data = {};
    mockRouterStateSnapshot.url = '/some-protected-route';

    TestBed.runInInjectionContext(() => {
      expect(
        authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      ).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/pagenotfound']);
    });
  });

  it('should navigate to /home if user is logged in and tries to access /authapp', () => {
    mockAuthService.getisLoggedIn.and.returnValue(true);
    mockRouterStateSnapshot.url = '/authapp';

    TestBed.runInInjectionContext(() => {
      expect(
        authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
      ).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
    });
  });
});
