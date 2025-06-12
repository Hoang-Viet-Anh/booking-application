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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({
      coworkings: coworkingReducer,
      workspaces: workspaceReducer,
      bookings: bookingReducer
    }),
    provideEffects(
      CoworkingEffects,
      WorkspaceEffects,
      BookingEffects
    ),
  ]
};
