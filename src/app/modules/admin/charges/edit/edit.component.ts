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
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,
     ReactiveFormsModule, MatModule,
    MatFormFieldModule,

],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditChargeComponent {
    id: any = 0;
    myForm: FormGroup;
    Charge: Charge = new Charge(); // Initialize the user object

    date:any;
    choosenClient:any='';
    choosenClass:any='';

    constructor(
        private chargeService: ChargeService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.chargeService.getOne(this.id).subscribe((e:any)=>{
            this.Charge=e
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

    update() {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        console.log(this.myForm.value)
        this.uow.charges.put(this.id,this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/charges']);

        })
    }
}
