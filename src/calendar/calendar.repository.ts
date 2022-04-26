import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Calendar, CalendarDocument, UpdateCalendarDto } from "src/schema/calendar.schema";
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class CalendarRepository{
    constructor(@InjectModel(Calendar.name) private calendarModel: Model<CalendarDocument>) {}
    async findOne( typeFilterQuery: FilterQuery<Calendar>): Promise<Calendar> {
        return this.calendarModel.findOne(typeFilterQuery)
    }

    async create(calendar: Calendar): Promise<Calendar> {
        const newCalendar = new this.calendarModel(calendar);
        return newCalendar.save()
    }

    async updateCalendar(query: FilterQuery<Calendar>, calendar: Partial<Calendar>) {
        return this.calendarModel.findOneAndUpdate(query, calendar )
    }
}