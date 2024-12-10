import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  public environment = environment;
  constructor() {}
}
