export interface Coworking {
    id: string;
    title: string;
    description: string;
    location: string;
    imageUrls?: string[];
    workspacesCapacity: WorkspaceCapacity[];
}

export interface WorkspaceCapacity {
    workspaceId: string;
    availability: Availability[];
}

export interface Availability {
    amounts: number;
    capacity: number;
}