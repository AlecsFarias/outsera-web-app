import { Component, OnInit } from '@angular/core';
import { ListWIthMultipleWinners } from './components/list-with-multiple-winners/list-with-multiple-winners';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ListWIthMultipleWinners],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
