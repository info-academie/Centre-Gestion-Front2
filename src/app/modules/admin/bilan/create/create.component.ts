import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bilan } from 'app/models/Bilan';
import { BilanService } from 'app/services/bilan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.module';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],



    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateBilanComponent {
    result: any
    isResult: boolean = false
    id: any = 0;
    isProf: boolean = false;
    myForm: FormGroup;

    year:number
    month:string

    // classes: Class[] = []
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

    bilan: Bilan = new Bilan(); // Initialize the user object
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    constructor(
        private BilanService: BilanService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private uow: UowService,
        private dialog: MatDialog

    ) { }

    ngOnInit(): void {

        this.createForm(); // Create the form after the user data is available

    }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.bilan.id],
            year: [this.bilan.year, [Validators.minLength(3), Validators.required]],
            month: [this.bilan.month, [Validators.minLength(3), Validators.required]],
            date: [this.bilan.date, Validators.required],

        });
    }
    toggleEditMode() {
        this.router.navigate(['/admin/bilans']);

    }

    openErrorPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '350px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });


    }
    submit(bilan) {
        var bilanDate = new Date();
        // Extracting date part
        var dateOnly = new Date(bilanDate.getFullYear(),
            bilanDate.getMonth(),
            bilanDate.getDate());

        bilan.date = dateOnly;
        console.log(bilan)
        this.uow.bilans.post(bilan).subscribe((res: any) => {
            this.isResult = true
            this.result = res
            console.log(res)
            if (res.msg === "exist") {
                this.isResult=false;
                this.openErrorPoppup()
            }

            // if(res.m==="success"){
            //     // this.router.navigate(['/admin/bilans']);

            // }
        })
    }

}
