import { Component, OnInit } from '@angular/core';
import { ListWIthMultipleWinners } from './components/list-with-multiple-winners/list-with-multiple-winners';
import { TopStudiosComponent } from './components/top-studios/top-studios';
import { ProducerIntervalsComponent } from './components/producer-intervals/producer-intervals';
import { MovieWinnersByYearComponent } from './components/movie-winners-by-year/movie-winners-by-year';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListWIthMultipleWinners,
    TopStudiosComponent,
    ProducerIntervalsComponent,
    MovieWinnersByYearComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
