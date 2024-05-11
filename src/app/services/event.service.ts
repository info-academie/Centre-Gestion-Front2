import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    private startDate: string;
    private endDate: string;

    setDates(startDate: string, endDate: string) {
        this.startDate = startDate;
        this.endDate = endDate;
      }
    getStartDate(): string {
        return this.startDate;
      }

    getEndDate(): string {
        return this.endDate;
      }
}
