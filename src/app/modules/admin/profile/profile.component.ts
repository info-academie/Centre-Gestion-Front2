import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'app/models/User';
import { Role } from 'app/models/Role';
import { UowService } from 'app/services/uow.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    id: any = 0;
    myForm: FormGroup;
    user: User = new User(); // Initialize the user object
    roles: Role[] = []
    isProf: boolean = false;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    @ViewChild('DeletePoppup') DeletePoppup!: TemplateRef<any>;

    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private dialog: MatDialog,


    ) { }

    ngOnInit(): void {
        console.log("hello")
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1)
            this.id = userStorage.id
        }

        this.uow.roles.getAll().subscribe((res: any) => {
            this.roles = res;
        })

        this.uow.users.getOne(this.id).subscribe((res) => {
            this.user = res; // Update the user object with the fetched data
            console.log(this.user);
            this.createForm(); // Create the form after the user data is available
            this.user.idRole === 3 ? this.isProf = true : this.isProf = false;
        });

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

    choosenRole(id: number) {
        id === 3 ?
            this.isProf = true :
            this.isProf = false;
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    update(user) {
        this.uow.users.put(this.id, user).subscribe((res) => {
            if (res.m === "success") {
                this.ProfileEditedPoppup()
                this.uow.users.user$.next(user)

            }
        })
    }
    delete() {
        this.uow.users.delete(this.user.id).subscribe((e) => {
            e ?
                this.router.navigate(['/']) : console.error("Error while deleting ")
        })
    }
    ProfileDeletePoppup(): void {
        console.log("i am in dialog")
        const dialogRef = this.dialog.open(this.DeletePoppup, {
            height: '320px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    ProfileEditedPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

}
