import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    private apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) { }

    getAllBookings(): Observable<BookingFormData[]> {
        return this.httpClient.get<BookingFormData[]>(`${this.apiUrl}/Bookings`)
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