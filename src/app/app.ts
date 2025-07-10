import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DrawerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('web-app');
}
