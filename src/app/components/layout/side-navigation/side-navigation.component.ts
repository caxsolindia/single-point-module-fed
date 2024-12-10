import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auths/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import {
  SharedService,
  MenuArray,
} from '../../../services/shared/shared.service';
import { STATIC_DATA } from '../../../constants';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent implements OnInit {
  sideNavItems = this.sharedService.sideNavItems;
  bottomItems = this.sharedService.bottomItems;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @Input() isCollapsed = false;
  @Input() isMobile = true;
  labels = STATIC_DATA.LABELS;
  hoveredIndex: number = -1;
  primaryColor: string = '';
  black: string = '';

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.primaryColor = this.sharedService.getPrimaryColourInComponent();
    this.black = this.sharedService.getMajorColourInComponent();
  }

  getIconPath(item: MenuArray): string {
    const basePath = 'assets/images/';
    const folder =
      item.isHovered || this.sharedService.isActive(item.routerLink)
        ? 'new_fill'
        : 'new_linear';
    return `${basePath}${folder}/${item.iconName}.svg`;
  }

  setClicked(item: MenuArray) {
    this.sideNavItems.forEach((option: MenuArray) => {
      option.isClicked = option === item; // Set isClicked to true only for the clicked option
    });
    this.bottomItems.forEach((option: MenuArray) => {
      option.isClicked = option === item; // Set isClicked to true only for the clicked option
    });
  }

  setAction(item: MenuArray) {
    if (item.routerLink === '/logout') {
      this.authService.logout();
    }
  }
}
