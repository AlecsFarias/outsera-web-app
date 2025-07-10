import { Component, OnInit } from '@angular/core';
import {
  BaseTableComponent,
  TableColumn,
} from '../../../../components/base-table/base-table.component';
import { CommonModule } from '@angular/common';
import {
  MovieService,
  YearWithMultipleWinners,
} from '../../../../services/movie.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-with-multiple-winners',
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './list-with-multiple-winners.html',
  styleUrl: './list-with-multiple-winners.scss',
})
export class ListWIthMultipleWinners implements OnInit {
  tableColumns: TableColumn[] = [
    { key: 'year', label: 'Year', width: '100px' },
    { key: 'winnerCount', label: 'Winner Count', width: '150px' },
  ];

  tableData: YearWithMultipleWinners[] = [];
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
      .getYearsWithMultipleWinners()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.tableData = response.years;
        },
        error: (error) => {
          this.error = error.message;
        },
      });
  }
}
