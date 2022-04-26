import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type AppointmentDocument = Appointment & Document;
@Schema()
export class Appointment {
    @Prop() appId: string;
    @Prop() day: string;
    @Prop() purpose: string;
    @Prop() date: string;
    @Prop() status: string;
    @Prop() name: string;
    @Prop() email: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);