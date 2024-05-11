import { filter } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Class } from 'app/models/Class';
import { User } from 'app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.module';
import { ChangeDetectorRef } from '@angular/core';
import { EmploiComponent } from '../emploi/emploi.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,EmploiComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditClassComponent {
    @ViewChild('emploiComponent') emploiComponent: EmploiComponent;

    emploi:any;
    id: any = 0;
    myForm: FormGroup;
    class: Class = new Class(); // Initialize the user object
    profSelected:number=0;
    profs: User[] = []
    selectedType='';
    selectedSpecialite='';

    specialityArray:any=[]

    types=['Soutien scolaire','Langue'];
    specialites=[
        {id:1,choix:['Primaire','College','Lycee']},
        {id:2,choix:['Anglais','Francais','Autre']},
    ];
    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder
      , private router: Router,
    public  uow:UowService,
    private cdr: ChangeDetectorRef

    ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.uow.users.getAll().subscribe((res:any) => {
        this.profs=res.filter(e=>e.idRole===1);
    });
    this.uow.classes.getOne(this.id).subscribe((res:any) => {
        this.class = res; // Update the user object with the fetched data
        this.profSelected=res.idUser;
        this.selectedType=res.type;

        this.selectedSpecialite=res.specialite

        this.selectedType==="Soutien scolaire"?
        this.specialityArray=this.specialites[0]:
        this.specialityArray=this.specialites[1];
        // this.specialityArray.push(this.specialites.find(obj => obj.choix.includes(this.selectedSpecialite)));

        this.createForm(); // Create the form after the user data is available
        this.cdr.detectChanges();
        console.log("=========")
        console.log(this.class)
      });
    }

    choosenType(type){
        type==="Soutien scolaire"?
 this.specialityArray=this.specialites[0]:
 this.specialityArray=this.specialites[1];

    }
    createForm() {
      this.myForm = this.fb.group({
        id: [this.class.id],
        nom: [this.class.nom, [Validators.minLength(3),Validators.required]],
        studentsCount: [this.class.studentsCount,[ Validators.minLength(3),Validators.required]],
        type: [this.class.type, Validators.required],
        specialite: [this.class.specialite,Validators.required],
        salle: [this.class.salle,Validators.required],
        idUser: [this.class.idUser,Validators.required],
        emploi: [this.class.emploi,Validators.required],
      });
    }
    delete(){
      this.uow.classes.delete(this.id).subscribe((e) => {

          e ?
          this.router.navigate(['/admin/classes'])  : console.error("Error while deleting ")
        })
    }
    toggleEditMode(){
              this.router.navigate(['/admin/classes']);
          }

    update(user){
        this.emploi = this.emploiComponent.sendSchedule();
        console.log(this.emploiComponent)
         // Call the method on the child component
        let schedule = JSON.stringify(this.emploi)
        user.emploi = schedule
      this.uow.classes.put(this.id,user).subscribe((res)=>{
          if(res.m==="success"){
              this.router.navigate(['/admin/classes']);

          }
      })
    }

}
