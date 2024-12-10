import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public environment = environment;
}
