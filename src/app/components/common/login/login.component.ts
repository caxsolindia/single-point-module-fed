import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public environment = environment;
  constructor() {}
}
