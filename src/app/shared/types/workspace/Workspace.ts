export interface Workspace {
    id?: string;
    title: string;
    description: string;
    imageUrls?: string[];
    amenities: string[];
    availability: Availability;
    maxBookingDays: number;
}

export interface Availability {
    type: string;
    rooms: Room[];
}

export interface Room {
    roomsAmount: number;
    capacity: number;
}