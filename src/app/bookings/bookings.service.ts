import { Injectable } from "@angular/core";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    private myBookingsSubject = new BehaviorSubject<BookingFormData[]>([]);

    myBookings$ = this.myBookingsSubject.asObservable();

    update(myBookings: BookingFormData[]) {
        this.myBookingsSubject.next(myBookings);
    }

    getBookingById(id: string): BookingFormData | undefined {
        return this.myBookingsSubject.value.find(booking => booking.id === id);
    }
}