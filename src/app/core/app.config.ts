import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { coworkingReducer } from '@shared/store/coworking/coworking.reducer';
import { workspaceReducer } from '@shared/store/workspace/workspace.reducer';
import { provideEffects } from '@ngrx/effects';
import { CoworkingEffects } from '@shared/store/coworking/coworking.effects';
import { WorkspaceEffects } from '@shared/store/workspace/workspace.effects';
import { bookingReducer } from '@shared/store/booking/booking.reducer';
import { BookingEffects } from '@shared/store/booking/booking.effects';
import { createBookingReducer } from '@shared/store/create-booking/create-booking.reducer';
import { dateTimeReducer } from '@shared/store/date-time/date-time.reducer';
import { DateTimeEffects } from '@shared/store/date-time/date-time.effects';
import { bookingStatusReducer } from '@shared/store/booking-status/booking-status.reducer';
import { CreateBookingEffects } from '@shared/store/create-booking/create-booking.effects';
import { AiAssistantEffects } from '@shared/store/ai-assistant/ai-assistant.effects';
import { aiAssistantReducer } from '@shared/store/ai-assistant/ai-assistant.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({
      coworkings: coworkingReducer,
      workspaces: workspaceReducer,
      bookings: bookingReducer,
      createBooking: createBookingReducer,
      dateTime: dateTimeReducer,
      bookingStatus: bookingStatusReducer,
      aiAssistant: aiAssistantReducer
    }),
    provideEffects(
      CoworkingEffects,
      WorkspaceEffects,
      BookingEffects,
      DateTimeEffects,
      CreateBookingEffects,
      AiAssistantEffects
    ),
  ]
};
