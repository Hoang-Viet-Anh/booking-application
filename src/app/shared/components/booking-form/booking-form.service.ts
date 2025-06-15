import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class BookingFormService {
    private apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) { }

    createBookingRequest(data: BookingFormData): Observable<Object> {
        return this.httpClient.post<Object>(`${this.apiUrl}/Bookings`, {
            ...data,
            startDate: data.dateSlot?.startDate,
            endDate: data.dateSlot?.endDate
        });
    }

    updateBookingRequest(data: BookingFormData): Observable<Object> {
        return this.httpClient.patch(`${this.apiUrl}/Bookings/${data.id}`, {
            ...data,
            startDate: data.dateSlot?.startDate,
            endDate: data.dateSlot?.endDate
        });
    }

    deleteBookingRequest(id: string): Observable<Object> {
        return this.httpClient.delete(`${this.apiUrl}/Bookings/${id}`)
    }
}