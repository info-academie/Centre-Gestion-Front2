import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { Caisse } from 'app/models/Caisse';
import { CaisseService } from 'app/services/caisse.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule, MatModule,
   MatFormFieldModule,

],  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditCaisseComponent {
    id: any = 0;
    myForm: FormGroup;
    caisse: Caisse = new Caisse(); // Initialize the user object

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
    date:any;
    choosenClient:any='';
    choosenClass:any='';
response:any;
    constructor(
        private caisseService: CaisseService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.uow.caisses.getOne1(this.id).subscribe((e:any)=>{
            this.caisse=e.caisse;

            this.response=e
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
            id: [this.caisse.id],
            year: [this.caisse.year, [Validators.minLength(3), Validators.required]],
            month: [this.caisse.month, [Validators.minLength(3), Validators.required]],
            montant: [this.caisse.montant, Validators.required],

        });
    }
    delete() {
        this.uow.bilans.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/caisses']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/caisses']);
    }
    any(e){
        console.log(e)
    }

    update(caisse) {
        // var bilanDate = new Date();
        // // Extracting date part
        // var dateOnly = new Date(bilanDate.getFullYear(),
        //  bilanDate.getMonth(),
        //   bilanDate.getDate());

        // this.myForm.get('day').setValue((this.date.getDate()).toString())
        // this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        // this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        this.uow.caisses.put(this.id,caisse).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/caisses']);

        })
    }

}
