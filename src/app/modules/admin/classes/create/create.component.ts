import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Class } from 'app/models/Class';
import { MatModule } from 'app/mat.module';
import { User } from 'app/models/User';
import { EmploiComponent } from "../emploi/emploi.component";

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule, EmploiComponent]
})
export class CreateClassComponent {
    @ViewChild('emploiComponent') emploiComponent: EmploiComponent;

    isProf: boolean = false;
    myForm: FormGroup;
    classes: Class[] = []
    class: Class = new Class();
    profs: User[] = []
    emploi: any;
    types = ['Soutien scolaire', 'Langue'];
    specialites = [
        { id: 1, choix: ['Primaire', 'College', 'Lycee'] },
        { id: 2, choix: ['Anglais', 'Francais', 'Autre'] },
    ];
    specialityArray: any = []

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private uow: UowService

    ) { }

    ngOnInit(): void {
        this.uow.users.getAll().subscribe((res: any) => {
            this.profs = res.filter(e => e.idRole === 1);
        });
        this.createForm(); // Create the form after the user data is available

    }

    choosenType(type) {
        type === "Soutien scolaire" ?
            this.specialityArray = this.specialites[0] :
            this.specialityArray = this.specialites[1];

    }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.class.id],
            nom: [this.class.nom, [Validators.minLength(3), Validators.required]],
            studentsCount: [this.class.studentsCount, [Validators.minLength(3), Validators.required]],
            type: [this.class.type, Validators.required],
            Specialite: [this.class.specialite, Validators.required],
            salle: [this.class.salle, Validators.required],
            IdUser: [this.class.idUser, Validators.required],
            emploi: [this.class.emploi, Validators.required],

        });
    }
    toggleEditMode() {
        this.router.navigate(['/admin/clients']);

    }
    idClassValue(e) {
        this.myForm.get('idClass').setValue(e);
    }

    submit(classModel) {
        this.emploi = this.emploiComponent.sendSchedule();
        console.log(this.emploiComponent)
         // Call the method on the child component
        let schedule = JSON.stringify(this.emploi)
        classModel.emploi = schedule

        this.uow.classes.post(classModel).subscribe((res: any) => {
            console.log(res)
            if (res.m === "success") {
                this.router.navigate(['/admin/classes']);

            }
        })
    }
}
