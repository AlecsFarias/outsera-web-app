import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService, QueryParams } from './http.service';

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMoreThanOneWinner {
  years: YearWithMultipleWinners[];
}

export interface Content {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface MoviesResponse {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  empty: boolean;
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MovieFilters extends QueryParams {
  year?: number;
  winner?: boolean;
  page?: number;
  size?: number;
}

export interface StudioWithWinCount {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCount {
  studios: StudioWithWinCount[];
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersIntervals {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export interface MovieWinner {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export type WinnersByYear = MovieWinner[];

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpService: HttpService) {}

  /**
   * Get years with more than one winner
   */
  getYearsWithMultipleWinners(): Observable<YearsWithMoreThanOneWinner> {
    return this.httpService.get<YearsWithMoreThanOneWinner>(
      '/movies/yearsWithMultipleWinners'
    );
  }

  /**
   * Get top 3 studios with winners
   */
  getStudiosWithWinCount(): Observable<StudiosWithWinCount> {
    return this.httpService
      .get<StudiosWithWinCount>('/movies/studiosWithWinCount')
      .pipe(
        map((response) => ({
          studios: response.studios.slice(0, 3),
        }))
      );
  }

  /**
   * Get producers with longest and shortest interval between wins
   */
  getProducersWinIntervals(): Observable<ProducersIntervals> {
    return this.httpService.get<ProducersIntervals>(
      '/movies/maxMinWinIntervalForProducers'
    );
  }

  /**
   * Get movie winners by year
   */
  getWinnersByYear(year?: number): Observable<WinnersByYear> {
    const params = year ? { year } : {};
    return this.httpService.get<WinnersByYear>('/movies/winnersByYear', params);
  }

  /**
   * Get movies with pagination and filters
   */
  getMovies(
    page: number = 0,
    size: number = 10,
    filters?: { year?: number; winner?: boolean }
  ): Observable<MoviesResponse> {
    const params: any = { page, size };

    if (filters?.year) {
      params.year = filters.year;
    }

    if (filters?.winner !== undefined) {
      params.winner = filters.winner;
    }

    return this.httpService.get<MoviesResponse>('/movies', params);
  }
}
