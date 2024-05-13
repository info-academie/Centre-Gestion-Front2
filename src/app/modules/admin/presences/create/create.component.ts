import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UowService } from 'app/services/uow.service';
import { Client } from 'app/models/Client';
import { MatModule } from 'app/mat.module';
import { Class } from 'app/models/Class';
import { Presence } from 'app/models/Presence';
import { User } from 'app/models/User';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreatePresenceComponent {
    id: any = 0;
    isProf: boolean = false;
    myForm: FormGroup;
    classes: Class[] = [];
    profs: User[] = [];
    currentDate: Date;
    presence: Presence = new Presence(); // Initialize the user object
    listOfSudents: Client[];
    presenceArray: any[] = [];
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private uow: UowService
    ) {}
    months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
    ];
    isGenerated: boolean = false;
    columns: number[] = [];
    getTotalChecked(col){
    }

    addColumn() {
        const newColumnName = this.columns.length;
        this.columns.push(newColumnName); // for date
        this.presenceArray.push({ date: null, presentStudents: [] });
    }
    calculateTotal(colIndex: any): number {
      /*  let total = 0;
        for (const student of this.listOfSudents) {
          const presenceObj = this.presenceArray[colIndex];
          if (presenceObj && presenceObj.presentStudents.includes(student.id)) {
            total++;
          }
        }
        return total;*/
        return colIndex.presentStudents.length
      }
      
    ngOnInit(): void {
        this.uow.presences.getInputsData().subscribe((res: any) => {
            this.classes = res.classes;
            this.profs = res.profs;
        });
        this.createForm(); // Create the form after the user data is available
    }
    generateListPresence() {
        console.log(this.myForm.get('idClass').value);
        this.uow.presences
            .getStudentsOfClass(this.myForm.get('idClass').value)
            .subscribe((res) => {
                console.log(res);
                this.listOfSudents = res.students;
            });
        this.isGenerated = true;
    }

    registerPresence(
        data: any,
        studentId: any,
        colIndex: number,
        type: string
    ) {

        console.log(this.presenceArray);

        const presenceObj = this.presenceArray[colIndex];
        if (type === 'presence') {
            if (data) {
                presenceObj.presentStudents.push(studentId);
            } else {
                const studentIndex =
                    presenceObj.presentStudents.indexOf(studentId);
                if (studentIndex !== -1) {
                    presenceObj.presentStudents.splice(studentIndex, 1);
                }
            }
        } else {
            // here i wznt to make changes on the date attribute
            if (data) {
                presenceObj.date = data;
            } else {
                if (presenceObj.date !== null) {
                    presenceObj.date = data;
                }
            }
        }
        this.calculTotal(presenceObj)
   
    }
    calculTotal(object){
return object.presentStudents.length;
    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.presence.id],
            year: [
                this.presence.year,
                [Validators.minLength(3), Validators.required],
            ],
            month: [
                this.presence.month,
                [Validators.minLength(3), Validators.required],
            ],
            idClass: [this.presence.idClass, Validators.required],
            idUser: [this.presence.idUser, Validators.required],
            presences: [this.presence.presences],
        });
    }
    toggleEditMode() {
        this.router.navigate(['/admin/presences']);
    }
    idClassValue(e) {
        this.myForm.get('idClass').setValue(e);
    }

    submit(Presence) {
        const jsonString = JSON.stringify(this.presenceArray);
        this.myForm.get('presences').setValue(jsonString);
        Presence.presences=jsonString

      this.uow.presences.post(Presence).subscribe((res: any) => {
            console.log(res);
            if (res.m === 'success') {
                this.router.navigate(['/admin/presences']);
            }
        });
    }
}
