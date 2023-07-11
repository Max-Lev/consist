import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesContainerComponent } from './movie-container.component';
import { MoviesService } from './providers/movies.service';
import { CardModule } from 'primeng/card';
import { MovieComponent } from './components/movie/movie.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    MoviesContainerComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
    CardModule,
    DropdownModule
  ],
  providers:[MoviesService]
})
export class MoviesModule { }
