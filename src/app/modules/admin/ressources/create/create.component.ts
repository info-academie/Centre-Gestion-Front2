import { RessourceService } from './../../../../services/ressource.service';
import { Ressource } from './../../../../models/Ressource';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { MatFormFieldModule } from '@angular/material/form-field';
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
export class CreateResssourceComponent {
    id: any = 0;
    myForm: FormGroup;
    Ressource: Ressource = new Ressource(); // Initialize the user object
    allClasses=[];
    allClients=[];
    date:any;
    constructor(
        private RessourceService: RessourceService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {

        this.id = this.route.snapshot.paramMap.get('id');
        this.createForm(); // Create the form after the user data is available
        this.RessourceService.getInputs().subscribe((res)=>{
            // console.log(e)
            this.allClasses=res.classes
            this.allClients=res.clients
        })

    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.Ressource.id],
            year: [this.Ressource.year, Validators.required],
            day:[this.Ressource.day,Validators.required],
            month: [this.Ressource.month, Validators.required],
            idClass: [this.Ressource.idClass, Validators.required],
            idClient: [this.Ressource.idClient, Validators.required],
            montant: [this.Ressource.montant, Validators.required],
        });
    }
    delete() {
        this.uow.payments.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/payments']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/ressources']);
    }
    any(e){
        console.log(e)
    }

    submit() {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        this.uow.ressources.post(this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/ressources']);

        })
    }
}
