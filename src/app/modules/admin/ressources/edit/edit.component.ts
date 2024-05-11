import { Ressource } from './../../../../models/Ressource';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RessourceService } from 'app/services/ressource.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,
    MatFormFieldModule,

] , templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditRessourceComponent {
    id: any = 0;
    myForm: FormGroup;
    ressource: Ressource = new Ressource(); // Initialize the user object
    allClasses=[];
    allClients=[];
    date:any;
    choosenClient:any='';
    choosenClass:any='';

    constructor(
        private ressourceService: RessourceService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        public uow:UowService

    ) { }

    ngOnInit(): void {

        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.ressourceService.getOne(this.id).subscribe((e:any)=>{
            this.ressource=e
            this.choosenClass=e.idClass;
            this.choosenClient=e.idClient;
            this.date = new Date(e.year, this.getMonthNumber(e.month), e.day);
            this.createForm(); // Create the form after the user data is available

        })
        this.ressourceService.getInputs().subscribe((res)=>{
            // console.log(e)
            this.allClasses=res.classes
            this.allClients=res.clients
        })


    }
    getMonthNumber(monthName: string): number {
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        return months.indexOf(monthName);
      }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.id],
            year: [this.ressource.year, Validators.required],
            day:[this.ressource.day,Validators.required],
            month: [this.ressource.month, Validators.required],
            idClass: [this.ressource.idClass, Validators.required],
            idClient: [this.ressource.idClient, Validators.required],
            montant: [this.ressource.montant],
        });
    }
    delete() {
        this.uow.ressources.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/ressources']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/ressources']);
    }
    any(e){
        console.log(e)
    }

    update(ressource: Ressource) {
        this.myForm.get('day').setValue((this.date.getDate()).toString())
        this.myForm.get('month').setValue(this.date.toLocaleString('fr-FR', { month: 'long' }))
        this.myForm.get('year').setValue((this.date.getFullYear()).toString())
        console.log(this.myForm.value)
        this.uow.ressources.put(this.id,this.myForm.value).subscribe((res) => {
            console.log(res)
                  this.router.navigate(['/admin/ressources']);

        })
    }
}
