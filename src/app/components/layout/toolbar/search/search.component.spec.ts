import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditableSvgComponent } from '../../../utility/editable-svg/editable-svg.component';
import { MaterialModule } from '../../../../services/material/material.module';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SearchComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, EditableSvgComponent],
      imports: [MaterialModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        // If your component uses MAT_DIALOG_DATA, provide it as well
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when closeDrawer is called', () => {
    component.closeDrawer();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should clear searchText when clearSearch is called', () => {
    component.searchText = 'mock text';
    component.clearSearch();
    expect(component.searchText).toBe('');
  });
});
