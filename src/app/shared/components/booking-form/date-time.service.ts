import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { TimeSlot } from "@shared/types/booking/TimePeriod";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DateTimeService {
    private readonly apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) { }

    getBookedDates(createBooking: BookingFormData): Observable<string[]> {
        if (!createBooking.workspaceId || !createBooking.coworkingId || !createBooking.areaCapacity || createBooking.areaCapacity.length === 0) return of([]);

        return this.httpClient.post<string[]>(`${this.apiUrl}/Bookings/booked-days`, {
            bookingId: createBooking.id,
            workspaceId: createBooking.workspaceId,
            coworkingId: createBooking.coworkingId,
            capacityList: createBooking.areaCapacity
        });
    }

    getAvailableTimeSlots(createBooking: BookingFormData): Observable<any[]> {
        if (!createBooking.coworkingId || !createBooking.workspaceId || !createBooking.areaCapacity ||
            !createBooking.dateSlot || !createBooking.dateSlot.startDate || !createBooking.dateSlot.endDate)
            return of([]);

        return this.httpClient.post<any[]>(`${this.apiUrl}/Bookings/available-hours`, {
            bookingId: createBooking.id,
            coworkingId: createBooking.coworkingId,
            workspaceId: createBooking.workspaceId,
            capacityList: createBooking.areaCapacity,
            dateRange: {
                startDate: createBooking.dateSlot.startDate,
                endDate: createBooking.dateSlot.endDate
            }
        });
    }
}