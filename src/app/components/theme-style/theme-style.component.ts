import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-theme-style',
  templateUrl: './theme-style.component.html',
  styleUrl: './theme-style.component.scss',
})
export class ThemeStyleComponent {
  public environment = environment;
}
