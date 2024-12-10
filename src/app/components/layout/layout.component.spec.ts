import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { EditableSvgComponent } from '../utility/editable-svg/editable-svg.component';
import { MaterialModule } from '../../services/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './toolbar/notifications/notifications.component';
import { HoverDirective } from '../../services/directives/hover.directive';
import { AssistantParcelComponent } from '../assistant-parcel/assistant-parcel.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        SideNavigationComponent,
        ToolbarComponent,
        EditableSvgComponent,
        NotificationsComponent,
        HoverDirective,
        AssistantParcelComponent,
      ],
      imports: [MaterialModule, RouterModule.forRoot([]), NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav for mobile', () => {
    component.isMobile = true;
    spyOn(component.sidenav, 'toggle');
    spyOn(component['cdr'], 'detectChanges');

    component.toggleMenu();
    expect(component.sidenav.toggle).toHaveBeenCalled();
    expect(component.isCollapsed).toBeFalse();
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });

  it('should toggle sidenav for desktop', () => {
    component.isMobile = false;
    spyOn(component.sidenav, 'open');
    spyOn(component['cdr'], 'detectChanges');

    component.toggleMenu();
    expect(component.sidenav.open).toHaveBeenCalled();
    expect(component.isCollapsed).toBeTrue();
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });
});
