import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingFormData, DateSlot } from "@shared/types/booking/BookingFormData";
import { Workspace } from "@shared/types/workspace/Workspace";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";
import { WorkspaceService } from "@workspaces/workspaces.service";
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from "rxjs";
import { AvailableDateService } from "./available-date.service";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class BookingFormService {
    private apiUrl = environment.apiUrl;

    private bookingFormDataSubject = new BehaviorSubject<BookingFormData>({});

    bookingFormData$ = this.bookingFormDataSubject.asObservable();
    workspaces$: Observable<Workspace[]>;
    bookedDates$: Observable<Date[]>;

    constructor(
        private workspaceService: WorkspaceService,
        private httpClient: HttpClient,
        private availableDateService: AvailableDateService,
    ) {
        this.workspaces$ = this.workspaceService.workspaces$;
        this.bookedDates$ = this.availableDateService.bookedDates$;
    }

    setBookingForm(data: BookingFormData) {
        this.bookingFormDataSubject.next(data);
    }

    updateForm(data: Partial<BookingFormData>) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = { ...current, ...data };

        this.bookingFormDataSubject.next(merged);
    }

    updateTime(data: Partial<DateSlot>) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = { ...current.dateSlot, ...data };

        this.bookingFormDataSubject.next({ ...current, dateSlot: merged });
    }

    updateDate(data: Partial<DateSlot>) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = { ...current.dateSlot, ...data };
        const workspace = this.workspaceService.findWorkspace(current.workspaceId);

        if (!workspace) return;
        if (workspace.maxBookingDays === 1) {
            merged.endDate = merged.startDate;
            merged.isEndTimeSelected = false;
        } else if (merged.startDate && merged.endDate) {
            if (CustomDateUtil.compareDate(merged.startDate, merged.endDate) > 0) {
                merged.endDate = undefined;
                merged.isEndTimeSelected = false;
            } else {
                const msDiff = merged.endDate.getTime() - merged.startDate.getTime();
                const maxDiff = workspace.maxBookingDays * 24 * 60 * 60 * 1000;
                const overlappingDate = this.availableDateService.getOverlappingDate(merged.startDate, merged.endDate);

                if (msDiff > maxDiff || overlappingDate) {
                    merged.endDate = undefined;
                    merged.isEndTimeSelected = false;
                }
            }
        }

        this.bookingFormDataSubject.next({ ...current, dateSlot: merged });
    }

    updateTimeSlots(endTime: Date, startTime?: Date) {
        const current = this.bookingFormDataSubject.getValue();
        if (!current.workspaceId || !current.roomSizes) return;
        const dateSlot = {
            startDate: CustomDateUtil.toUtcDate(startTime ?? current.dateSlot?.startDate),
            endDate: CustomDateUtil.toUtcDate(endTime),
            isStartTimeSelected: current.dateSlot?.isStartTimeSelected,
            isEndTimeSelected: current.dateSlot?.isEndTimeSelected
        }
        this.availableDateService.getAvailableTimeSlots(dateSlot, current.workspaceId, current.roomSizes);
    }

    updateWorkspaceId(workspaceId: string) {
        const current = this.bookingFormDataSubject.getValue();
        if (current.workspaceId === workspaceId) return;
        const merged = {
            ...current,
            workspaceId,
            dateSlot: undefined,
            roomSizes: []
        };
        this.bookingFormDataSubject.next(merged);
    }

    addRoomSize(size: number) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = {
            ...current,
            roomSizes: [...(current.roomSizes ?? []), size],
            dateSlot: undefined
        };
        this.bookingFormDataSubject.next(merged);
        if (merged.roomSizes.length > 0 && merged.workspaceId) {
            this.availableDateService.getBookedDates(merged.workspaceId, merged.roomSizes);
        }
    }

    removeRoomSize(size: number) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = {
            ...current,
            roomSizes: current.roomSizes?.filter((s) => s !== size),
            dateSlot: undefined
        };
        this.bookingFormDataSubject.next(merged);
        if (merged.roomSizes && merged.roomSizes.length > 0 && merged.workspaceId) {
            this.availableDateService.getBookedDates(merged.workspaceId, merged.roomSizes);
        }
    }

    isFormDataValid(): Observable<boolean | undefined> {
        return this.bookingFormData$.pipe(map(data => {
            const { name, email, workspaceId, dateSlot, roomSizes } = data;

            const hasRequiredFields = !!name && !!email && !!workspaceId;

            const hasValidDates = !!dateSlot?.startDate && !!dateSlot?.endDate
                && dateSlot.isStartTimeSelected && dateSlot.isEndTimeSelected;

            const hasValidRoomSizes = roomSizes && roomSizes.length > 0;

            return hasRequiredFields && hasValidDates && hasValidRoomSizes;
        }));
    }

    createBookingRequest(): Observable<boolean> {
        const data = this.bookingFormDataSubject.getValue();
        return this.httpClient.post(`${this.apiUrl}/Bookings`, data)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError(() => of(false))
            )
    }

    updateBookingRequest(): Observable<boolean> {
        const data = this.bookingFormDataSubject.getValue();
        return this.httpClient.patch(`${this.apiUrl}/Bookings/${data.id}`, data)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError(() => of(false))
            )
    }

    deleteBookingRequest(id: string): Observable<boolean> {
        return this.httpClient.delete(`${this.apiUrl}/Bookings/${id}`)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError(() => of(false))
            )
    }

    findWorkspace(): Observable<Workspace | undefined> {
        return combineLatest([this.bookingFormData$, this.workspaces$]).pipe(
            map(([data, workspaces]) => {
                if (!data.workspaceId) return;
                return workspaces.find((w) => w.id === data.workspaceId);
            }),
        );
    }
}