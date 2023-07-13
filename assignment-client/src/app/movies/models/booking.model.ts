import { IMovie } from './movies.model';

export interface IBooking {
    id: number,
    movieId: number,
    showTime: string,
    hallId: number,
    booked: number
}


export interface IData {
    bookings: IBooking[];
    movie: IMovie;
}

export class DataModel implements IData {
    bookings: IBooking[];
    movie: IMovie;
    constructor(data: IData) {
        this.bookings = data.bookings;
        this.movie = data.movie;
        console.log(this);
    }
}

export class DataModelList {
    dataModel: DataModel[];
    constructor(data: DataModel[]) {
        this.dataModel = data;
        console.log(this);
    }
}