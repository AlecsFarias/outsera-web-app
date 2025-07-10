import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseTableComponent,
  TableColumn,
} from '../../../../components/base-table/base-table.component';
import {
  MovieService,
  MovieWinner,
  WinnersByYear,
} from '../../../../services/movie.service';

interface MovieWinnerDisplay {
  id: number;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

@Component({
  selector: 'app-movie-winners-by-year',
  standalone: true,
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './movie-winners-by-year.html',
  styleUrl: './movie-winners-by-year.scss',
})
export class MovieWinnersByYearComponent implements OnInit {
  loading = false;
  data: MovieWinnerDisplay[] = [];
  lastSearchYear: number | null = null;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'year', label: 'Year', width: '80px' },
    { key: 'title', label: 'Title', width: '40%' },
    { key: 'studios', label: 'Studios', width: '30%' },
    { key: 'producers', label: 'Producers', width: '30%' },
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  onSearch(searchValue: string): void {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      this.data = [];
      this.lastSearchYear = null;
      this.loading = false;
      return;
    }

    this.movieService.getWinnersByYear(parseInt(trimmedValue, 10)).subscribe({
      next: (response: WinnersByYear) => {
        console.log(response);

        this.data = response.map((movie) => ({
          id: movie.id,
          year: movie.year,
          title: movie.title,
          studios: movie.studios.join(', '),
          producers: movie.producers.join(', '),
          winner: movie.winner,
        }));

        console.log(this.data);

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
