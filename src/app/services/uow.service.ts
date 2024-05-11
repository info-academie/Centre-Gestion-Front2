import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { RoleService } from './role.service';
import { ProfService } from './prof.service';
import { ClientService } from './client.service';
import { ClassService } from './class.service';
import { PaymentService } from './payment.service';
import { BilanService } from './bilan.service';
import { CaisseService } from './caisse.service';
import { RessourceService } from './ressource.service';
import { ChargeService } from './charge.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
 users= new UserService();
 roles = new RoleService();
 profs= new ProfService();
 classes=new ClassService();
 clients = new ClientService();
 presences = new PresenceService();

//  ========
 payments=new PaymentService();
 bilans=new BilanService();
 ressources=new RessourceService();
 caisses=new CaisseService();
 charges=new ChargeService();

 constructor(private http: HttpClient) { }


}
