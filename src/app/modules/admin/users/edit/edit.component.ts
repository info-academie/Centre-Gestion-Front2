import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatModule } from 'app/mat.module';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { Role } from 'app/models/Role';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent {
    id: any = 0;
    myForm: FormGroup;
    user: User = new User(); // Initialize the user object
    roles: Role[] = []
    isProf:boolean=false;
    commingPwd='';

    constructor(
      private uow: UowService,
      private route: ActivatedRoute,
      private fb: FormBuilder
      , private router: Router,

    ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.uow.roles.getAll().subscribe((res:any) => {
        this.roles = res;
    })
      this.uow.users.getOne(this.id).subscribe((res) => {
        this.user = res; // Update the user object with the fetched data
        console.log(this.user);
        this.createForm(); // Create the form after the user data is available
        this.user.idRole===3?this.isProf=true:this.isProf=false;

        console.log("second")
      });

      console.log("first")
    //   if matiere Input gonna be displayed or not
    }

    createForm() {
      this.myForm = this.fb.group({
        id: [this.user.id],
        nom: [this.user.nom, Validators.minLength(3)],
        prenom: [this.user.prenom, Validators.minLength(3)],
        email: [this.user.email, Validators.email],
        address: [this.user.address, Validators.minLength(3)],
        telephone: [this.user.telephone, Validators.pattern('^0(6|7)[0-9]{8}$')],
        matiere: [this.user.matiere, Validators.minLength(3)],
        password: '',
        idRole: [this.user.idRole],
      });
    }
    delete(){
      this.uow.users.delete(this.id).subscribe((e) => {
          e ?
          this.router.navigate(['/admin/users'])  : console.error("Error while deleting ")
        })
    }
    choosenRole(id: number) {
        // const selectedRoleId = this.myForm.get('idRole').value;
        id===3?
        this.isProf=true:
        this.isProf=false;

        console.log('Selected role ID:', id,this.isProf);

        // Further actions with the selectedRoleId
    }
    toggleEditMode(){
              this.router.navigate(['/admin/users']);
          }

    update(user){
        if (user.password==='') {
            user.password=this.commingPwd
        }
      this.uow.users.put(this.id,user).subscribe((res)=>{
          if(res.m==="success"){
              this.router.navigate(['/admin/users']);

          }
      })
    }

}
