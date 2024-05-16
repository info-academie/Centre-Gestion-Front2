import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UowService } from 'app/services/uow.service';
import { Client } from 'app/models/Client';
import { MatModule } from 'app/mat.module';
import { Class } from 'app/models/Class';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateClientComponent {

    id: any = 0;
    isProf:boolean=false;
    myForm: FormGroup;
    classes: Class[] = []
    client: Client = new Client(); // Initialize the user object

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
       private uow:UowService

    ) { }

    ngOnInit(): void {
        this.uow.classes.getAll().subscribe((res:any) => {
              this.classes=res;
        });
        this.createForm(); // Create the form after the user data is available

    }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.client.id],
            nom: [this.client.nom, [Validators.minLength(3),Validators.required]],
            prenom: [this.client.prenom,[ Validators.minLength(3),Validators.required]],
            telephone: [this.client.telephone, Validators.required],
            idClass: this.client.idClass,

        });
    }
    toggleEditMode(){
        this.router.navigate(['/admin/clients']);

    }
    idClassValue(e){
        this.myForm.get('idClass').setValue(e);
    }

    submit(Client){
     this.uow.clients.post(Client).subscribe((res:any)=>{
        console.log(res)

        if(res.message==="Success"){
            this.router.navigate(['/admin/clients']);

        }
     })
    }

}
