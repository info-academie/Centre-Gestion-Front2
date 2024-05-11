import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitationComponent } from '../citation/citation.component';
import { PropertiesComponent } from '../properties/properties.component';
import { LandingHomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule,CitationComponent,PropertiesComponent,LandingHomeComponent,ContactComponent],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent {

}
