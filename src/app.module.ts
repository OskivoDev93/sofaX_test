import { AppointmentModule } from './appointment/appointment.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { CalendarModule } from './calendar/calendar.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Oskivo:tryme-pygmy@cluster0.gvi30.mongodb.net/test'),
    UserModule,
    AppointmentModule,
    CalendarModule
    ],
})
export class AppModule {}
