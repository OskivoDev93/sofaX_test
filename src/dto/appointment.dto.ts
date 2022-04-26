export class CreateAppointmentDto {
    day: Day;
    purpose: string;
    date: string;
    status: Status;
    timeSlot: string;
    name: string;
    email: string;
}

export class UpdateAppointmentDto {
    day?: Day;
    purpose?: string;
    date?: string;
    status?: Status;
}

export enum Day {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY= 'THURSDAY',
    FRIDAY = 'FRIDAY',
}

export enum Status {
    PENDING = 'PENDING',
    DONE = 'DONE'
}