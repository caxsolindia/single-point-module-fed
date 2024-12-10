import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SharedService } from '../../../../services/shared/shared.service';
import { STATIC_DATA, MENU_DATA } from '../../../../constants';

interface Notification {
  title: string;
  note: string;
  type: string;
  mentions: boolean;
  fromOrg: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @Input() username: string | undefined = '';
  isHovered1: boolean = false;
  labels = STATIC_DATA.LABELS;
  hoveredIndex: number = -1;
  isHovered2: boolean = false;
  primaryColor: string = '';
  black: string = '';
  menuOptions = [
    {
      label: MENU_DATA.NOTIFICATION_MORE[0].label,
      svgName: MENU_DATA.NOTIFICATION_MORE[0].svgName,
      action: () => '',
      isHovered: false,
      isClicked: false,
    },
    {
      label: MENU_DATA.NOTIFICATION_MORE[1].label,
      svgName: MENU_DATA.NOTIFICATION_MORE[1].svgName,
      action: () => '',
      isHovered: false,
      isClicked: false,
    },
    {
      label: MENU_DATA.NOTIFICATION_MORE[2].label,
      svgName: MENU_DATA.NOTIFICATION_MORE[2].svgName,
      action: () => this.sharedService.routeScreen('setting'),
      isHovered: false,
      isClicked: false,
    },
  ];
  sulate = 'Hello ';
  notifData: Notification[] = [
    {
      title: this.sulate,
      note: "Let's complete profile",
      type: 'unread',
      mentions: false,
      fromOrg: false,
    },
    {
      title: this.sulate,
      note: "Let's focus on your today's tasks",
      type: 'unread',
      mentions: false,
      fromOrg: false,
    },
    {
      title: this.sulate,
      note: "Let's complete profile",
      type: 'read',
      mentions: false,
      fromOrg: false,
    },
    {
      title: this.sulate,
      note: 'Tomorrow is your meeting with Manager',
      type: 'unread',
      mentions: false,
      fromOrg: false,
    },
    {
      title: this.sulate,
      note: 'You did great job!',
      type: 'read',
      mentions: true,
      fromOrg: false,
    },
    {
      title: this.sulate,
      note: "Let's have a Townhall",
      type: 'read',
      mentions: false,
      fromOrg: true,
    },
  ];

  constructor(public sharedService: SharedService) {}

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

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  filterNotifications(type: string): Notification[] | undefined {
    return this.notifData.filter(notification => notification.type === type);
  }
}
