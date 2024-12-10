import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { DialogData } from '../../layout.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @ViewChild('searchDrawer') searchDrawer!: MatDrawer;
  searchText: string = '';

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  openDrawer() {
    this.searchDrawer.open();
  }

  closeDrawer() {
    this.dialogRef.close();
  }

  clearSearch() {
    this.searchText = '';
  }
}
