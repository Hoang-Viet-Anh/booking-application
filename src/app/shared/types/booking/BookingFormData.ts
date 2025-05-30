export interface BookingFormData {
    id?: string;
    name?: string;
    email?: string;
    workspaceType?: string;
    dateSlot?: DateSlot;
    roomSizes?: number[];
}

export interface DateSlot {
    startDate?: Date;
    endDate?: Date;
    isStartTimeSelected?: boolean;
    isEndTimeSelected?: boolean;
}