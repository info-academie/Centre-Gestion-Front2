
import { Component, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { User } from 'app/models/User';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UowService } from 'app/services/uow.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  FormsModule } from '@angular/forms';
import { MatModule } from 'app/mat.module';

@Component({
    selector: 'app-ressources',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule,
        MatPaginatorModule,
        MatModule,
        MatMenuModule, MatDividerModule, NgApexchartsModule,
        MatTableModule, MatSortModule, NgClass,
        RouterModule,
        FormsModule,
        MatProgressBarModule, CurrencyPipe, DatePipe],
    templateUrl: './ressources.component.html',
    styleUrls: ['./ressources.component.scss']
})
export class RessourcesComponent {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    isSearchBarOpened: boolean = false

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: User[] = [];
    total: number;

    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['Annee',
        'Mois', 'Nom Client', 'Classe', 'Montant'];
        year:string
        month:string

        // classes: Class[] = []
        months = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
        ];


    //  'email', 'Matiere', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */


    constructor(private uow: UowService) {
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
        this.uow.payments.delete(id).subscribe((e) => {
            console.log(e)
            e ?
                this.ngOnInit() : console.error("Error while deleting ")
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        // Get the data
        this.uow.payments.getAll()
            .subscribe((data) => {
                // Store the data
                this.data = data;
                // this.count = data.;
                // Store the table data
                this.recentTransactionsDataSource.data = this.data.payments;
                this.recentTransactionsDataSource.paginator = this.paginator;
                // Prepare the chart data

                this.total = this.data.payments.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.montant;
                }, 0);

            });
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit() {



        this.uow.ressources.filter(this.year, this.month).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res
            this.total = res.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.montant;
            }, 0);

        })
    }


}
