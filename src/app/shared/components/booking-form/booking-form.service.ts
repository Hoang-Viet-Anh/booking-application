import { Injectable } from "@angular/core";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { DateSlot } from "@shared/types/booking/DateSlot";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BookingFormService {
    private bookingFormDataSubject = new BehaviorSubject<BookingFormData>({});

    bookingFormData$ = this.bookingFormDataSubject.asObservable();

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

        if (current.workspaceType === 'Open space') {
            merged.endDate = merged.startDate;
            merged.isEndTimeSelected = false;
        }

        if (merged.startDate && merged.endDate) {
            if (CustomDateUtil.compareDate(merged.startDate, merged.endDate) > 0) {
                merged.endDate = undefined;
                merged.isEndTimeSelected = false;
            } else {
                const msDiff = merged.endDate.getTime() - merged.startDate.getTime();
                const maxDiff = 30 * 24 * 60 * 60 * 1000;

                if (msDiff > maxDiff) {
                    merged.endDate = undefined;
                    merged.isEndTimeSelected = false;
                }
            }
        }

        this.bookingFormDataSubject.next({ ...current, dateSlot: merged });
    }

    updateWorkspaceType(workspaceType: string) {
        const current = this.bookingFormDataSubject.getValue();
        if (current.workspaceType === workspaceType) return;
        const merged = {
            ...current,
            workspaceType,
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
    }

    removeRoomSize(size: number) {
        const current = this.bookingFormDataSubject.getValue();
        const merged = {
            ...current,
            roomSizes: current.roomSizes?.filter((s) => s !== size),
            dateSlot: undefined
        };
        this.bookingFormDataSubject.next(merged);
    }

    roomSizesToString(roomSizes: number[] | undefined): string | undefined {
        if (!roomSizes || roomSizes.length === 0) return undefined;

        if (roomSizes.length === 1) {
            const n = roomSizes[0];
            return `for ${n} ${n === 1 ? 'person' : 'people'}`;
        }

        const allButLast = roomSizes.slice(0, -1).join(', ');
        const last = roomSizes[roomSizes.length - 1];
        const lastText = `${last} ${last === 1 ? 'person' : 'people'}`;

        return `for ${allButLast} and ${lastText}`;
    }
}