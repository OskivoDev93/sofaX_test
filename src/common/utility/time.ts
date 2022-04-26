import moment from "moment";


export class Time {

    static convertToISO(date:string) {
        const isoDate = moment(date, "YYYY-MM-DD")
        return isoDate.format()
    }

    static dayCheck (date: string) {
        const isoDate = moment(date);
        return isoDate.isoWeekday();
    }

    static getCurrentIso() {
        return moment().toISOString();
    }

    static getNumberOfDays(currentDate, dateApplied){
        var d1 = Date.parse(currentDate)
        var d2 = Date.parse(dateApplied);
        return (d2-d1)/(1000*3600*24);
      }
}