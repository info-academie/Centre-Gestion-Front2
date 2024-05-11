import { ExampleComponent } from './example/example.component';
import {  CreateUserComponent } from './users/create/create.component';
import { Routes } from '@angular/router';
// import { ProfsComponent } from './profs/profs.component';
import { ClientsComponent } from './clients/clients.component';
import { ClassesComponent } from './classes/classes.component';
// import { ProfsComponent } from './profs/profs.component';
// import { EditComponent } from './profs/edit/edit.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit/edit.component';
import { CreateClientComponent } from './clients/create/create.component';
import { EditClientComponent } from './clients/edit/edit.component';
import { EditClassComponent } from './classes/edit/edit.component';
import { CreateClassComponent } from './classes/create/create.component';
import { EmploiComponent } from './classes/emploi/emploi.component';
import { PaymentComponent } from './payment/payment.component';
import { CreatePaymentComponent } from './payment/create/create.component';
import { EditPaymentComponent } from './payment/edit/edit.component';
import { ChargeComponent } from './charges/charge.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { BilanComponent } from './bilan/bilan.component';
import { CaisseComponent } from './caisse/caisse.component';
import { CreateBilanComponent } from './bilan/create/create.component';
import { EditRessourceComponent } from './ressources/edit/edit.component';
import { CreateResssourceComponent } from './ressources/create/create.component';
import { CreateChargeComponent } from './charges/create/create.component';
import { EditChargeComponent } from './charges/edit/edit.component';
import { EditBilanComponent } from './bilan/edit/edit.component';
import { EditCaisseComponent } from './caisse/edit/edit.component';
import { CreateCaisseComponent } from './caisse/create/create.component';
import { ProfsComponent } from './profs/profs/profs.component';
import { EditComponent } from './profs/edit/edit.component';
import { CreateComponent } from './profs/create/create.component';
import { PresencesComponent } from './presences/presences.component';
import { CreatePresenceComponent } from './presences/create/create.component';
// import { CreateProfComponent } from './profs/create-prof/create-prof.component';

export default [
    {
        path     : '',
        component: ExampleComponent,
    },
    {
        path     : 'profs',
        component: ProfsComponent,
    },
    {
        path     : 'prof/create',
        component: CreateComponent,
    },
    {
        path     : 'emploi',
        component: EmploiComponent,
    },
    {
        path     : 'prof/:id',
        component: EditComponent,
    },


    


    {
        path     : 'presences',
        component: PresencesComponent,
    },

    {
        path     : 'presence/create',
        component: CreatePresenceComponent,
    },

    {
        path     : 'users',
        component: UsersComponent,
    },
    {
        path     : 'user/create',
        component: CreateUserComponent,
    },
    {
        path     : 'user/:id',
        component: EditUserComponent,
    },



    {
        path     : 'clients',
        component: ClientsComponent,
    },
    {
        path     : 'client/create',
        component: CreateClientComponent,
    },
    {
        path     : 'client/:id',
        component: EditClientComponent,
    },






    {
        path     : 'classes',
        component: ClassesComponent,
    },

    {
        path     : 'class/create',
        component: CreateClassComponent,
    },
    {
        path     : 'class/:id',
        component: EditClassComponent,
    },





    {
        path     : 'payments',
        component: PaymentComponent,
    },
    {
        path     : 'payment/create',
        component: CreatePaymentComponent,
    },
    {
        path     : 'payment/:id',
        component: EditPaymentComponent,
    },




    {
        path     : 'charges',
        component: ChargeComponent,
    },
    {
        path     : 'charge/create',
        component: CreateChargeComponent,
    },
    {
        path     : 'charge/:id',
        component: EditChargeComponent,
    },



    {
        path     : 'ressources',
        component: RessourcesComponent,
    },
    {
        path     : 'ressource/create',
        component: CreateResssourceComponent,
    },
    {
        path     : 'ressource/:id',
        component: EditRessourceComponent,
    },



    {
        path     : 'bilans',
        component: BilanComponent,
    },
    {
        path     : 'bilan/create',
        component: CreateBilanComponent,
    },
    {
        path     : 'bilan/:id',
        component: EditBilanComponent,
    },



    {
        path     : 'caisses',
        component: CaisseComponent,
    },
    {
        path     : 'caisse/create',
        component: CreateCaisseComponent,
    },
    {
        path     : 'caisse/:id',
        component: EditCaisseComponent,
    },




] as Routes;
