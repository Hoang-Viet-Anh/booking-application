import { createAction, props } from "@ngrx/store";
import { BookingFormData, DateSlot } from "@shared/types/booking/BookingFormData";

export const setBooking = createAction('[CreateBooking] Set', props<BookingFormData>());
export const updateBooking = createAction('[CreateBooking] Update', props<Partial<BookingFormData>>());
export const updateWorkspaceId = createAction('[CreateBooking] Update workspace id', props<{ workspaceId: string }>());
export const addAreaCapacity = createAction('[CreateBooking] Add area capacity', props<{ areaCapacity: number }>());
export const removeAreaCapacity = createAction('[CreateBooking] Remove area capacity', props<{ areaCapacity: number }>());
export const updateBookingDate = createAction('[CreateBooking] Update date', props<{ date: Partial<DateSlot> }>());
export const updateBookingTime = createAction('[CreateBooking] Update time', props<{ time: Partial<DateSlot> }>());
export const resetBookingDate = createAction('[CreateBooking] Reset date');
export const resetBooking = createAction('[CreateBooking] Reset');

export const safeUpdateBookingDate = createAction('[CreateBooking] Safe update date', props<{ date: Partial<DateSlot> }>());

export const sendBookingRequest = createAction('[CreateBooking] Send booking request');

export const createBookingSuccess = createAction('[CreateBooking] Create booking success');
export const createBookingFailure = createAction('[CreateBooking] Create booking failure');

export const updateBookingSuccess = createAction('[CreateBooking] Update booking success');
export const updateBookingFailure = createAction('[CreateBooking] Update booking failure');

export const deleteBookingRequest = createAction('[CreateBooking] Delete booking request', props<{ id: string }>());
export const deleteBookingSuccess = createAction('[CreateBooking] Delete booking success');
export const deleteBookingFailure = createAction('[CreateBooking] Delete booking failure');