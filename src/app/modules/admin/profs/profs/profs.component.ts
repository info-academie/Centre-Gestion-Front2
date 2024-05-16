import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfService } from 'app/services/prof.service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { FormsModule } from '@angular/forms';
import { MatModule } from 'app/mat.module';
@Component({
  selector: 'app-profs',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatMenuModule, MatDividerModule, NgApexchartsModule,
    MatTableModule, MatSortModule, NgClass,FormsModule,MatModule,
    RouterModule,
    MatProgressBarModule, CurrencyPipe, DatePipe],
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.scss']
})
export class ProfsComponent {

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
        'address', 'actions'];
        nom: string = ''
        prenom: string = ''
        email: string = ''
    //  'email', 'Matiere', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */

    openSearchBar() {
        if(this.isSearchBarOpened){
            this.isSearchBarOpened = false
            this.ngOnInit()
        }else(
            this.isSearchBarOpened = true
        )

    }

    constructor(private profService: ProfService,
        private uow: UowService
        ) {
    }
    delete(id) {
        console.log(id)
        this.profService.delete(id).subscribe((e) => {
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
        this.uow.profs.getAll()
            .subscribe((data) => {
                // Store the data
                this.data = data;
                // this.count = data.count;
                let profArray=this.data.allProfs

                // Store the table data
                this.recentTransactionsDataSource.data =profArray;
                this.recentTransactionsDataSource.paginator = this.paginator;

                console.log("=====================")
                console.log(data)
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


    submit() {
        if (this.email === '') {
            this.email = '*'
        }

        if (this.prenom === '') {
            this.prenom = '*'
        }
        if (this.nom === '') {
            this.nom = '*'
        }



        this.uow.profs.searchProfs(this.nom, this.prenom, this.email).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res.query.result
        console.log(this.recentTransactionsDataSource.data )

        })
    }



}
