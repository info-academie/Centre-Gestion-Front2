import { Component, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { Subject } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Class } from 'app/models/Class';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import { User } from 'app/models/User';
import { FormsModule } from '@angular/forms';
import { MatModule } from 'app/mat.module';
@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatMenuModule, MatDividerModule, NgApexchartsModule,
    MatTableModule, MatSortModule, NgClass,
    RouterModule,FormsModule,MatModule,
    MatProgressBarModule, CurrencyPipe, DatePipe],
      templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {

    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: Class[] = [];


    nom:string=''
    type:string=''
    specialite:string=''
    salle:string=''
    profId:number
    profs : User[]=[]
    types = ['Soutien scolaire', 'Langue'];
    specialites = [
        { id: 1, choix: ['Primaire', 'College', 'Lycee'] },
        { id: 2, choix: ['Anglais', 'Francais', 'Autre'] },
    ];

    specialityArray: any = []



    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['id', 'Nom',
        'Prof', 'Nombre','Actions'];

    //  'email', 'Matiere', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    isSearchBarOpened: boolean = false

    /**
     * Constructor
     */


    constructor(private uow: UowService) {
    }

    choosenType(type) {

        type === "Soutien scolaire" ?
            this.specialityArray = this.specialites[0] :
            this.specialityArray = this.specialites[1];

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
        this.uow.classes.delete(id).subscribe((e) => {
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
        this.uow.users.getAll().subscribe((res:any)=>{
            this.profs=res.filter(e=>e.idRole===1)
           console.log("================")
           console.log(this.profs)
        })
        this.uow.classes.getAll()
            .subscribe((data) => {
                // Store the data
                this.data = data;
                // this.count = data.;
                 console.log(this.data)

                // Store the table data
                this.recentTransactionsDataSource.data = this.data;
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
        if (this.specialite === '') {
            this.specialite = '*'
        }

        if (this.type === '') {
            this.type = '*'
        }
        if (this.nom === '') {
            this.nom = '*'
        }

        if (this.salle === '') {
            this.salle = '*'
        }
        if (!this.profId) {
            this.profId = 0
        }


        this.uow.classes.filter(this.nom, this.type, this.salle, this.profId , this.specialite).subscribe((res: any) => {
            this.recentTransactionsDataSource.data = res
        })
    }
}
