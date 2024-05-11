import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatModule } from 'app/mat.module';
import { Payment } from 'app/models/Payment';
import { PaymentService } from 'app/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,
    MatFormFieldModule,

],  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPaymentComponent {
    id: any = 0;
    myForm: FormGroup;
    payment: Payment = new Payment(); // Initialize the user object
    allClasses=[];
    allClients=[];
    date:any;
    choosenClient:any='';
    choosenClass:any='';

    constructor(
        private paymentService: PaymentService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {

        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.paymentService.getOne(this.id).subscribe((e:any)=>{
            this.payment=e
            this.choosenClass=e.idClass;
            this.choosenClient=e.idClient;
            this.date = new Date(e.year, this.getMonthNumber(e.month), e.day);
            this.paymentService.getInputs().subscribe((res)=>{
                // console.log(e)
                this.allClasses=res.classes
                this.allClients=res.clients
            })
        this.createForm(); // Create the form after the user data is available


        })


    }
    getMonthNumber(monthName: string): number {
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        return months.indexOf(monthName);
      }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.id],
            year: [this.payment.year, Validators.required],
            day:[this.payment.day,Validators.required],
            month: [this.payment.month, Validators.required],
            idClass: [this.payment.idClass, Validators.required],
            idClient: [this.payment.idClient, Validators.required],
            montant: [this.payment.montant],
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

    update(payment: Payment) {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        console.log(this.myForm.value)
        this.uow.payments.put(this.id,this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/payments']);

        })
    }
}
