import { Routes } from '@angular/router';
import { WorkspacesComponent } from '../workspaces/workspaces.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { CreateBookingComponent } from 'app/create-booking/create-booking.component';
import { EditBookingComponent } from 'app/edit-booking/edit-booking.component';
import { CoworkingsComponent } from 'app/coworkings/coworkings.component';

export const coworkingRoute = "coworking"
export const workspacesRoute = `${coworkingRoute}/:id/workspaces`
export const bookingsRoute = "bookings"
export const createBookingRoute = `${workspacesRoute}/create-booking`
export const editBookingRoute = `${bookingsRoute}/:id`

export const routes: Routes = [
    { path: '', redirectTo: coworkingRoute, pathMatch: 'full' },
    { path: coworkingRoute, component: CoworkingsComponent },
    { path: workspacesRoute, component: WorkspacesComponent },
    { path: bookingsRoute, component: BookingsComponent },
    { path: createBookingRoute, component: CreateBookingComponent },
    { path: editBookingRoute, component: EditBookingComponent },
];