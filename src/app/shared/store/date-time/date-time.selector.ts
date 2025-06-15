import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DateTimeState } from "./date-time.reducer";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";
import { selectDateSlot } from "../create-booking/create-booking.selector";

export const selectDateTimeState = createFeatureSelector<DateTimeState>('dateTime');

export const selectBookedDates = createSelector(
    selectDateTimeState,
    (state) => state.bookedDates
);

export const selectTimeSlots = createSelector(
    selectDateTimeState,
    (state) => state.timeSlots
);

export const selectStartTimePeriods = createSelector(
    selectTimeSlots,
    (slots) => slots.map(slot => {
        return {
            id: slot.startDate.toISOString(),
            name: CustomDateUtil.timeFormat(slot.startDate)
        }
    })
);

export const selectEndTimePeriods = createSelector(
    selectTimeSlots,
    selectDateSlot,
    (slots, dateSlot) => {
        const endTimeSlots = slots.map(slot => slot.endDate);
        const endTime = endTimeSlots.sort((a, b) => CustomDateUtil.compareTime(a, b))[endTimeSlots.length - 1];

        if (!dateSlot?.startDate || !dateSlot?.endDate || !endTime) return [];

        const endTimePeriods = [];

        const HOUR_TIME = 60 * 60 * 1000

        for (let day = new Date(dateSlot.startDate.getTime() + HOUR_TIME); day <= endTime; day = new Date(day.getTime() + HOUR_TIME)) {
            if (!endTimeSlots.find(slot => CustomDateUtil.compareTime(day, slot) === 0)) break;

            const endDate = new Date(dateSlot.endDate);
            endDate.setHours(day.getHours());

            endTimePeriods.push({
                id: endDate.toISOString(),
                name: CustomDateUtil.timeFormat(endDate)
            });
        }

        return endTimePeriods;
    }
);