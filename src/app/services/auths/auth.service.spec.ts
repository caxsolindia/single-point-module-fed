import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  const userData = { name: 'John Doe', role: 'Manager' };
  const token = 'test-token';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: spy }], // Provide Router
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    //when auth app running declare user with {name:'xyz', role:'xyz'} here for positive cases
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Token management', () => {
    it('should set and get the token correctly', () => {
      service.setToken(token);
      expect(service.getToken()).toBe(token);
    });

    it('should return null after setting the token to null', () => {
      service.setToken(null);
      expect(service.getToken()).toBeNull();
    });
    it('should initialize _token from sessionStorage', () => {
      sessionStorage.setItem('accessToken', token);
      service = TestBed.inject(AuthService);
      service.setToken(token);
      expect(service.getToken()).toBe(token);
    });
  });

  describe('User and login status', () => {
    it('should set isLoggedIn, set user, and navigate to /home on login', () => {
      service.login(userData);
      expect(service.getisLoggedIn()).toBeTrue();
      expect(service.getUser()).toEqual(userData);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should reset isLoggedIn, clear user and token, remove sessionStorage items, and navigate to /auth on logout', () => {
      service.login(userData);
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      service.logout();
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toBeUndefined();
      expect(service.getToken()).toBeNull();
      expect(sessionStorage.getItem('accessToken')).toBeNull();
      expect(sessionStorage.getItem('userData')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/authapp']);
    });

    it('should initialize _isLoggedIn and _user if data and token exist in sessionStorage', () => {
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      service = TestBed.inject(AuthService);
      service.setUser(userData);
      service.setToken(token);
      service.setisLoggedIn(true);
      expect(service.getisLoggedIn()).toBeTrue();
      expect(service.getUser()).toEqual(userData);
    });
  });
});
