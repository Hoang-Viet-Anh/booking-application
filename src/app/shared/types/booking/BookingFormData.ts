export interface BookingFormData {
    id?: string;
    name?: string;
    email?: string;
    workspaceId?: string;
    dateSlot?: DateSlot;
    roomSizes?: number[];
}

export interface DateSlot {
    startDate?: Date;
    endDate?: Date;
    isStartTimeSelected?: boolean;
    isEndTimeSelected?: boolean;
}