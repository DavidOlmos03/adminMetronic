import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    UsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    DeleteUsersComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    // Para poder realizar peticiones http
    HttpClientModule,
    // Para manejar los formularios
    FormsModule,
    // Modulo de bootstrap
    NgbModule,
    // Para manejar la reactividad de los formularios
    ReactiveFormsModule,
    // Modulos que hacen parte de la plantilla de metronic
    InlineSVGModule,
    NgbModalModule,

  ]
})
export class UsersModule { }
