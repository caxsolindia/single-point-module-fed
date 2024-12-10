import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NotificationsComponent } from './toolbar/notifications/notifications.component';
import { slideInFromRightAnimation } from '../../../assets/animations';
import { AuthService } from '../../services/auths/auth.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideInFromRightAnimation],
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatSidenav) sidenote!: MatSidenav;
  @ViewChild(NotificationsComponent) childComponent!: NotificationsComponent;
  isSearchVisible = false;
  isMobile = true;
  isCollapsed = false;
  hoveredIndex: number = -1;
  userName = this.authService.getUser()?.name;
  title = 'material-responsive-sidenav';

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      this.cdr.detectChanges();
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
    this.cdr.detectChanges();
  }
}
