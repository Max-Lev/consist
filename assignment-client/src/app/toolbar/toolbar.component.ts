import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  navOptions = [
    { path: 'home', title: 'Home' },
    { path: 'movies', title: 'Movies' }
  ];
}
