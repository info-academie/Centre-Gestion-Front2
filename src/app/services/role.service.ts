import { Role } from 'app/models/Role';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperService } from './super.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends SuperService<Role>{

    constructor() {
        super('role');

    }
}
