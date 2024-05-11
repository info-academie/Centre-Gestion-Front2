import { Client } from 'app/models/Client';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { PaymentService } from 'app/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { Payment } from 'app/models/Payment';
import { MatModule } from 'app/mat.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,
      MatFormFieldModule],

  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePaymentComponent {
    id: any = 0;
    myForm: FormGroup;
    payment: Payment = new Payment(); // Initialize the user object
    allClasses=[];
    allClients=[];
    date:any;
    constructor(
        private paymentService: PaymentService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {

        this.id = this.route.snapshot.paramMap.get('id');
        this.createForm(); // Create the form after the user data is available
        this.paymentService.getInputs().subscribe((res)=>{
            // console.log(e)
            this.allClasses=res.classes
            this.allClients=res.clients
        })

    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.payment.id],
            year: [this.payment.year, Validators.required],
            day:[this.payment.day,Validators.required],
            month: [this.payment.month, Validators.required],
            idClass: [this.payment.idClass, Validators.required],
            idClient: [this.payment.idClient, Validators.required],
            montant: [this.payment.montant, Validators.required],
        });
    }
    delete() {
        this.uow.payments.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/payments']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/payments']);
    }
    any(e){
        console.log(e)
    }

    submit() {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        this.uow.payments.post(this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/payments']);

        })
    }
}
