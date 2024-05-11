import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'app/models/Client';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.module';
import { Class } from 'app/models/Class';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditClientComponent {
    id: any = 0;
    myForm: FormGroup;
    client: Client = new Client(); // Initialize the user object
    classSelected:number=0;
    classes: Class[] = []



    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder
      , private router: Router,
    public  uow:UowService

    ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.uow.classes.getAll().subscribe((res:any) => {
        this.classes=res;
       });
      this.uow.clients.getOne(this.id).subscribe((res) => {
        this.client = res; // Update the user object with the fetched data
        this.classSelected=res.idClass;
        this.createForm(); // Create the form after the user data is available
      });
    }
    idClassValue(e){
        this.myForm.get('idClass').setValue(e);
    }
    createForm() {
      this.myForm = this.fb.group({
        id: [this.client.id],
        nom: [this.client.nom, [Validators.minLength(3),Validators.required]],
        prenom: [this.client.prenom,[ Validators.minLength(3),Validators.required]],
        telephone: [this.client.telephone, Validators.required],
        idClass: [this.client.idClass]
      });
    }
    delete(){
      this.uow.clients.delete(this.id).subscribe((e) => {

          e ?
          this.router.navigate(['/admin/clients'])  : console.error("Error while deleting ")
        })
    }
    toggleEditMode(){
              this.router.navigate(['/admin/clients']);
          }

    update(user){
      this.uow.clients.put(this.id,user).subscribe((res)=>{
          if(res.m==="success"){
              this.router.navigate(['/admin/clients']);

          }
      })
    }


}
