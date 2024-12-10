import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSvgComponent } from './editable-svg.component';

describe('EditableSvgComponent', () => {
  let component: EditableSvgComponent;
  let fixture: ComponentFixture<EditableSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
