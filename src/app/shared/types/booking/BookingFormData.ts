export interface BookingFormData {
    id?: string;
    name?: string;
    email?: string;
    coworkingId?: string;
    workspaceId?: string;
    dateSlot?: DateSlot;
    startDate?: Date;
    endDate?: string;
    areaCapacity?: number[];
}

export interface DateSlot {
    startDate?: Date;
    endDate?: Date;
    isStartTimeSelected?: boolean;
    isEndTimeSelected?: boolean;
}