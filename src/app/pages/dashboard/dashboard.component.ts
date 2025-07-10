import { Component, OnInit } from '@angular/core';
import { ListWIthMultipleWinners } from './components/list-with-multiple-winners/list-with-multiple-winners';
import { TopStudiosComponent } from './components/top-studios/top-studios';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ListWIthMultipleWinners, TopStudiosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
