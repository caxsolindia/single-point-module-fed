import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeStyleComponent } from './theme-style.component';
import { ReactWrapperComponent } from '../utility/react-wrapper/react-wrapper.component';

describe('ThemeStyleComponent', () => {
  let component: ThemeStyleComponent;
  let fixture: ComponentFixture<ThemeStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeStyleComponent, ReactWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
