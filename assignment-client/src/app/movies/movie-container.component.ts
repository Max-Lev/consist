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

  data: { movies: IMovie, bookings: IBooking[] }[] = [];

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {

    this.data = this.activatedRoute.snapshot.data['moviesResolver'];
    console.log(this.data)
    
  }

  ngOnInit(): void {

  }

  orderHandler(value: { booking: IBooking, tickets: number }) {
    this.moviesService.booking$(value).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err)
    });
  }
}
