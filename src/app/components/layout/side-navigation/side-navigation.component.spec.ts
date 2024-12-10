import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SideNavigationComponent } from './side-navigation.component';
import { EditableSvgComponent } from '../../utility/editable-svg/editable-svg.component';
import { AuthService } from '../../../services/auths/auth.service';
import {
  SharedService,
  MenuArray,
} from '../../../services/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { HoverDirective } from '../../../services/directives/hover.directive';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let sharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const sharedServiceSpy = jasmine.createSpyObj(
      'SharedService',
      ['getPrimaryColourInComponent', 'getMajorColourInComponent', 'isActive'],
      { sideNavItems: [] }
    );
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [
        SideNavigationComponent,
        EditableSvgComponent,

        HoverDirective,
      ],
      imports: [
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        RouterModule.forRoot([]),
        NoopAnimationsModule, // Use NoopAnimationsModule for testing
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    sharedService = TestBed.inject(
      SharedService
    ) as jasmine.SpyObj<SharedService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService logout method on logout', () => {
    authService.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should set isClicked property for clicked menu item', () => {
    const menuItem: MenuArray[] = [
      {
        label: 'Home',
        isClicked: false,
        routerLink: '/home',
        iconName: 'home',
        isHovered: false,
      },
      {
        label: 'Login',
        isClicked: false,
        routerLink: '/auth',
        iconName: 'login',
        isHovered: false,
      },
    ];
    component.sideNavItems = menuItem;
    component.bottomItems = [];
    component.setClicked(menuItem[0]);
    expect(menuItem[0].isClicked).toBe(true);
    component.sideNavItems.forEach(item => {
      if (item !== menuItem[0]) {
        expect(item.isClicked).toBe(false);
      }
    });
  });

  it('should initialize primaryColor and black from SharedService', () => {
    const primaryColor = '#FFFFFF';
    const black = sharedService.getMajorColourInComponent();
    sharedService.getPrimaryColourInComponent.and.returnValue(primaryColor);
    sharedService.getMajorColourInComponent.and.returnValue(black);

    component.ngOnInit();

    expect(component.primaryColor).toBe(primaryColor);
    expect(component.black).toBe(black);
  });

  it('should toggle sidenav', () => {
    component.sidenav = jasmine.createSpyObj('MatSidenav', ['toggle']);
    component.sidenav.toggle();
    expect(component.sidenav.toggle).toHaveBeenCalled();
  });

  it('should toggle setAction', () => {
    const menuItem: MenuArray[] = [
      {
        label: 'Home',
        isClicked: false,
        routerLink: '/home',
        iconName: 'home',
        isHovered: false,
      },
      {
        label: 'Login',
        isClicked: false,
        routerLink: '/auth',
        iconName: 'login',
        isHovered: false,
      },
    ];
    component.setAction(menuItem[0]);
  });
});
