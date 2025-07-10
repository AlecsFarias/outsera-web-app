import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss',
})
export class BaseTableComponent {
  @Input() title: string = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No data available';
  @Input() showSearch: boolean = false;
  @Input() searchPlaceholder: string = 'Search...';
  @Output() onSearch = new EventEmitter<string>();

  searchValue: string = '';

  handleSearch(): void {
    this.onSearch.emit(this.searchValue);
  }

  getCellValue(row: any, column: TableColumn): any {
    return row[column.key];
  }
}
