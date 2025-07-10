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

    // Try to load from API first, fallback to mock data
    this.movieService
      .getProducersWinIntervals()
      .pipe(
        catchError((error) => {
          console.warn('API call failed, using mock data:', error);
          // Return mock data as fallback
          return of({
            min: [
              {
                producer: 'Joel Silver',
                interval: 1,
                previousWin: 1991,
                followingWin: 1992,
              },
            ],
            max: [
              {
                producer: 'Matthew Vaughn',
                interval: 13,
                previousWin: 2002,
                followingWin: 2015,
              },
            ],
          });
        }),
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
