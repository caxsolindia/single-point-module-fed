import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auths/auth.service';

import {
  MenuArray,
  SharedService,
} from '../../../services/shared/shared.service';
import { MENU_DATA } from '../../../constants';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  @ViewChild(MatSidenav) sidenote!: MatSidenav;
  @ViewChild(NotificationsComponent)
  notificationComponent!: NotificationsComponent;
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @Input() isCollapsed = false;
  @Input() isMobile = true;
  topItems = this.sharedService.topItems;
  hoveredIndex: number = -1;
  primaryColor: string = '';
  black: string = '';
  userName = this.authService.getUser()?.name;
  isNewNotif: boolean = true; //implement this flag when notifications are fetched from BE.
  isExpanded: boolean = false;
  isDrawerOpen: boolean = false;

  tiles = this.sharedService.sideNavItems;

  menuOptions = MENU_DATA.BOTTOM_ELEMENTS.map((element, index) => ({
    label: element.label,
    svgName: element.svgName,
    action: () => this.handleMenuAction(index),
    isHovered: false,
    isClicked: false,
  }));

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public sharedService: SharedService,
    public el: ElementRef // public el: ElementRef
  ) {}

  ngOnInit(): void {
    this.primaryColor = this.sharedService.getPrimaryColourInComponent();
    this.black = this.sharedService.getMajorColourInComponent();
  }

  resetStates() {
    this.menuOptions.forEach(option => {
      option.isHovered = false;
      option.isClicked = false;
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
  }

  openNotificationsDrawer() {
    this.notificationComponent.openDrawer();
  }

  openSearchDrawer() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      data: { name: 'vrushali' },
    });

    dialogRef.afterClosed().subscribe();
  }

  logout() {
    this.authService.logout();
  }

  toggleSearch() {
    this.isExpanded = !this.isExpanded;
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleSearch();
    }
  }

  getIconPath(item: MenuArray): string {
    const basePath = 'assets/images/';
    let folder = '';
    if (this.isDrawerOpen && item.iconName == 'nine-dots') {
      folder = 'new_fill';
    } else {
      folder = item.isHovered ? 'new_fill' : 'new_linear';
    }
    return `${basePath}${folder}/${item.iconName}.svg`;
  }

  private handleMenuAction(index: number) {
    if (index === 0) {
      this.sharedService.routeScreen('profile');
    } else if (index === 1) {
      this.sharedService.routeScreen('setting');
    } else if (index === 2) {
      this.logout();
    }
  }
  getIconPathMenu(item: MenuArray): string {
    const basePath = 'assets/images/';
    const folder =
      item.isHovered || this.sharedService.isActive(item.routerLink)
        ? 'new_fill'
        : 'new_linear';
    return `${basePath}${folder}/${item.iconName}.svg`;
  }

  toggleOverlay(event: MouseEvent): void {
    this.sharedService.toggleOverlay();
    event.stopPropagation(); // Prevent the click event from propagating to the document
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.sharedService.closeOverlay();
    }
  }
}
