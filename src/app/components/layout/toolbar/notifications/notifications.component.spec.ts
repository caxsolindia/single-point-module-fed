import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditableSvgComponent } from '../../../utility/editable-svg/editable-svg.component';
import { MaterialModule } from '../../../../services/material/material.module';
import { SharedService } from '../../../../services/shared/shared.service';
import { HoverDirective } from '../../../../services/directives/hover.directive';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotificationsComponent,
        EditableSvgComponent,
        HoverDirective,
      ],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [SharedService],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set primaryColor and black on ngOnInit', () => {
    const primaryColor = 'primary';
    const black = 'black';
    spyOn(sharedService, 'getPrimaryColourInComponent').and.returnValue(
      primaryColor
    );
    spyOn(sharedService, 'getMajorColourInComponent').and.returnValue(black);
    component.ngOnInit();
    expect(component.primaryColor).toEqual(primaryColor);
    expect(component.black).toEqual(black);
  });

  it('should reset menuOptions states', () => {
    component.menuOptions.forEach(option => {
      option.isHovered = true;
      option.isClicked = true;
    });
    component.resetStates();
    component.menuOptions.forEach(option => {
      expect(option.isHovered).toBeFalse();
      expect(option.isClicked).toBeFalse();
    });
  });

  it('should open drawer', () => {
    const openSpy = spyOn(component.drawer, 'open');
    component.openDrawer();
    expect(openSpy).toHaveBeenCalled();
  });

  it('should close drawer', () => {
    const closeSpy = spyOn(component.drawer, 'close');
    component.closeDrawer();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should filter notifications by type', () => {
    const notifications = [
      {
        title: 'Test',
        note: 'Test notification',
        type: 'unread',
        mentions: false,
        fromOrg: false,
      },
      {
        title: 'Test',
        note: 'Test notification',
        type: 'read',
        mentions: false,
        fromOrg: false,
      },
    ];
    component.notifData = notifications;
    const unreadNotifications = component.filterNotifications('unread');
    const readNotifications = component.filterNotifications('read');
    expect(unreadNotifications?.length).toEqual(1);
    expect(unreadNotifications?.[0].type).toEqual('unread');
    expect(readNotifications?.length).toEqual(1);
    expect(readNotifications?.[0].type).toEqual('read');
  });
});
