import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movie/movie.component';
import { MoviesService } from './providers/movies.service';


@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
  ],
  providers:[MoviesService]
})
export class MoviesModule { }
