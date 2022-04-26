import { Injectable } from "@nestjs/common";
import { CalendarRepository } from "./calendar.repository";

@Injectable()
export class CalendarService{
    constructor(private readonly CalendarRepo: CalendarRepository) {}

    async createCalender(date:string) {
        return this.CalendarRepo.create({
            date,
            slots: [
                {
                    availability: 2,
                    time: '0900'
                },
                {
                    availability: 2,
                    time: '1100'
                },
                {
                    availability: 2,
                    time: '1400'
                },
                {
                    availability: 2,
                    time: '1600'
                },
            ]
        })
    }

 async updateCalendar(date: string, timeSlot: string, availability: number) {
     await this.CalendarRepo.findOne({
         date
     }).then(async (calendar) => {
         let timeEl, timeIndex;
         const calSlots = calendar.slots
         calSlots.forEach((time, index) => {
             if(time.time === timeSlot) {
                 index = timeIndex;
                 timeEl = time
             }
         })
         calSlots[timeIndex] = {
             ...timeEl,
             availability: timeEl.availability + availability
         }
         return this.CalendarRepo.updateCalendar({date}, {slots: calSlots})
     })
 }
}