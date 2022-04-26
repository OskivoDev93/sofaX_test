import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type CalendarDocument = Calendar & Document;

@Schema()
export class Calendar {
    @Prop() date: string;
    @Prop() slots: ISlot[];
}

export class CreateCalendarDto {
    date: string
}

export class ISlot {
    availability: number;
    time: string;
}

export class UpdateCalendarDto {
    availability?: number;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar)