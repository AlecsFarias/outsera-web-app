import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseTableComponent,
  TableColumn,
  ColumnSearchEvent,
} from '../../components/base-table/base-table.component';
import {
  MovieService,
  MoviesResponse,
  Content,
} from '../../services/movie.service';

interface MovieDisplay {
  id: number;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  loading = false;
  data: MovieDisplay[] = [];

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  // Filters
  filters: { year?: number; winner?: boolean } = {};

  columns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      /*       width: '80px', */
    },
    {
      key: 'year',
      label: 'Year',
      width: '150px',
      searchable: true,
      searchType: 'number',
      searchPlaceholder: 'Year...',
    },
    {
      key: 'title',
      label: 'Title',
      /*  width: '40%', */
    },
    {
      key: 'studios',
      label: 'Studios',
      /*    width: '25%', */
    },
    {
      key: 'producers',
      label: 'Producers',
      /*   width: '25%', */
    },
    {
      key: 'winner',
      label: 'Winner',
      width: '100px',
      searchable: true,
      searchType: 'select',
      searchPlaceholder: 'All',
      searchOptions: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
    },
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;

    this.movieService
      .getMovies(this.currentPage, this.pageSize, this.filters)
      .subscribe({
        next: (response: MoviesResponse) => {
          this.data = response.content.map((movie: Content) => ({
            id: movie.id,
            year: movie.year,
            title: movie.title,
            studios: movie.studios.join(', '),
            producers: movie.producers.join(', '),
            winner: movie.winner ? 'Yes' : 'No',
          }));

          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.data = [];
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies();
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  onFirstPage(): void {
    this.currentPage = 0;
    this.loadMovies();
  }

  onLastPage(): void {
    this.currentPage = this.totalPages - 1;
    this.loadMovies();
  }

  onColumnSearch(event: ColumnSearchEvent): void {
    console.log('Column search:', event.column, event.value);

    // Reset to first page when applying filters
    this.currentPage = 0;

    // Update filters based on column
    switch (event.column) {
      case 'year':
        if (event.value && !isNaN(Number(event.value))) {
          this.filters.year = Number(event.value);
        } else {
          delete this.filters.year;
        }
        break;

      case 'winner':
        if (event.value === 'Yes') {
          this.filters.winner = true;
        } else if (event.value === 'No') {
          this.filters.winner = false;
        } else {
          delete this.filters.winner;
        }
        break;

      default:
        break;
    }

    // Reload movies with new filters
    this.loadMovies();
  }
}
