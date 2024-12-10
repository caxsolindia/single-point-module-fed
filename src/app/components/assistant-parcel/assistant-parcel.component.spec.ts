import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantParcelComponent } from './assistant-parcel.component';

describe('AssistantParcelComponent', () => {
  let component: AssistantParcelComponent;
  let fixture: ComponentFixture<AssistantParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistantParcelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
