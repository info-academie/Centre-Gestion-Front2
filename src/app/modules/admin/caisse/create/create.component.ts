import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Caisse } from 'app/models/Caisse';
import { CaisseService } from 'app/services/caisse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,
    MatFormFieldModule],

  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCaisseComponent {
    result: any
    isResult: boolean = false
    id: any = 0;
    isProf: boolean = false;
    myForm: FormGroup;

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

    Caisse: Caisse = new Caisse(); // Initialize the user object
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    constructor(
        private CaisseService: CaisseService,
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
            id: [this.Caisse.id],
            year: [this.Caisse.year, [Validators.minLength(3), Validators.required]],
            month: [this.Caisse.month, [Validators.minLength(3), Validators.required]],
            montant: [this.Caisse.montant, Validators.required],

        });
    }
    toggleEditMode() {
        this.router.navigate(['/admin/caisses']);

    }

    openErrorPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '350px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });


    }
    submit(caisse) {

        console.log(caisse)
        this.uow.caisses.post(caisse).subscribe((res: any) => {
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
