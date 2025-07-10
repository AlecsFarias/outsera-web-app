import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  searchable?: boolean;
  searchType?: 'text' | 'number' | 'select';
  searchOptions?: { value: string; label: string }[];
  searchPlaceholder?: string;
}

export interface ColumnSearchEvent {
  column: string;
  value: string;
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
  @Input() searchType: 'text' | 'number' = 'text';
  @Output() onSearch = new EventEmitter<string>();
  @Input() isMultiple: boolean = false;
  @Input() subtitles: string[] = [];

  // Column search properties
  @Input() showColumnSearch: boolean = false;
  @Output() onColumnSearch = new EventEmitter<ColumnSearchEvent>();

  // Pagination properties
  @Input() showPagination: boolean = false;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onPreviousPage = new EventEmitter<void>();
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onFirstPage = new EventEmitter<void>();
  @Output() onLastPage = new EventEmitter<void>();

  searchValue: string = '';
  columnSearchValues: { [key: string]: string } = {};

  handleSearch(): void {
    this.onSearch.emit(this.searchValue);
  }

  handleColumnSearch(column: TableColumn, value: string): void {
    this.columnSearchValues[column.key] = value;
    this.onColumnSearch.emit({ column: column.key, value });
  }

  getCellValue(row: any, column: TableColumn): any {
    return row[column.key];
  }

  handlePageChange(page: number): void {
    this.onPageChange.emit(page);
  }

  handlePreviousPage(): void {
    this.onPreviousPage.emit();
  }

  handleNextPage(): void {
    this.onNextPage.emit();
  }

  handleFirstPage(): void {
    this.onFirstPage.emit();
  }

  handleLastPage(): void {
    this.onLastPage.emit();
  }

  getVisiblePages(): number[] {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(
        0,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      let end = Math.min(this.totalPages - 1, start + maxVisiblePages - 1);

      if (end === this.totalPages - 1) {
        start = Math.max(0, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }
}
