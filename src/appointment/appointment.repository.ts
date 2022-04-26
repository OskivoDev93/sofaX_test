import { Status, UpdateAppointmentDto } from './../dto/appointment.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery} from 'mongoose';
import { Appointment, AppointmentDocument } from "../schema/appointment.schema";

@Injectable()
export class AppointmentRepository {
    constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {}

    async findOne( filterQuery: FilterQuery<Appointment>): Promise<Appointment> {
        return this.appointmentModel.findOne(filterQuery)
    }

    async find( userFilterQuery: FilterQuery<Appointment>): Promise<Appointment[]> {
        return this.appointmentModel.find(userFilterQuery)
    }

    async create(appointment: Appointment): Promise<Appointment> {
        const newAppointment = new this.appointmentModel(appointment);
        return newAppointment.save()
    }

    async findOneAndUpdate(query: FilterQuery<Appointment>, appointment: Partial<Appointment>) {
        return this.appointmentModel.findOneAndUpdate(query, appointment);
    }

}