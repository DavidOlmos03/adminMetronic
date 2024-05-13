import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  search:any = null;
  state:any = null;
  USERS:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    public modalSevice:NgbModal,
    public userService: UsersService,
  ){

  }
  ngOnInit(){
    this.listUsers();
    this.isLoading = this.userService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
                                                    // Además en el HTML debo aplicar <span class="spinner-border spinner-border-sm align-middle ms-2" *ngIf="isLoading | async"></span>
  }
  listUsers (){
    this.userService.listUsers(this.search,this.state).subscribe((resp:any) => {
      this.USERS =  resp.users.data;
      console.log(this.USERS)
    })
  }
  registerUser(){
    const modalRef = this.modalSevice.open(AddUsersComponent,{centered:true, size:'md'})
  }
}
