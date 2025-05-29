import { DateSlot } from "./DateSlot";

export interface BookingFormData {
    name?: string;
    email?: string;
    workspaceType?: string;
    dateSlot?: DateSlot;
    roomSizes?: number[];
}