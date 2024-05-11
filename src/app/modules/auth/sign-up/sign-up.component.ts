import { FuseAlertType } from './../../../../@fuse/components/alert/alert.types';
import { FuseAlertComponent } from './../../../../@fuse/components/alert/alert.component';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';
import { NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';
@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, NgIf,

        FuseAlertComponent,
        FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule

    ],
})
export class SignUpComponent implements OnInit {
    signUpForm!: UntypedFormGroup;
    // @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    showAlert: boolean = false;
    isValidated: boolean;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;


    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private dialog: MatDialog,


    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    get email() {
        return this.signUpForm.get('email');
    }
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            nom: ['', Validators.required],
            email: ['', [
                Validators.required,
                Validators.email,
                Validators.pattern('^.+@(gmail.com|outlook.fr)$'),

            ]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            prenom: ['', [Validators.required]],
            telephone: ['',
                [Validators.required, Validators.pattern('^0(6|7)[0-9]{8}$')],
            ],
            matiere: null,
            address: ['', Validators.required],
            idRole: 4
        },
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */

    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (res) => {

                    if (res.code === -1) {
                        this.isValidated = false;

                        this.openDialog();
                        this.signUpForm.enable()

                        // put a dialog here
                    } else {
                        this._router.navigateByUrl('login');
                    }
                    // Navigate to the confirmation required page
                }
                // () => {
                //     // Re-enable the form
                //     this.signUpForm.enable();

                //     // Reset the form
                //     this.signUpForm.reset();

                //     // Set the alert
                //     this.alert = {
                //         type: 'error',
                //         message: 'Something went wrong, please try again.',
                //     };

                //     // Show the alert
                //     this.showAlert = true;
                // },
            );
    }
    openDialog(): void {
        console.log("i am in dialog")
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '340px',
            width: '500px'
            // Set width and other configuration options if needed
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('Dialog closed:', result);
        });
    }
}
