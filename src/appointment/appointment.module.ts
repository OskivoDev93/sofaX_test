import { CalendarSchema } from './../schema/calendar.schema';
import { CalendarRepository } from './../calendar/calendar.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Appointment, AppointmentSchema } from '../schema/appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointment.repository';
import { CalendarService } from 'src/calendar/calendar.service';
import { Calendar } from 'src/schema/calendar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Calendar.name, schema: CalendarSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    AppointmentRepository,
    CalendarService,
    CalendarRepository,
  ],
})
export class AppointmentModule {}
