import { Component, OnInit } from '@angular/core';
import {
  BaseTableComponent,
  TableColumn,
} from '../../../../components/base-table/base-table.component';
import { CommonModule } from '@angular/common';
import {
  MovieService,
  StudioWithWinCount,
} from '../../../../services/movie.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-top-studios',
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './top-studios.html',
  styleUrl: './top-studios.scss',
})
export class TopStudiosComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { key: 'name', label: 'Studio Name' },
    { key: 'winCount', label: 'Win Count', width: '150px' },
  ];

  tableData: StudioWithWinCount[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.movieService
      .getStudiosWithWinCount()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.tableData = response.studios;
        },
        error: (error) => {
          this.error = error.message;
        },
      });
  }
}
