import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCalendarDto } from "src/schema/calendar.schema";
import { CalendarService } from "./calendar.service";

@Controller('Calendars')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}
    
    
    @Post()
    async createCalendar(@Body() {date}: CreateCalendarDto) {
        return this.calendarService.createCalender(
            date
        )
    }
}