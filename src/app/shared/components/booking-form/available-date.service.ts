import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateSlot } from "@shared/types/booking/BookingFormData";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AvailableDateService {
    private readonly apiUrl = "http://localhost:5249";
    private readonly END_HOUR_UTC = 18;

    private bookedDates = new BehaviorSubject<Date[]>([]);
    private startTimeSlots = new BehaviorSubject<Date[]>([]);
    private endTimeSlots = new BehaviorSubject<Date[]>([]);

    bookedDates$ = this.bookedDates.asObservable();
    startTimeSlots$ = this.startTimeSlots.asObservable();
    endTimeSlots$ = this.endTimeSlots.asObservable();

    constructor(
        private httpClient: HttpClient
    ) { }

    getBookedDates(workspaceId: string, capacityList: number[]): void {
        let params = new HttpParams().set('workspaceId', workspaceId);
        capacityList.forEach(cap => {
            params = params.append('capacityList', cap.toString());
        });

        this.httpClient.get<string[]>(`${this.apiUrl}/Bookings/booked-days`, { params })
            .subscribe({
                next: (dates) => {
                    if (dates) {
                        this.bookedDates.next(dates.map(dateStr => new Date(dateStr)));
                    }
                },
                error: (err) => console.error(err)
            });
    }

    getAvailableTimeSlots(dateSlot: DateSlot, workspaceId: string, capacityList: number[]): void {
        let params = new HttpParams().set('workspaceId', workspaceId);
        capacityList.forEach(cap => {
            params = params.append('capacityList', cap.toString());
        });

        this.httpClient.post<{ startTimes: string[], endTimes: string[] }>(`${this.apiUrl}/Bookings/available-hours`, dateSlot, { params })
            .subscribe({
                next: (dates) => {
                    if (dates) {
                        this.startTimeSlots.next(dates.startTimes.map(dateStr => new Date(dateStr)));
                        this.endTimeSlots.next(dates.endTimes.map(dateStr => new Date(dateStr)));
                    }
                },
                error: (err) => console.error(err)
            });
    }

    getOverlappingDate(startDate: Date, maxDate: Date): Date | undefined {
        const overlappingDate = this.bookedDates.value.find(date => CustomDateUtil.compareDate(date, startDate) > 0 && CustomDateUtil.compareDate(date, maxDate) < 0);
        return overlappingDate;
    }
}