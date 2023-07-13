import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IMovie } from '../../models/movies.model';
import { IBooking } from '../../models/booking.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CapacityValidatorService } from '../../providers/capacity.validator.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnChanges, AfterViewInit {

  @Input() data: { movies: IMovie, bookings: IBooking[] };

  hallSelected: any;

  @Input() hall: any;

  bookingForm: FormGroup;

  @Output() orderEmitter: EventEmitter<{ booking: IBooking, tickets: number, id: number }> = new EventEmitter();

  @Input() id: number = -1;

  constructor(private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private capacityValidatorService: CapacityValidatorService) {

    this.bookingForm = this.formBuilder.group({
      booking: new FormControl<IBooking | null>(null, [Validators.required]),
      tickets: new FormControl<number>(1, [Validators.min(1)])
    }, { validators: this.capacityValidatorService.capacity });

    console.log(this.bookingForm)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ', this.data);
    this.bookingForm.get('booking')?.patchValue(this.data?.bookings[0]);
    this.bookingForm.updateValueAndValidity();
    this.changeDetector.detectChanges();
    console.log(this.bookingForm)
  }

  ngAfterViewInit(): void {

  }

  submit(value: { booking: IBooking, tickets: number }) {
    this.orderEmitter.emit({ booking: value.booking, tickets: value.tickets, id: this.id });
  }


}
