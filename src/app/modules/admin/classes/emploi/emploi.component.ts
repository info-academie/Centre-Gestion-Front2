import {
    Component, ViewChild, AfterViewInit, ChangeDetectionStrategy,
    inject, signal, ChangeDetectorRef, TemplateRef, Input
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';

// import { INITIAL_EVENTS, createEventId } from './event-utils';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';

import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';

// import { UowService } from 'app/core/http-services/uow.service';
import { BehaviorSubject, Observable, Subject, filter, map, switchMap, tap } from 'rxjs';

// import { EventService } from './event.service.ts.service';
// import { Intervention } from 'app/core/api/core/models';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { EventService } from 'app/services/event.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventImpl } from '@fullcalendar/core/internal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, NgModel } from '@angular/forms';

export interface CalendarEvent {
    id: string;
    // title: string;
    // description: string;
    start: string | null;
    end: string | null;
}

@Component({
    selector: 'app-emploi',
    standalone: true,
    imports: [CommonModule,
        MatSnackBarModule,
        FullCalendarModule,
        MatButtonModule, MatIconModule,
        MatPaginatorModule,
        MatMenuModule, MatDividerModule, NgApexchartsModule,
        MatTableModule, MatSortModule, NgClass,
        RouterModule,
        FormsModule,
        MatProgressBarModule, CurrencyPipe, DatePipe

    ],
    templateUrl: './emploi.component.html',
    styleUrls: ['./emploi.component.scss']
})
export class EmploiComponent {

    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    @ViewChild('popupTemplate1') popupTemplate1!: TemplateRef<any>;
    @ViewChild('ModifyOrDelete') ModifyOrDelete!: TemplateRef<any>;
    @Input() scheduleData:any;
    eventToBeDeleted: any
    myEvents = new Subject();
    @ViewChild(FullCalendarComponent) fullcalendar: FullCalendarComponent;
    selectedRanges = new BehaviorSubject<any[]>([]); // Or use NgRx
    routePath: any;
    emploiId: any = 0
    titleOfHour: string
    constructor(public uow: UowService, private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute) { }
        ngOnInit() {
            this.route.paramMap.subscribe(params => {
              const id = params.get('id');
            //   this.routePath = `class/${id}`; // Build the complete path
            //   console.log(this.routePath);

              // Apply your logic based on the route
              if (id) { // Check for specific value
                console.log("Heloo", this.scheduleData);
                let emploi=JSON.parse(this.scheduleData)
                this.selectedRanges.next(emploi);
              } else {
                // Creation Mode
              }
            });
          }

    view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listYear' = 'timeGridWeek';


    calendarOptions: CalendarOptions = {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
          headerToolbar: {
            left: '',
            center: '',
            right: ''
          },
        initialView: this.view,
        weekends: true,
        locale: 'fr', // Set locale to 'fr' for French

        editable: true,
        selectable: true,
        selectMirror: true, // Optional
        dayMaxEvents: true,
        select: this.handleSelection.bind(this),
        eventChange: this.eventChange.bind(this),
        eventClick: this.eventClick.bind(this),



    };


    handleSelection(e: EventImpl | any) {
        e.id = (this.selectedRanges.getValue().length + 1).toString()

        this.selectedRanges.next([...this.selectedRanges.getValue(), e]);
    }

    eventChange(ev) {
        // change the event
        this.selectedRanges.getValue().filter(e => +e.id === +ev.event.id).forEach(e => {
            e.start = ev.event.start
            e.end = ev.event.end
            e.title = this.titleOfHour
        });

        this.selectedRanges.next([...this.selectedRanges.getValue()]);
        console.log(this.selectedRanges.value)
    }

    eventClick(arg) {
        this.cdr.detectChanges();

        this.eventToBeDeleted = arg;
        this.ModifyOrDelete1();
    }
    ModifyOrDelete1(): void {
        const dialogRef = this.dialog.open(this.ModifyOrDelete, {
            height: '350px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) { // User confirmed deletion
                this.delete();
            }
        });


    }

    openDialog(): void {
        this.dialog.closeAll()
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '250px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) { // User confirmed deletion
                this.delete();
            }
        });


    }

    openDialog2(): void {
        this.dialog.closeAll(); // Close the dialog

        const dialogRef = this.dialog.open(this.popupTemplate1, {
            height: '350px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });

    }
    delete() {
        const updatedEvents = this.selectedRanges.value.filter(
            (event) => event.id !== this.eventToBeDeleted.event.id
        );
        this.selectedRanges.next(updatedEvents); // Emit the updated events
        this.dialog.closeAll(); // Close the dialog
    }

    submit() {
        console.log(this.eventToBeDeleted.event.id, this.titleOfHour)
        this.selectedRanges.getValue().filter(e => +e.id === +this.eventToBeDeleted.event.id).forEach(e => {
            e.start = this.eventToBeDeleted.event.start
            e.end = this.eventToBeDeleted.event.end
            e.title = this.titleOfHour
        });

        this.selectedRanges.next([...this.selectedRanges.getValue()]);
        console.log(this.selectedRanges.value)
        this.titleOfHour = ''
        this.dialog.closeAll()

    }

    sendSchedule() {
        return this.selectedRanges.value
    }

}
