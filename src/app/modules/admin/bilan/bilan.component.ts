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
import { MatModule } from 'app/mat.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatMenuModule, MatDividerModule, NgApexchartsModule,
    MatTableModule, MatSortModule, NgClass,
    MatModule,
    FormsModule,
    RouterModule,
    MatProgressBarModule, CurrencyPipe, DatePipe],
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: User[] = [];


    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [ 'Annee',
        'Mois', 'Montant','Actions'];

    //  'email', 'Matiere', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */

    year:string=''
    month:string=''

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

    constructor(private uow: UowService) {
    }
    delete(id) {
        console.log(id)
        this.uow.bilans.delete(id).subscribe((e) => {
            console.log(e)
            e ?
                this.ngOnInit() : console.error("Error while deleting ")
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    isSearchBarOpened: boolean = false
    openSearchBar() {
        if(this.isSearchBarOpened){
            this.isSearchBarOpened = false
            this.ngOnInit()
        }else(
            this.isSearchBarOpened = true
        )

    }
    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this.uow.bilans.getAll()
            .subscribe((data) => {
                // Store the data
                this.data = data;
                // this.count = data.;
                // Store the table data
                this.recentTransactionsDataSource.data = this.data;
                this.recentTransactionsDataSource.paginator = this.paginator;
                // Prepare the chart data
                console.log("=================")
                console.log(data)

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



        this.uow.bilans.filter(this.year, this.month).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res


        })
    }

}
