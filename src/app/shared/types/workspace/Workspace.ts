export interface Workspace {
    id: string;
    title: string;
    description: string;
    imageUrls?: string[];
    amenities: string[];
    areaType: string;
    areaTypeEmoji: string;
    maxBookingDays: number;
}

