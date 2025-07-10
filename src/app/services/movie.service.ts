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
}
