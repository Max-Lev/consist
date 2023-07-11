import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesContainerComponent } from './movie-container.component';
import { MoviesService } from './providers/movies.service';
import { CardModule } from 'primeng/card';
import { MovieComponent } from './components/movie/movie.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CapacityValidatorService } from './providers/capacity.validator.service';
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
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers:[MoviesService,
    CapacityValidatorService]
})
export class MoviesModule { }
