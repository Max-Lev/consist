import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from './models/movies.model';
import { MoviesService } from './providers/movies.service';
import { IBooking } from './models/booking.model';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnInit {

  data: {movies: IMovie, bookings: IBooking[]}[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService) {
    this.data = this.activatedRoute.snapshot.data['moviesResolver'];
  }

  ngOnInit(): void {
    // this.moviesService.getData$()
    //   .subscribe({
    //     next:(data)=>console.log(data),
    //     complete:()=>console.log('complete')
    //   })
  }
}
