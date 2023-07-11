import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { IBooking } from '../models/booking.model';

@Injectable()
export class CapacityValidatorService {

  constructor() { }

  capacity: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const capacity = control.get('booking')?.value?.capacity;
    const booked = control.get('booking')?.value?.booked;
    const tickets = control.get('tickets')?.value;

    if ((tickets + booked) > capacity) {
      return { capacity: false }
    }

    return null;
  };

}
