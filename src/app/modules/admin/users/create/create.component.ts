import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { MatModule } from 'app/mat.module';
import { RoleService } from 'app/services/role.service';
import { Role } from 'app/models/Role';
import { UowService } from 'app/services/uow.service';
@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateUserComponent {
    id: any = 0;
    isProf:boolean=false;
    myForm: FormGroup;
    roles: Role[] = []
    user: User = new User(); // Initialize the user object

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
       private uow:UowService

    ) { }

    ngOnInit(): void {
        this.uow.roles.getAll().subscribe((res:any) => {
            this.roles = res;
        })
        this.createForm(); // Create the form after the user data is available

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
            idRole: this.user.idRole,
        });
    }
    choosenRole(id: number) {
        // const selectedRoleId = this.myForm.get('idRole').value;
        id===1?
        this.isProf=true:
        this.isProf=false;

        console.log('Selected role ID:', id,this.isProf);

        // Further actions with the selectedRoleId
    }

    delete() {
        this.userService.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/profs']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    submit(user: User) {
        this.userService.post(user).subscribe((res:any) => {
              if(res.m==="success"){
                  this.router.navigate(['/admin/users']);

              }
        })
    }
}
