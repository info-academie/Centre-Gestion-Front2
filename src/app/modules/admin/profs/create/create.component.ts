import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { ProfService } from 'app/services/prof.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatModule } from 'app/mat.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    id: any = 0;
    myForm: FormGroup;
    user: User = new User(); // Initialize the user object

    constructor(
        private profService: ProfService,

        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,

    ) { }

    ngOnInit(): void {
console.log("=====================")
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
            idRole: 1,
        });
    }
    delete() {
        this.profService.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/profs']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/profs']);
    }

    submit(user: User) {
        this.profService.post(user).subscribe((res:any) => {
            console.log(res)
              if(res.m==="success"){
                  this.router.navigate(['/admin/profs']);

              }
        })
    }

}
