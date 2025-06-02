import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BookingFormService } from "@shared/components/booking-form/booking-form.service";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    private apiUrl = "http://localhost:5249";

    private myBookingsSubject = new BehaviorSubject<BookingFormData[]>([]);

    myBookings$ = this.myBookingsSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private bookingFormService: BookingFormService,
        private router: Router
    ) { }

    update(myBookings: BookingFormData[]) {
        this.myBookingsSubject.next(myBookings);
    }

    fetchBookings() {
        this.httpClient.get<BookingFormData[]>(`${this.apiUrl}/Bookings`)
            .pipe(
                map((bookings) => bookings.map(b => this.parseDates(b)))
            )
            .subscribe({
                next: (bookings) => this.myBookingsSubject.next(bookings),
                error: (err) => console.error(err)
            });
    }

    fetchBookingById(id: string) {
        this.httpClient.get<BookingFormData>(`${this.apiUrl}/Bookings/${id}`)
            .pipe(
                map((booking) => this.parseDates(booking))
            )
            .subscribe({
                next: (booking) => this.bookingFormService.setBookingForm(booking),
                error: (err) => this.router.navigate(['/bookings'])
            });
    }

    parseDates(b: BookingFormData): BookingFormData {
        if (!b.dateSlot) return b;
        return {
            ...b,
            dateSlot: b.dateSlot
                ? {
                    ...b.dateSlot,
                    startDate: b.dateSlot.startDate ? new Date(b.dateSlot.startDate) : undefined,
                    endDate: b.dateSlot.endDate ? new Date(b.dateSlot.endDate) : undefined
                }
                : undefined
        };
    }

}