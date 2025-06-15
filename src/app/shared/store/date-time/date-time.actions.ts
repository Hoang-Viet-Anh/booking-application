import { createAction, props } from "@ngrx/store";
import { TimeSlot } from "@shared/types/booking/TimePeriod";

export const loadBookedDates = createAction('[DateTime] Load booked dates');
export const loadBookedDatesSuccess = createAction('[DateTime] Load booked dates success', props<{ bookedDates: Date[] }>());
export const loadBookedDatesFailure = createAction('[DateTime] Load booked dates failure');

export const loadTimeSlots = createAction('[DateTime] Load time slots');
export const loadTimeSlotsSuccess = createAction('[DateTime] Load time slots success', props<{ timeSlots: TimeSlot[] }>());
export const loadTimeSlotsFailure = createAction('[DateTime] Load time slots failure');