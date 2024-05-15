import { UowService } from './../../../services/uow.service';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from 'app/models/User';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Role } from 'app/models/Role';
import { MatModule } from 'app/mat.module';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule,
        MatPaginatorModule,
        MatModule,
        MatMenuModule, MatDividerModule, NgApexchartsModule,
        MatTableModule, MatSortModule, NgClass,
        RouterModule,
        FormsModule,
        MatProgressBarModule, CurrencyPipe, DatePipe], templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: User[] = [];
    isSearchBarOpened: boolean = false
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['id', 'name', 'email',
        'role', 'actions'];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    myForm: FormGroup;
    roles: Role
    //===================
    nom: string = ''
    prenom: string = ''
    email: string = ''
    idRole: number = 0

    constructor(private uow: UowService,
        private fb: FormBuilder
    ) {
    }
    openSearchBar() {
        if(this.isSearchBarOpened){
            this.isSearchBarOpened = false
            this.ngOnInit()
        }else(
            this.isSearchBarOpened = true
        )

    }
    delete(id) {
        console.log(id)
        this.uow.users.delete(id).subscribe((e) => {
            console.log(e)
            e ?
                this.ngOnInit() : console.error("Error while deleting ")
        })
    }

    choosenRole(id: number) {
        this.idRole = id
    }



    ngOnInit(): void {
        // Get the data
        this.uow.users.GetUsers()
            .subscribe((data) => {
                // Store the data
                this.data = data;



                // Store the table data
                this.recentTransactionsDataSource.data = this.data;
                this.recentTransactionsDataSource.paginator = this.paginator;
                // Prepare the chart data
            });
        this.uow.roles.getAll().subscribe((res: any) => {
            this.roles = res;
        })

    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Make the data source sortable
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    submit() {
        console.log(this.email)
        if (this.email === '') {
            this.email = '*'
        }

        if (this.prenom === '') {
            this.prenom = '*'
        }
        if (this.nom === '') {
            this.nom = '*'
        }



        this.uow.users.searchUsers(this.nom, this.prenom, this.email, this.idRole).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res.query.result
        })
    }

}
