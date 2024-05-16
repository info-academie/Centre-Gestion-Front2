import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { Bilan } from 'app/models/Bilan';
import { BilanService } from 'app/services/bilan.service';

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule, MatModule,
        MatFormFieldModule,

    ],
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditBilanComponent {
    id: any = 0;
    myForm: FormGroup;
    bilan: Bilan = new Bilan(); // Initialize the user object
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
        'décembre'
    ];
    date: any;
    choosenClient: any = '';
    choosenClass: any = '';
    response: any;
    constructor(
        private bilanService: BilanService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow: UowService

    ) { }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.uow.bilans.getOne1(this.id).subscribe((e: any) => {
            this.bilan = e.bilan;
            this.response = e
            this.date = new Date(e.year, this.getMonthNumber(e.month), e.day);
            this.createForm(); // Create the form after the user data is available
        })

    }
    getMonthNumber(monthName: string): number {
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        return months.indexOf(monthName);
    }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.bilan.id],
            year: [this.bilan.year, [Validators.minLength(3), Validators.required]],
            month: [this.bilan.month, [Validators.minLength(3), Validators.required]],
            date: [this.bilan.date, Validators.required],

        });
    }
    delete() {
        this.uow.bilans.delete(this.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/bilans']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/bilans']);
    }
    any(e) {
        console.log(e)
    }

    update() {
        console.log(this.myForm.value)

        console.log(this.myForm.value)
        this.uow.bilans.put(this.id, this.myForm.value).subscribe((res) => {
            console.log(res)
            this.router.navigate(['/admin/bilans']);

        })
    }

}
