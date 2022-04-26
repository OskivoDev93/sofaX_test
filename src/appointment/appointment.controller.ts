import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentDto, Day } from 'src/dto/appointment.dto';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../schema/appointment.schema';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appoService: AppointmentService) {}

  @Get(':appId')
  async getAppointment(@Param('appId') appId: string): Promise<Appointment> {
    return this.appoService.getAppointmentById(appId);
  }

  @Get(':day')
  async getAppointmentsOfDay(@Param(':day') day: Day) {
    return this.appoService.findByDay(day);
  }

  @Post()
  async createAppointment(
    @Body() { day, purpose, date, timeSlot, name, email }: CreateAppointmentDto,
  ) {
    return this.appoService.createAppointment(
      day,
      purpose,
      date,
      timeSlot,
      name,
      email,
    );
  }
}
