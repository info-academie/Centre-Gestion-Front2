import { Presence } from './../../../../models/Presence';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'app/models/Client';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.module';
import { Class } from 'app/models/Class';
import { User } from 'app/models/User';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditPresenceComponent {
  id: any = 0;
  myForm: FormGroup;
  presence: Presence = new Presence(); // Initialize the user object
  classSelected: number = 0;
  profSelected: number = 0;
  classes: Class[] = []
  profs: User[] = []
  listOfSudents: Client[];
  presenceArray: any[] = [];

  columns: number[] = [];
  col=0
  addColumn() {

    const newColumnName = this.columns.length;
    this.columns.push(newColumnName); // for date
    this.presenceArray.push({ date: null, presentStudents: [] });
    console.log("presence Array",this.presenceArray)
    console.log("listOfSudents",this.listOfSudents)
  }



  updateDate(newDate: string, index: number) {
    this.presenceArray[index].date = newDate;
}

togglePresence(checked: boolean, studentId: number, col: any) {
 // const column = this.presenceArray[index];
  console.log(col)
  if(col.presentStudents.includes(studentId)){
    let index=col.presentStudents.indexOf(studentId)
    col.presentStudents.splice(index, 1);


  }else{
    col.presentStudents.push(studentId);

  }
console.log(this.presenceArray)

}



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
    'décembre',
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
    , private router: Router,
    public uow: UowService

  ) { }
  calculateTotal(colIndex: any): number {

    return colIndex.presentStudents.length
  }
  isStudentPresent(studentId: number, arrayPresentStudents) {

    if (arrayPresentStudents.includes(studentId)) {
      return true
    } else {
      return false
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uow.presences.getInputsData().subscribe((res: any) => {
      this.classes = res.classes;
      this.profs = res.profs;
    });
    this.uow.presences.getOne(this.id).subscribe((res: any) => {
      this.presence = res.presence; // Update the user object with the fetched data
      this.classSelected = res.presence.idClass;
      this.profSelected = res.presence.idUser;

      let presences = JSON.parse(res.presence.presences)
      this.presenceArray = presences
      this.listOfSudents = res.clients
      console.log(this.presenceArray)
      this.createForm(); // Create the form after the user data is available
    });
  }
  idClassValue(e) {
    this.myForm.get('idClass').setValue(e);
  }
  createForm() {
    this.myForm = this.fb.group({
      id: [this.presence.id],
      year: [
        this.presence.year,
        [Validators.minLength(3), Validators.required],
      ],
      month: [
        this.presence.month,
        [Validators.minLength(3), Validators.required],
      ],
      idClass: [this.presence.idClass, Validators.required],
      idUser: [this.presence.idUser, Validators.required],
      presences: [this.presence.presences],
    });
  }
  delete() {
    this.uow.clients.delete(this.id).subscribe((e) => {

      e ?
        this.router.navigate(['/admin/presences']) : console.error("Error while deleting ")
    })
  }
  toggleEditMode() {
    this.router.navigate(['/admin/presences']);
  }

  update(user) {
    console.log(this.presenceArray)
    const jsonString = JSON.stringify(this.presenceArray);
    this.myForm.get('presences').setValue(jsonString);
    user.presences=jsonString

    this.uow.presences.put(this.id, user).subscribe((res) => {
      if (res.m === "success") {
       this.router.navigate(['/admin/presences']);

      }
    })
  }


}
