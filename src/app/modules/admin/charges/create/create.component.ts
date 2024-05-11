import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Charge } from 'app/models/Charge';
import { ChargeService } from 'app/services/charge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,
    MatFormFieldModule],
      templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateChargeComponent {

    id: any = 0;
    myForm: FormGroup;
    Charge: Charge = new Charge(); // Initialize the user object

    date:any;
    constructor(
        private ChargeService: ChargeService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {

        this.id = this.route.snapshot.paramMap.get('id');
        this.createForm(); // Create the form after the user data is available


    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.Charge.id],
            year: [this.Charge.year, Validators.required],
            day:[this.Charge.day,Validators.required],
            month: [this.Charge.month, Validators.required],
            designation: [this.Charge.designation, Validators.required],
            montant: [this.Charge.montant, Validators.required],
        });
    }
    delete() {
        this.uow.charges.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/charges']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/charges']);
    }
    any(e){
        console.log(e)
    }

    submit() {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        this.uow.charges.post(this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/charges']);

        })
    }
}
