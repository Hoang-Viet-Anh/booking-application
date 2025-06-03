import { Routes } from '@angular/router';
import { WorkspacesComponent } from '../workspaces/workspaces.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { CreateBookingComponent } from 'app/create-booking/create-booking.component';
import { EditBookingComponent } from 'app/edit-booking/edit-booking.component';

export const routes: Routes = [
    { path: '', redirectTo: '/workspaces', pathMatch: 'full' },
    { path: 'workspaces', component: WorkspacesComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'workspaces/create-booking', component: CreateBookingComponent },
    { path: 'bookings/:id', component: EditBookingComponent },
];
