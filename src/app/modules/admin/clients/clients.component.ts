import { UowService } from './../../../services/uow.service';
import { CommonModule } from '@angular/common';
import { ProfService } from 'app/services/prof.service';
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
import { MatModule } from 'app/mat.module';
import { FormsModule } from '@angular/forms';
import { Class } from 'app/models/Class';


@Component({
  selector: 'app-clients',
  standalone: true,

  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatMenuModule, MatDividerModule,MatModule,FormsModule, NgApexchartsModule,
    MatTableModule, MatSortModule, NgClass,
    RouterModule,
    MatProgressBarModule, CurrencyPipe, DatePipe],

})
export class ClientsComponent {

    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: User[] = [];

    isSearchBarOpened: boolean = false

    nom : string = ''
    prenom: string = ''
    classId : number

    classes: Class [] = []
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['id', 'Nom',
        'Telephone', 'Classe','Actions'];

    //  'email', 'Matiere', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */


    constructor(private uow: UowService) {
    }
    delete(id) {
        console.log(id)
        this.uow.clients.delete(id).subscribe((e) => {
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
    openSearchBar() {
        if(this.isSearchBarOpened){
            this.isSearchBarOpened = false
            this.ngOnInit()
        }else(
            this.isSearchBarOpened = true
        )

    }
    ngOnInit(): void {
        // Get the data

        this.uow.clients.getClients()
            .subscribe((data) => {
                // Store the data
                this.data = data;
                // this.count = data.;
                this.classes = data.classes;

                // Store the table data
                this.recentTransactionsDataSource.data = this.data.allClients;
                this.recentTransactionsDataSource.paginator = this.paginator;
                // Prepare the chart data

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

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    submit(){


        this.uow.clients.filter(this.nom, this.prenom, this.classId).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res
        })
    }
}
