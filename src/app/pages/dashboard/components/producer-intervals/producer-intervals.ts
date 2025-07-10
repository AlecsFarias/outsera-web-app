import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MovieService,
  ProducerInterval,
} from '../../../../services/movie.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';

interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
  selector: 'app-producer-intervals',
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './producer-intervals.html',
  styleUrl: './producer-intervals.scss',
})
export class ProducerIntervalsComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { key: 'producer', label: 'Producer' },
    { key: 'interval', label: 'Interval', width: '100px' },
    { key: 'previousWin', label: 'Previous Win', width: '120px' },
    { key: 'followingWin', label: 'Following Win', width: '120px' },
  ];

  minIntervalData: ProducerInterval[] = [];
  maxIntervalData: ProducerInterval[] = [];
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
      .getProducersWinIntervals()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.minIntervalData = response.min;
          this.maxIntervalData = response.max;
        },
        error: (error) => {
          this.error = error.message;
        },
      });
  }
}
