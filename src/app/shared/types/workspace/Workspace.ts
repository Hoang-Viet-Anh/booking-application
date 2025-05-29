import { Availability } from "./Availability";

export interface Workspace {
    id?: string;
    title: string;
    description: string;
    imageUrls?: string[];
    amenities?: string[];
    capacityOptions?: number[];
    roomsAvailability?: Availability[];
    desksAvailability?: number;
    maxBookingDays?: number;
}
