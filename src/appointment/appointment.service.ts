import { CalendarRepository } from './../calendar/calendar.repository';
import { CalendarService } from './../calendar/calendar.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Day, Status } from 'src/dto/appointment.dto';
import { v4 as uuidv4 } from 'uuid';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from '../schema/appointment.schema';
import { Time } from 'src/common/utility/time';
import { Responses } from 'src/common/utility/response';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appoRepo: AppointmentRepository,
    @Inject(forwardRef(() => CalendarService))
    private readonly calendarService: CalendarService,
    @Inject(forwardRef(() => CalendarRepository))
    private readonly calendarRepository: CalendarRepository,
  ) {}
  async getAppointmentById(appId: string): Promise<Appointment> {
    return this.appoRepo.findOne({ appId });
  }

  async findByDay(day: Day): Promise<Appointment[]> {
    return this.appoRepo.find({ day });
  }

  async createAppointment(
    day: Day,
    purpose: string,
    date: string,
    timeSlot: string,
    name: string,
    email: string,
  ) {
    try {
      const isoDate = Time.convertToISO(date);
      const checkDay = Time.dayCheck(date);
      if (checkDay === 6 || checkDay === 7) {
        throw Responses.rejectBadRequest({
          message:
            'Oops, shop is closed on weekends. Please select any other day',
        });
      }
      const today = Time.getCurrentIso();
      const daysCompared = Time.getNumberOfDays(today, isoDate);
      if (daysCompared <= 2) {
        throw Responses.rejectBadRequest({
          message:
            'Oops, you must choose a date at least two days after the current date',
        });
      }

      await this.calendarRepository
        .findOne({
          date,
        })
        .then(async (calendar) => {
          const timeDate = calendar.slots.find((t) => t.time === timeSlot);
          if (timeDate.availability === 0) {
            throw Responses.rejectBadRequest({
              message:
                'Oops, there are no available time slots for this date and time. Please select a different time',
            });
          }
          await this.appoRepo
            .create({
              appId: uuidv4(),
              day,
              purpose,
              date: isoDate,
              status: Status.PENDING,
              name,
              email,
            })
            .then(async (app) => {
              await this.calendarService.updateCalendar(date, timeSlot, -1);
            })
            .catch((error) => {
              throw Responses.rejectInternalServer(error);
            });
        })
        .catch((error) => {
          throw Responses.rejectInternalServer(error);
        });
    } catch (error) {
      throw Responses.rejectInternalServer(error);
    }
  }

  async completeAppointment(appId: string, status: Status) {
    return this.appoRepo.findOneAndUpdate({ appId }, { status });
  }
}
