import { Availability } from "./Availability";

export type Workspace = {
    id?: string;
    title: string;
    description: string;
    imageUrls?: string[];
    amenities?: string[];
    capacityOptions?: number[];
    roomsAvailability?: Availability[];
    desksAvailability?: number;
}
