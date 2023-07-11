import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IMovie } from '../../models/movies.model';
import { IBooking } from '../../models/booking.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CapacityValidatorService } from '../../providers/capacity.validator.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnChanges, AfterViewInit {

  @Input() data: { movies: IMovie, bookings: IBooking[] };

  hallSelected: any;

  @Input() hall: any;

  bookingForm: FormGroup;

  @Output() orderEmitter: EventEmitter<{ booking: IBooking, tickets: number }> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private capacityValidatorService: CapacityValidatorService) {

    this.bookingForm = this.formBuilder.group({
      booking: new FormControl<IBooking | null>(null, [Validators.required]),
      tickets: new FormControl<number>(1, [Validators.min(1)])
    }, { validators: this.capacityValidatorService.capacity });

  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {

  }

  submit(value: { booking: IBooking, tickets: number }) {
    this.orderEmitter.emit(value);
  }


}
